import { create } from "zustand";
import { Categories, Item } from "../data/constant";

interface TodosState {
  todos: Record<keyof typeof Categories, Item[]>;
  setData: () => Promise<void>;
  newtodo:(data:Item)=>void,
  markCompleted?: (id: number) => Promise<void>;
  deleteTodo?: (id: number) => Promise<void>;
}

export const useTodos = create<TodosState>((set, get) => ({
  todos: Object.keys(Categories).splice(4).reduce((acc, key) => {
    acc[key as keyof typeof Categories] = [];
    return acc;
  }, {} as Record<keyof typeof Categories, Item[]>),

  setData: async () => {
    // const response = await dbinstance.getTodos();

    // // Dynamically group by category
    // const groupedTodos = Object.keys(Categories).splice(4).reduce((acc, key) => {
    //   acc[key as keyof typeof Categories] = response.filter(
    //     (item) => item.category === Categories[key as keyof typeof Categories]
    //   );
    //   return acc;
    // }, {} as Record<keyof typeof Categories, Item[]>);

    // set({ todos: groupedTodos });
  },
 newtodo:async(data:Item)=>{
// await dbinstance.insertTodo(data)
    await get().setData();
 },
  markCompleted: async (id: number) => {
    await dbinstance.updateTodo(id,{iscompleted:true});
    await get().setData();
  },

  deleteTodo: async (id: number) => {
    await dbinstance.deleteTodo(id);
    await get().setData();
  },
}));
