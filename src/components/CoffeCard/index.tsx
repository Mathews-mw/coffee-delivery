import expressoGelado from '../../assets/expresso-gelado.svg';
import { TagCard } from '../TagCard';
import { ShoppingCartSimple } from 'phosphor-react';
import { Card, InfosContainer, ValuesContainer } from './styles';

interface ICoffeCardProps {
	product_name: string;
	price: number;
	description: string;
	tags: ITag[] | undefined;
	image_name: string;
}

export function CoffeCard({ product_name, price, description, tags, image_name }: ICoffeCardProps) {
	return (
		<Card>
			<img className='coffeImg' src={`http://localhost:3838/files/productsImages/${image_name}`} alt={product_name} />

			<div className='group'>
				<InfosContainer>
					<div className='tagGroups'>
						{tags &&
							tags.map((tag) => {
								return <TagCard tagText={tag.tag} key={tag.id} />;
							})}
					</div>
					<h3>{product_name}</h3>
					<p>{description}</p>
				</InfosContainer>

				<ValuesContainer>
					<span>
						<small>R$</small> <strong>{price}</strong>
					</span>
					<div className='incrementGroup'>
						<button className='increment'>-</button>
						<span>1</span>
						<button className='increment'>+</button>
					</div>
					<button className='buy'>
						<ShoppingCartSimple weight='fill' size={22} />
					</button>
				</ValuesContainer>
			</div>
		</Card>
	);
}
