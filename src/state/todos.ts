import { create } from 'zustand';
import { Categories, Item } from '../data/constant';
import { dbInstance } from './newsql';
import { trigger } from '../notification/registerTriggers';

interface TodosState {
  todos: Record<keyof typeof Categories, Item[]>;
  setData: () => Promise<void>;
  newtodo: (data: Item) => void;
  updateTodos: (id: string, item: Partial<Item>) => Promise<void>;
  markStatusChange: (id: string, status: boolean) => Promise<void>;
  deleteTodo?: (id: string) => Promise<void>;
}

export const useTodos = create<TodosState>((set, get) => ({
  todos: Object.keys(Categories)
    .filter(key => isNaN(Number(key)))
    .reduce((acc, key) => {
      acc[key as keyof typeof Categories] = [];
      return acc;
    }, {} as Record<keyof typeof Categories, Item[]>),

  setData: async () => {
    const response = await dbInstance.getTodos();
    console.log('Response', response);
    // Dynamically group by category
    const groupedTodos = Object.keys(Categories)
      .filter(key => isNaN(Number(key))) // sirf string keys
      .reduce((acc, key) => {
        acc[key as keyof typeof Categories] = response.filter(
          item => item.category.toString() === key,
        );
        return acc;
      }, {} as Record<keyof typeof Categories, Item[]>);

    set({ todos: groupedTodos });
  },
  newtodo: async (data: Item) => {
    await dbInstance.insertTodo(data);
    await get().setData();
    await trigger.setnotify(
      data.name,
      data.description.slice(0, 17),
      new Date(data.dueDate),
      data.id,
    );
  },
  markStatusChange: async (id: string, status: boolean) => {
    await dbInstance.updateTodo(id, { iscompleted: status });

    await get().setData();
  },
  updateTodos: async (id: string, item: Partial<Item>) => {
    const data = await dbInstance.updateTodo(id, item);
    await get().setData();
    if (data) {
      await trigger.updatenotify(
        id,
        data.name,
        data.description.slice(0, 16),
        new Date(data.dueDate),
      );
    }
  },
  deleteTodo: async (id: string) => {
    await dbInstance.deleteTodo(id);
    await get().setData();
    await trigger.deletenotify(id);
  },
}));
