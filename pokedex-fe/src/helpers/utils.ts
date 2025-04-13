import { LocalStorageList, pokemonLocalStorageKey } from "../const";

const maxPages = 3;
export function cleanupOnLoadPage<T>({
  handlePages,
  loadedPageIndex,
  data,
}: {
  handlePages: Map<number, T[]>;
  loadedPageIndex: number;

  data: T[];
}) {
  const next = new Map(handlePages);
  next.set(loadedPageIndex, data);
  if (next.size > maxPages) {
    const sorted = [...next.keys()].sort((a, b) => a - b);
    if (loadedPageIndex < sorted[sorted.length - 1]) {
      next.delete(sorted[sorted.length - 1]);
    } else {
      next.delete(sorted[0]);
    }
  }
  return next;
}

export const getPokemonInitData = () => {
  const localStorageFilters = localStorage.getItem(pokemonLocalStorageKey);
  if (localStorageFilters) {
    return JSON.parse(
      localStorage.getItem(pokemonLocalStorageKey) ?? ""
    ) as LocalStorageList;
  }
  return null;
};

export function storeDataOnLocalStorage<F>(storageKey: string, data: F) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}
