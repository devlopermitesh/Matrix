// __tests__/utils/asyncHandler.test.ts

import { asyncHandler } from "../../../src/utils/asynchandler";

describe('asyncHandler', () => {
  it('should return [null, result] when async function resolves', async () => {
    const mockFn = jest.fn(async (x: number, y: number) => x + y);
    
    const handler = asyncHandler(mockFn);

    const [err, result] = await handler(2, 3);

    expect(err).toBeNull();
    expect(result).toBe(5);
    expect(mockFn).toHaveBeenCalledWith(2, 3);
  });

  it('should return [error, null] when async function rejects', async () => {
    const error = new Error('Something went wrong');
    const mockFn = jest.fn(async () => { throw error; });
    
    const handler = asyncHandler(mockFn);

    const [err, result] = await handler();

    expect(err).toBe(error);
    expect(err?.name).toBe('Error'); // original error name preserved
    expect(result).toBeNull();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should assign custom name if error has no name', async () => {
    const error = { message: 'No name', name: '' };
    const mockFn = jest.fn(async () => { throw error; });

    const handler = asyncHandler(mockFn);

    const [err, result] = await handler();

    expect(err).toBe(error);
    expect(err?.name).toBe('AsyncHandlerError'); // custom name applied
    expect(result).toBeNull();
  });

  it('should work with functions returning objects', async () => {
    const data = { id: 1, name: 'Test' };
    const mockFn = jest.fn(async () => data);

    const handler = asyncHandler(mockFn);

    const [err, result] = await handler();

    expect(err).toBeNull();
    expect(result).toEqual(data);
  });

  it('should pass arguments correctly to the wrapped function', async () => {
    const mockFn = jest.fn(async (a: string, b: string) => a + b);

    const handler = asyncHandler(mockFn);

    const [err, result] = await handler('Hello ', 'World');

    expect(err).toBeNull();
    expect(result).toBe('Hello World');
    expect(mockFn).toHaveBeenCalledWith('Hello ', 'World');
  });
});
