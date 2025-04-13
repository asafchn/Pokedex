import { Pokemon } from "../components/Pokedex/types";
import { createApiSlice } from "../state/createApi";

const basePokemonApi = createApiSlice("pokemonApi");

export const pokemonApi = basePokemonApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemons: builder.query<
      pokemonRequestResponse,
      {
        page: number;
        pageSize: number;
        sort?: string;
        type?: string;
        search?: string;
      }
    >({
      query: ({ page, pageSize, sort, type, search }) => {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("page_size", pageSize.toString());

        if (sort) params.append("sort", sort);
        if (type) params.append("type", type);
        if (search) params.append("search", search);
        return `/pokemons?${params.toString()}`;
      },
    }),

    capturePokemon: builder.mutation<
      { status: string; captured: string },
      { name: string; isCaptured: boolean }
    >({
      query: ({ name, isCaptured }) => ({
        url: "/pokemon/capture",
        method: "POST",
        body: { name, isCaptured },
      }),
    }),

    getCapturedList: builder.query<{ captured: string[] }, void>({
      query: () => "/pokemon/captured",
    }),

    getIconUrl: builder.query<{ url: string }, string>({
      query: (name) => `/icon/${name}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPokemonsQuery,
  useLazyGetPokemonsQuery,
  useCapturePokemonMutation,
  useGetCapturedListQuery,
  useGetIconUrlQuery,
  usePrefetch,
} = pokemonApi;
export default pokemonApi;

interface pokemonRequestResponse {
  data: Pokemon[];
  page: number;
  page_size: number;
  total: number;
}
