import { sortingData } from "./static-data";

export function getSortQuery(
  value: string,
  pathname: string,
  search: string
): string {
  let queryValue = null;

  let querySearch = search;

  if (search.includes("sort")) {
    const [searchItem] = querySearch.split("&");
    querySearch = searchItem.includes("sort") ? "" : searchItem;
  }

  const urlPath = `${pathname}${querySearch}`;
  const querySymbol = querySearch ? "&" : "?";

  if (value !== "default") {
    const currentSort = sortingData.find((sort) => sort.value === value);
    if (currentSort) {
      queryValue = `sort=${currentSort.query}`;
    }
  }
  if (queryValue) {
    return `${urlPath}${querySymbol}${queryValue}`;
  }
  return `${urlPath}`;
}
