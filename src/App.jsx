import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Seacher from './components/Searcher'
import { Col, Spin } from 'antd'
import PokemonList from './components/PokemonList'
import logo from './assets/logo.svg'
import { getPokemon } from './api'
import { getPokemonsWithDetails,setLoading } from './actions'

function App() {
  const pokemons = useSelector(state => state.pokemons)
  const loading = useSelector (state => state.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchPokemons = async() => {
      dispatch(setLoading(true))
      const pokemonsRes = await getPokemon() 
      dispatch(getPokemonsWithDetails(pokemonsRes))
      dispatch(setLoading(false))
    }
    
    fetchPokemons()
  }, [])

  return (
    <div className="App">
      <Col span={10} offset={10}>
        <img src={logo} alt="pokelogo" />
      </Col>
      <Col span={8} offset={8}>
        <Seacher />    
      </Col>
      { loading ? <Col offset={12}>
        <Spin spinning size='large' />
      </Col> : <PokemonList pokemons={pokemons} />}
      
    </div>
  )
}


export default App
