import { fromJS } from "immutable"
import { SET_FAVORITE, SET_POKEMONS } from "../actions/types"

const initialState = fromJS({
  pokemons: [],
})

export const pokemonsReducer = ( state = initialState, action) => {
  switch(action.type){
    case SET_POKEMONS: 
      return state.setIn(['pokemons'], fromJS(action.payload))
      //return { ...state, pokemons:action.payload }
    case SET_FAVORITE:
      const currentPokemonIndex = state.get('pokemons').findIndex((item) => {
        return item.get('id') === action.payload.pokemonId
      } )
      if(currentPokemonIndex < 0) {
        return state
      }
      // Forma de acceder 1
      // const isFavorite = state.get('pokemons').get(currentPokemonIndex).get('favorite')

      // Forma de acceder 2
      const isFavorite = state.getIn(['pokemons',currentPokemonIndex,'favorite'])

      return state.setIn(['pokemons',currentPokemonIndex,'favorite'], !isFavorite)

      /*
      const newPokemonList = [ ...state.pokemons]
      const currentPokemonIndex = newPokemonList.findIndex( (item) => {
        return item.id === action.payload.pokemonId
      } )
      
      newPokemonList[currentPokemonIndex].favorite = !newPokemonList[currentPokemonIndex].favorite
      return { ...state, pokemons:newPokemonList} 
      */

    default:
        return state 
  }
}