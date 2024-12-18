export function formatQueryParams(
  obj: Record<string, string | string[] | boolean | number | undefined> | undefined,
) {
  if (!obj) return "";

  return Object.entries(obj).reduce((acc, [k, v]) => {
    const vIsDefined = Array.isArray(v)
      ? v.length
      : ["string", "number", "boolean"].includes(typeof v);

    return (
      acc +
      (acc && vIsDefined ? "&" : "") +
      (vIsDefined ? `${k}=${Array.isArray(v) ? v.join(",") : v}` : "")
    );
  }, "");
}

export function paramsToObject<T>(searchParams: URLSearchParams) {
  const result: Record<string, any> = {};
  for (const [key, value] of searchParams.entries()) {
    // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result as T;
}
