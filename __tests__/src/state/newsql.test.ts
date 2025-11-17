jest.mock('../../../src/state/newsql', () => {
  return {
    dbInstance: {
      insertTodo: jest.fn(() => Promise.resolve()),
      getTodos: jest.fn(() =>
        Promise.resolve([
          { id: '1', name: 'Test', description: '2 packets', iscompleted: 0 },
        ]),
      ),
    },
  };
});

import { dbInstance } from '../../../src/state/newsql';
import { Categories } from '../../../src/data/constant';

describe('DB class', () => {
  it('should insert todo', async () => {
    const todo = {
      id: '1',
      name: 'Buy milk',
      description: '2 packets',
      dueDate: new Date(),
      category: Categories.noturgentImportant,
      iscompleted: false,
    };
    await expect(dbInstance.insertTodo(todo)).resolves.toBeUndefined();
  });

  it('should fetch todos', async () => {
    const todos = await dbInstance.getTodos();
    expect(todos[0].name).toBe('Test');
  });
});
