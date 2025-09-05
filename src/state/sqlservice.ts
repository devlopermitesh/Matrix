import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { Categories, Item } from '../data/constant';
import { asyncHandler } from '../utils/asynchandler';

class Db {
  private db: SQLiteDatabase | null = null;
  public ready;
  constructor() {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);
  this.ready=this.init();
 
  }

  private init = async ():Promise<boolean> => {
    const [err, db] = await asyncHandler(this.getDBConnection)();
    if (err) {
      console.log('DB connection failed:', err.name, err.message);
      return false;
    }
    this.db = db;
    //if db is null
    if(!db){
        console.log("Db is null")
        return false;
    }
    // Create table
    const [createErr] = await asyncHandler(() => this.createTable(db))();
    if (createErr) {
      console.log('Table creation failed:', createErr.name, createErr.message);
      return false;
    }
    return true;
  };

  private getDBConnection = async (): Promise<SQLiteDatabase> => {
    return SQLite.openDatabase({ name: 'TodoDB.db', location: 'default',createFromLocation:undefined });
  };

  private createTable = async (db: SQLiteDatabase) => {
    await db.executeSql(
      `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        due_date TEXT,
        category TEXT,
        iscompleted INTEGER DEFAULT 0
      );`
    );
  };

  public insertTodo = async (item: Item) => {
    if (!this.db) {
      console.log('DB not initialized');
      return;
    }
   const dueDateString = item.dueDate ? item.dueDate.toISOString() : null;


    const [err] = await asyncHandler(() =>
      this.db!.executeSql(
        `INSERT INTO todos (name, description, due_date, category, iscompleted) VALUES (?, ?, ?, ?, ?);`,
        [item.name, item.description, dueDateString, item.category, item.iscompleted ? 1 : 0]
      )
    )();
    if (err) console.log('Insert failed:', err.name, err.message);
  };

  public getTodos = async () => {
        await this.ready;
    if (!this.db) return [];
    const [err, results] = await asyncHandler(() => this.db!.executeSql(`SELECT * FROM todos;`))();
    if (err) {
      console.log('Fetch failed:', err.name, err.message);
      return [];
    }
    const todos: Item[] = [];
    results?.forEach((result) => {
      for (let i = 0; i < result.rows.length; i++) {
        todos.push(result.rows.item(i));
      }
    });
    return todos;
  };

  // Delete a todo by ID
  public deleteTodo = async (id: number): Promise<boolean> => {
        await this.ready;
    if (!this.db) {
      console.log('DB not initialized');
      return false;
    }
    const [err] = await asyncHandler(() =>
      this.db!.executeSql(`DELETE FROM todos WHERE id = ?;`, [id])
    )();
    if (err) {
      console.log('Delete failed:', err.name, err.message);
      return false;
    }
    return true;
  };

  // Mark a todo as completed/uncompleted
  public markTodoCompleted = async (id: number, isCompleted: boolean): Promise<boolean> => {
        await this.ready;
    if (!this.db) {
      console.log('DB not initialized');
      return false;
    }
    const [err] = await asyncHandler(() =>
      this.db!.executeSql(
        `UPDATE todos SET iscompleted = ? WHERE id = ?;`,
        [isCompleted ? 1 : 0, id]
      )
    )();
    if (err) {
      console.log('Mark completed failed:', err.name, err.message);
      return false;
    }
    return true;
  };

  // Update a todo item
  public updateTodo = async (id: number, item: Partial<Item>): Promise<boolean> => {
        await this.ready;
    if (!this.db) {
      console.log('DB not initialized');
      return false;
    }

    // Build dynamic query based on provided fields
    const fields = [];
      const values: (string | number|Date)[] = [];

    if (item.name !== undefined) {
      fields.push('name = ?');
      values.push(item.name);
    }
    if (item.description !== undefined) {
      fields.push('description = ?');
      values.push(item.description);
    }
    if (item.dueDate !== undefined) {
      fields.push('due_date = ?');
      values.push(item.dueDate);
    }
    if (item.category !== undefined) {
      fields.push('category = ?');
      values.push(item.category);
    }
    if (item.iscompleted !== undefined) {
      fields.push('iscompleted = ?');
      values.push(item.iscompleted ? 1 : 0);
    }

    if (fields.length === 0) {
      console.log('No fields to update');
      return false;
    }

    values.push(id);
    const query = `UPDATE todos SET ${fields.join(', ')} WHERE id = ?;`;

    const [err] = await asyncHandler(() =>
      this.db!.executeSql(query, values)
    )();
    if (err) {
      console.log('Update failed:', err.name, err.message);
      return false;
    }
    return true;
  };

  // Get a specific todo by ID
  public getTodoById = async (id: number): Promise<Item | null> => {
        await this.ready;
    if (!this.db) {
      console.log('DB not initialized');
      return null;
    }
    const [err, results] = await asyncHandler(() =>
      this.db!.executeSql(`SELECT * FROM todos WHERE id = ?;`, [id])
    )();
    if (err) {
      console.log('Fetch by ID failed:', err.name, err.message);
      return null;
    }
    if (results && results.length > 0 && results[0].rows.length > 0) {
      return results[0].rows.item(0);
    }
    return null;
  };

  // Get todos by category
  public getTodosByCategory = async (category: string): Promise<Item[]> => {
        await this.ready;
    if (!this.db) return [];
    const [err, results] = await asyncHandler(() =>
      this.db!.executeSql(`SELECT * FROM todos WHERE category = ?;`, [category])
    )();
    if (err) {
      console.log('Fetch by category failed:', err.name, err.message);
      return [];
    }
    const todos: Item[] = [];
    results?.forEach((result) => {
      for (let i = 0; i < result.rows.length; i++) {
        todos.push(result.rows.item(i));
      }
    });
    return todos;
  };

  // Get completed/uncompleted todos
  public getTodosByCompletion = async (isCompleted: boolean): Promise<Item[]> => {
        await this.ready;
    if (!this.db) return [];
    const [err, results] = await asyncHandler(() =>
      this.db!.executeSql(`SELECT * FROM todos WHERE iscompleted = ?;`, [isCompleted ? 1 : 0])
    )();
    if (err) {
      console.log('Fetch by completion failed:', err.name, err.message);
      return [];
    }
    const todos: Item[] = [];
    results?.forEach((result) => {
      for (let i = 0; i < result.rows.length; i++) {
        todos.push(result.rows.item(i));
      }
    });
    return todos;
  };
}
export const dbinstance= new Db();