import expressoGelado from '../../assets/expresso-gelado.svg'
import { TagCard } from '../TagCard'
import { ShoppingCartSimple } from 'phosphor-react'
import { Card, InfosContainer, ValuesContainer } from './styles'

interface ICoffeCardProps {
  tags: string[]
}

export function CoffeCard({ tags }: ICoffeCardProps) {
  return (
    <Card>
      <img className='coffeImg' src={expressoGelado} alt="xícara de café" />

      <div className='group'>
        <InfosContainer>
          <div className='tagGroups'>
            {tags.map(tag => {
              return <TagCard tagText={tag} key={Math.random()} />
            })}
          </div>
          <h3>Expresso Gelado</h3>
          <p>Bebida preparada com café expresso e cubos de gelo</p>
        </InfosContainer>

        <ValuesContainer>
          <span> <small>R$</small> <strong>9,90</strong> </span>
          <div className='incrementGroup'>
            <button className='increment'>-</button>
            <span>1</span>
            <button className='increment'>+</button>
          </div>
          <button className='buy'> <ShoppingCartSimple weight='fill' size={22} /> </button>
        </ValuesContainer>
      </div>

    </Card>
  )
}