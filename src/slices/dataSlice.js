import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "./uiSlice";
import { getPokemon, getPokemonDetails } from "../api";
const initialState = {
  pokemons : [],
}
export const fetchPokemonsWithDetails = createAsyncThunk(
  'data/fetchPokemonsWithDetails',
  async (_, {dispatch})=> {
    dispatch(setLoading(true))
    // disptch loeader
    //fetch
    // dispatch del loeader
    const pokemonsRes = await getPokemon() 
    const pokemonDetailed = await Promise.all(pokemonsRes.map((pokemon) => {
      return getPokemonDetails(pokemon)
    }))
    dispatch(setPokemons(pokemonDetailed))
    dispatch(setLoading(false))

  }
)

export const dataSlice = createSlice({
  name:'data',
  initialState,
  reducers: {
    setPokemons:(state,action)=>{
      state.pokemons = action.payload
    },
    setFavorites: (state, action) => {
      const currentPokemonIndex = state.pokemons.findIndex((item) => {
        return item.id === action.payload.pokemonId
      } )
      if(currentPokemonIndex > 0) {
        const isFavorite = state.pokemons[currentPokemonIndex].favorite;
        state.pokemons[currentPokemonIndex].favorite = !isFavorite  
      }
    }
  }
})

export const { setFavorites, setPokemons } = dataSlice.actions
export default dataSlice.reducer
