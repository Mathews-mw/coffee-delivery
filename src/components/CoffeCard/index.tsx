import { useContext, useEffect, useState } from 'react';
import { TagCard } from '../TagCard';
import { priceFormatter } from '../../utils/formatter';
import { OrderContext } from '../../contexts/OrderContext';

import { ShoppingCartSimple, Plus, Minus } from 'phosphor-react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';

import { Card, ColorButton, InfosContainer, NumberCount, ValuesContainer } from './styles';

interface ICoffeCardProps {
	id: number;
	product_name: string;
	price: number;
	description: string;
	tags: ITag[] | undefined;
	image_name: string;
	imageUrl: string;
}

export function CoffeCard({ id, product_name, price, description, tags, image_name, imageUrl }: ICoffeCardProps) {
	const { addNewOrder, wishList } = useContext(OrderContext);

	const [amount, setAmount] = useState(0);

	function handleNewOrder(id: number, product_name: string, price: number, amount: number, image_name: string, imageUrl: string) {
		addNewOrder(id, product_name, price, amount, image_name, imageUrl);
	}

	return (
		<Card>
			<img className='coffeImg' src={imageUrl} alt={product_name} />

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
						<strong>{priceFormatter.format(price)}</strong>
					</span>

					<Stack direction='row' spacing={1} alignItems='center'>
						<ButtonGroup variant='contained' color='inherit' size='small' aria-label='small button group'>
							<Button onClick={() => setAmount(amount + 1)}>
								<Plus weight='fill' size={14} color='#8047F8' />
							</Button>
							<Button aria-readonly disableTouchRipple sx={{ cursor: 'default' }}>
								{amount}
							</Button>
							<Button onClick={() => setAmount(amount - 1)} disabled={amount >= 1 ? false : true}>
								<Minus weight='fill' size={14} color='#8047F8' />
							</Button>
						</ButtonGroup>

						<IconButton aria-label='Adicionar' color='secondary' onClick={() => handleNewOrder(id, product_name, price, amount, image_name, imageUrl)} disabled={amount >= 1 ? false : true}>
							<ShoppingCartSimple weight='fill' size={26} />
						</IconButton>
					</Stack>
				</ValuesContainer>
			</div>
		</Card>
	);
}
