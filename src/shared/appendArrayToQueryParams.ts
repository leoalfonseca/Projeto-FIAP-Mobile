export function appendArrayToQueryParams(
  queryParams: URLSearchParams,
  key: string,
  values?: string[]
) {
  if (values?.length) {
    values.forEach((value) => {
      queryParams.append(key, value);
    });
  }
}
