// utils/asyncHandler.ts

/**
 * Wraps any async function and returns a tuple [error, result]
 * Usage: const [err, data] = await asyncHandler(someAsyncFunction)(...args)
 */
export const asyncHandler = <T extends (...args: any[]) => Promise<any>>(
  fn: T
) => {
  return async (...args: Parameters<T>): Promise<[Error | null, Awaited<ReturnType<T>> | null]> => {
    try {
      const result = await fn(...args);
      return [null, result];
    } catch (error: any) {
      if (!error.name) error.name = "AsyncHandlerError"; // Optional custom error name
      return [error, null];
    }
  };
};
