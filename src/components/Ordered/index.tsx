import { Minus, Plus, Trash } from 'phosphor-react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import americano from '../../assets/americano.svg';
import { Container, CheckoutItem, ColorButton, NumberCount } from './styles';
import { useContext, useEffect } from 'react';
import { OrderContext } from '../../contexts/OrderContext';
import { priceFormatter } from '../../utils/formatter';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';

interface IProps {
	id: number;
	imageName: string;
	itemName: string;
	amount: number;
	price: number;
}

export function Ordered({ id, imageName, itemName, price, amount }: IProps) {
	const { removeWishFromList, incrementAmount } = useContext(OrderContext);

	console.log('amount here: ', amount);

	function handleDeleteWish(id: number) {
		removeWishFromList(id);
	}

	return (
		<Container>
			<CheckoutItem>
				<img src={`http://localhost:3838/files/productsImages/${imageName}`} alt='Imagem do produto' width={24} height={64} />

				<Stack spacing={1}>
					<div className='uperRow'>
						<p>{itemName}</p>

						<strong>{priceFormatter.format(price * amount)}</strong>
					</div>

					<Stack direction='row' spacing={1} alignItems='center'>
						<ButtonGroup variant='contained' color='inherit' size='small' aria-label='small button group'>
							<Button onClick={() => incrementAmount(id, +1)}>
								<Plus weight='fill' size={14} color='#8047F8' />
							</Button>
							<Button aria-readonly disableTouchRipple sx={{ cursor: 'default' }}>
								{amount}
							</Button>
							<Button onClick={() => incrementAmount(id, -1)}>
								<Minus weight='fill' size={14} color='#8047F8' />
							</Button>
						</ButtonGroup>

						<Button variant='contained' color='inherit' size='small' startIcon={<Trash weight='fill' size={18} color='#8047F8' />} onClick={() => handleDeleteWish(id)}>
							Remover
						</Button>
					</Stack>
				</Stack>
			</CheckoutItem>
			<Divider />
		</Container>
	);
}
