// __tests__/utils/asyncHandler.test.ts

import { asyncHandler } from '../../../src/utils/asynchandler';

describe('asyncHandler', () => {
  it('should return [null, result] when async function resolves', async () => {
    const mockFn = async (x: number, y: number) => x + y;
    const handler = asyncHandler(
      mockFn as unknown as (...args: unknown[]) => Promise<unknown>,
    );

    const [err, result] = await handler(2, 3);

    expect(err).toBeNull();
    expect(result).toBe(5);
  });

  it('should return [Error, null] when async function rejects with Error', async () => {
    const mockFn = async () => {
      throw new Error('Something went wrong');
    };
    const handler = asyncHandler(mockFn);

    const [err, result] = await handler();

    expect(result).toBeNull();
    expect(err).toBeInstanceOf(Error);
    expect(err?.message).toBe('Something went wrong');
  });

  it('should wrap string errors into Error objects', async () => {
    const mockFn = async () => {
      throw 'String error message';
    };
    const handler = asyncHandler(
      mockFn as unknown as (...args: unknown[]) => Promise<unknown>,
    );

    const [err, result] = await handler();

    expect(result).toBeNull();
    expect(err).toBeInstanceOf(Error);
    expect(err?.message).toBe('String error message');
  });

  it('should handle non-Error thrown objects', async () => {
    const mockFn = async () => {
      throw { code: 500, message: 'Server error' };
    };
    const handler = asyncHandler(
      mockFn as unknown as (...args: unknown[]) => Promise<unknown>,
    );

    const [err, result] = await handler();

    expect(result).toBeNull();
    expect(err).toBeInstanceOf(Error);
    expect(err?.message).toBe('Something went wrong');
  });

  it('should work with functions returning objects', async () => {
    const data = { id: 1, name: 'Test', active: true };
    const mockFn = async () => data;
    const handler = asyncHandler(mockFn);

    const [err, result] = await handler();

    expect(err).toBeNull();
    expect(result).toEqual(data);
    expect(result).toBe(data);
  });

  it('should work with functions returning arrays', async () => {
    const data = [1, 2, 3, 4, 5];
    const mockFn = async () => data;
    const handler = asyncHandler(mockFn);

    const [err, result] = await handler();

    expect(err).toBeNull();
    expect(result).toEqual(data);
  });

  it('should work with functions returning primitives', async () => {
    const mockStringFn = async () => 'success';
    const mockNumberFn = async () => 42;
    const mockBooleanFn = async () => true;

    const [err1, result1] = await asyncHandler(mockStringFn)();
    const [err2, result2] = await asyncHandler(mockNumberFn)();
    const [err3, result3] = await asyncHandler(mockBooleanFn)();

    expect(err1).toBeNull();
    expect(result1).toBe('success');
    expect(err2).toBeNull();
    expect(result2).toBe(42);
    expect(err3).toBeNull();
    expect(result3).toBe(true);
  });

  it('should pass multiple arguments correctly to wrapped function', async () => {
    const mockFn = async (a: string, b: number, c: boolean) => `${a}-${b}-${c}`;
    const handler = asyncHandler(
      mockFn as unknown as (...args: unknown[]) => Promise<unknown>,
    );

    const [err, result] = await handler('test', 123, true);

    expect(err).toBeNull();
    expect(result).toBe('test-123-true');
  });

  it('should handle functions with no arguments', async () => {
    const mockFn = async () => 'no args';
    const handler = asyncHandler(
      mockFn as unknown as (...args: unknown[]) => Promise<unknown>,
    );

    const [err, result] = await handler();

    expect(err).toBeNull();
    expect(result).toBe('no args');
  });

  it('should handle null and undefined return values', async () => {
    const mockNullFn = async () => null;
    const mockUndefinedFn = async () => undefined;

    const [err1, result1] = await asyncHandler(mockNullFn)();
    const [err2, result2] = await asyncHandler(mockUndefinedFn)();

    expect(err1).toBeNull();
    expect(result1).toBeNull();
    expect(err2).toBeNull();
    expect(result2).toBeUndefined();
  });

  it('should be reusable for multiple calls', async () => {
    const mockFn = async (x: number) => x * 2;
    const handler = asyncHandler(
      mockFn as unknown as (...args: unknown[]) => Promise<unknown>,
    );

    const [err1, result1] = await handler(5);
    const [err2, result2] = await handler(10);

    expect(err1).toBeNull();
    expect(result1).toBe(10);
    expect(err2).toBeNull();
    expect(result2).toBe(20);
  });
});
