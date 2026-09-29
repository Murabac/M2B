/** Cap outbound Supabase waits so SSR pages don't hang when the gateway stalls. */
export const SUPABASE_FETCH_TIMEOUT_MS = 8_000;

export function createTimedFetch(
  timeoutMs: number = SUPABASE_FETCH_TIMEOUT_MS,
): typeof fetch {
  return (input, init) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const upstream = init?.signal;
    if (upstream) {
      if (upstream.aborted) {
        controller.abort(upstream.reason);
      } else {
        upstream.addEventListener(
          "abort",
          () => controller.abort(upstream.reason),
          { once: true },
        );
      }
    }

    return fetch(input, { ...init, signal: controller.signal }).finally(() => {
      clearTimeout(timeoutId);
    });
  };
}
