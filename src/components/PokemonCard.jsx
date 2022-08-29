import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { useDispatch } from 'react-redux'
import { setFavorites } from '../slices/dataSlice'
import StartButton from './StarButton'

const PokemonCard = ({name, image, types, id, favorite}) => {
  const dispatch = useDispatch()
  const typesString = types.map( elem => elem.type.name).join(", ")


  const handleOnFavorite = () => {
    dispatch(setFavorites({pokemonId:id}))
  }


  return (
    <Card  
      title={name} 
      cover={<img src={image} 
      alt={name} />}
      extra = {<StartButton isFavorite={favorite} onClick={handleOnFavorite} />}
      >
      <Meta description={typesString} />
    </Card>
  )
}

export default PokemonCard
