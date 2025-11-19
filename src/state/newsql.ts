import SQLite, {
  SQLError,
  SQLTransaction,
  WebsqlDatabase,
} from 'react-native-sqlite-2';
import { Categories, Item } from '../data/constant';
/**
 * const db=SQLite.openDatabase is non promisble function that takes name and other version,desc,size and cb as opton return a websqldatabase object
 * db is websqldatabase have methods trancation 
 * method trancation params 
callback: SQLTransactionCallback, errorCallback?: SQLTransactionErrorCallback, successCallback?: SQLVoidCallback
 * 
*sql trancation is object that have executesql method to execture query
executesql have query,params agrs and successcb and errorCb
or websqldatabase object have 
SQLiteDatabase.private exec params queriesobject ,readyonly,callback 
result contain row and 
 */

class DB {
  private db: WebsqlDatabase | null = null;
  database_name = 'Matrix.db';
  database_version = '1.0';
  database_displayname = 'Matrics';
  database_size = 200000;
  constructor(database_name: string) {
    this.database_name = database_name;
    this.init();
  }
  private init = async (): Promise<boolean> => {
    const db = await this.getDBConnection();
    this.db = db;
    await this.createTabletodos(db);

    if (!db) {
      return false;
    }
    return true;
  };
  createTabletodos = async (db: WebsqlDatabase) => {
    return await new Promise<void>((resolve, reject) => {
      db.transaction(
        (tx: SQLTransaction) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            due_date TEXT,
            category TEXT,
            iscompleted INTEGER DEFAULT 0
          );`,
          );
        },
        err => {
          console.error('Table creation failed', err);
          reject(err);
        },
        () => {
          console.log('✅ Table ready');
          resolve();
        },
      );
    });
  };

  public insertTodo = async (item: Item) => {
    if (!this.db) throw new Error('DB not initialized');
    const dueDateString = item.dueDate ? item.dueDate.toISOString() : null;

    return await new Promise<void>((resolve, reject) => {
      this.db!.transaction(tx => {
        tx.executeSql(
          `INSERT INTO todos (name, description, due_date, category, iscompleted) VALUES (?, ?, ?, ?, ?)`,
          [
            item.name,
            item.description,
            dueDateString,
            Categories[item.category],
            item.iscompleted ? 1 : 0,
          ],
          () => {
            resolve();
          },
          (tx: SQLTransaction, error: SQLError) => {
            console.error('Insert failed', error);
            reject(error);
            return false;
          },
        );
      });
    });
  };

  public getTodos = async (): Promise<Item[]> => {
    if (!this.db) {
      await this.init();
      console.log('db is not ready yet!❌');
      return []
    }
    return await new Promise<Item[]>(resolve => {
      this.db!.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM todos;`,
          [],
          (_, results) => {
            const todos: Item[] = [];
            for (let i = 0; i < results.rows.length; i++) {
              const row = results.rows.item(i);
              // convert due_date back to Date object if needed
              todos.push({
                ...row,
                dueDate: row.due_date ? new Date(row.due_date) : undefined,
                iscompleted: row.iscompleted === 1, // convert 0/1 to boolean
              });
            }
            resolve(todos);
          },
          (_, error) => {
            console.error('Failed to fetch todos', error);
            return false; // must return boolean
          },
        );
      });
    });
  };

  // Delete a todo by ID
  public deleteTodo = async (id: string): Promise<boolean> => {
    if (!this.db) {
      return false;
    }

    return await new Promise<boolean>(resolve => {
      this.db!.transaction(tx => {
        tx.executeSql(
          `DELETE FROM todos WHERE id = ?;`,
          [id],
          () => {
            resolve(true);
          },
          () => {
            return false; // must return boolean
          },
        );
      });
    });
  };
  // Mark a todo as completed/uncompleted
  public markTodoCompleted = async (
    id: number,
    isCompleted: boolean,
  ): Promise<boolean> => {
    if (!this.db) {
      return false;
    }

    return await new Promise<boolean>(resolve => {
      this.db!.transaction(tx => {
        tx.executeSql(
          `UPDATE todos SET iscompleted = ? WHERE id = ?;`,
          [isCompleted ? 1 : 0, id],
          () => {
            resolve(true);
          },
          () => {
            return false; // must return boolean
          },
        );
      });
    });
  };

  // Update a todo item
  public updateTodo = async (
    id: string,
    item: Partial<Item>,
  ): Promise<Item | null> => {
    if (!this.db) {
      return null;
    }

    // Build dynamic query based on provided fields
    const fields: string[] = [];
    const values: (string | number | null)[] = [];

    if (item.name !== undefined) {
      fields.push('name = ?');
      values.push(item.name);
    }
    if (item.description !== undefined) {
      fields.push('description = ?');
      values.push(item.description);
    }
    if (item.dueDate !== undefined) {
      values.push(item.dueDate ? item.dueDate.toISOString() : null);
      fields.push('due_date = ?');
    }
    if (item.category !== undefined) {
      fields.push('category = ?');
      values.push(Categories[item.category]);
    }
    if (item.iscompleted !== undefined) {
      fields.push('iscompleted = ?');
      values.push(item.iscompleted ? 1 : 0);
    }

    if (fields.length === 0) {
      return null;
    }

    values.push(id); // Add ID for WHERE clause
    const query = `UPDATE todos SET ${fields.join(', ')} WHERE id = ?;`;

    return await new Promise<Item | null>(resolve => {
      this.db!.transaction(tx => {
        tx.executeSql(
          query,
          values,
          async () => {
            const response = await this.getTodoById(id);
            resolve(response);
          },
          () => {
            return false; // must return boolean
          },
        );
      });
    });
  };

  // Get a specific todo by ID
  public getTodoById = async (id: string): Promise<Item | null> => {
    if (!this.db) {
      return null;
    }

    return await new Promise<Item | null>(resolve => {
      this.db!.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM todos WHERE id = ?;`,
          [id],
          (_, results) => {
            if (results.rows.length > 0) {
              const row = results.rows.item(0);
              // Convert to Item type
              const todo: Item = {
                ...row,
                dueDate: row.due_date ? new Date(row.due_date) : undefined,
                iscompleted: row.iscompleted === 1,
              };
              resolve(todo);
            } else {
              resolve(null); // No record found
            }
          },
          () => {
            return false; // must return boolean
          },
        );
      });
    });
  };

  // Get todos by category
  public getTodosByCategory = async (category: string): Promise<Item[]> => {
    if (!this.db) {
      return [];
    }

    return await new Promise<Item[]>(resolve => {
      this.db!.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM todos WHERE category = ?;`,
          [category],
          (_, results) => {
            const todos: Item[] = [];
            for (let i = 0; i < results.rows.length; i++) {
              const row = results.rows.item(i);
              todos.push({
                ...row,
                dueDate: row.due_date ? new Date(row.due_date) : undefined,
                iscompleted: row.iscompleted === 1,
              });
            }
            resolve(todos);
          },
          () => {
            return false; // must return boolean
          },
        );
      });
    });
  };
  // Get completed/uncompleted todos
  public getTodosByCompletion = async (
    isCompleted: boolean,
  ): Promise<Item[]> => {
    if (!this.db) {
      return [];
    }

    return await new Promise<Item[]>(resolve => {
      this.db!.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM todos WHERE iscompleted = ?;`,
          [isCompleted ? 1 : 0],
          (_, results) => {
            const todos: Item[] = [];
            for (let i = 0; i < results.rows.length; i++) {
              const row = results.rows.item(i);
              todos.push({
                ...row,
                dueDate: row.due_date ? new Date(row.due_date) : undefined,
                iscompleted: row.iscompleted === 1,
              });
            }
            resolve(todos);
          },
          () => {
            return false; // must return boolean
          },
        );
      });
    });
  };

  private getDBConnection = async (): Promise<WebsqlDatabase> => {
    return SQLite.openDatabase(
      this.database_name,
      this.database_version,
      this.database_displayname,
      this.database_size,
      () => {},
    );
  };
  ErrorDisplay = () => {};
}

export const dbInstance = new DB('Matrix.db');
