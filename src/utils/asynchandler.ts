// utils/asyncHandler.ts

/**
 * Wraps any async function and returns a tuple [error, result]
 * Usage: const [err, data] = await asyncHandler(someAsyncFunction)(...args)
 */
export const asyncHandler = <
  T extends (...args: unknown[]) => Promise<unknown>,
>(
  fn: T,
) => {
  return async (
    ...args: Parameters<T>
  ): Promise<[Error | null, Awaited<ReturnType<T>> | null]> => {
    try {
      const result = (await fn(...args)) as Awaited<ReturnType<T>>;
      return [null, result];
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (!error.name) error.name = 'AsyncHandlerError'; // Optional custom error name
      }
      return [
        new Error(typeof error === 'string' ? error : 'Something went wrong'),
        null,
      ];
    }
  };
};
