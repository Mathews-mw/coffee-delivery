import axios from 'axios';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { Ordered } from '../../components/Ordered';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputText } from '../../components/InputText';
import { OrderContext } from '../../contexts/OrderContext';

import { MapPinLine, CurrencyDollar, CreditCard, Bank, Money, ShoppingCartSimple, Trash } from 'phosphor-react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { HeaderTitle, Form, CheckoutContainer, DeliveryCard, PaymentCard, ProductsCard, HeaderGroup, OrderList, Scroll } from './styles';
import { priceFormatter } from '../../utils/formatter';

const newCheckoutSchema = yup.object({
	cep: yup.string(),
});

type formInputs = yup.InferType<typeof newCheckoutSchema>;

export function Checkout() {
	const { wishList, removeWishFromList } = useContext(OrderContext);

	const [address, setAddress] = useState<ICEPRequest>();

	const totalCart = wishList.reduce((total, element) => {
		return (total += element.price * element.amount);
	}, 0);

	const totalAmount = wishList.reduce((amount, element) => {
		return (amount += element.amount);
	}, 0);

	const delivery = 3.5;
	const totalOrder = totalCart + delivery;

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<formInputs>({
		resolver: yupResolver(newCheckoutSchema),
	});

	async function getCEP() {
		const cep = watch('cep');
		const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

		setAddress(response.data);
	}

	function handleCreateOrder(data: any) {
		console.log(data);
	}

	return (
		<CheckoutContainer>
			<HeaderTitle>
				<Stack direction={'row'} spacing={72}>
					<h1>Complete se pedido</h1>

					<h1>Cafés selecionados</h1>
				</Stack>
			</HeaderTitle>

			<Form onSubmit={handleSubmit(handleCreateOrder)}>
				<DeliveryCard>
					<HeaderGroup color='yellowDark'>
						<span>
							<MapPinLine size={22} />
						</span>
						<div>
							<h4>Endereço de entrega</h4>
							<p>Informe o endereço onde deseja receber seu pedido</p>
						</div>
					</HeaderGroup>

					<div className='cepGroup'>
						<InputText mask='' type='number' label='CEP' {...register('cep')} />
						<Button variant='contained' color='inherit' type='button' size='small' sx={{ height: '3.3rem' }} onClick={() => getCEP()}>
							Pesquisar
						</Button>
					</div>
					<InputText mask='' type='text' label='Rua' defaultValue={address?.logradouro} />
					<div className='streetGroup'>
						<InputText mask='' type='number' label='Numero' containerStyle={{ width: '20%' }} />
						<InputText mask='' type='text' label='Complemento' placeholder='Opcional' containerStyle={{ flex: 3.5 }} />
					</div>
					<div className='cityGroup'>
						<InputText mask='' type='text' label='Bairro' defaultValue={address?.bairro} containerStyle={{ flex: 2 }} />
						<InputText mask='' type='text' label='Cidade' defaultValue={address?.localidade} containerStyle={{ flex: 5.5 }} />
						<InputText mask='' type='text' label='UF' defaultValue={address?.uf} />
					</div>
				</DeliveryCard>

				<PaymentCard>
					<HeaderGroup color='purple'>
						<span>
							<CurrencyDollar size={22} />
						</span>
						<div>
							<h4>Pagamento</h4>
							<p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
						</div>
					</HeaderGroup>

					<div className='paymentType'>
						<Button variant='contained' startIcon={<CreditCard size={22} color='#8047F8' />} color='inherit' sx={{ width: '12.5rem', height: '3.2rem' }}>
							CARTÃO DE CRÉDITO
						</Button>

						<Button variant='contained' startIcon={<Bank size={22} color='#8047F8' />} color='inherit' sx={{ width: '12.5rem', height: '3.2rem' }}>
							CARTÃO DE DÉBITO
						</Button>

						<Button variant='contained' startIcon={<Money size={22} color='#8047F8' />} color='inherit' sx={{ width: '12.5rem', height: '3.2rem' }}>
							DINHEIRO
						</Button>
					</div>
				</PaymentCard>

				<ProductsCard>
					<Scroll>
						<OrderList>
							<Stack spacing={3}>
								{wishList.length > 0 &&
									wishList.map((wish) => {
										return <Ordered key={wish.id} id={wish.id} itemName={wish.product_name} price={wish.price} amount={wish.amount} imageName={wish.image_name} />;
									})}
							</Stack>
						</OrderList>
					</Scroll>

					<Stack spacing={2}>
						<div className='resultsInfos'>
							<small>Total do carrinho</small>
							<span>{priceFormatter.format(totalCart)}</span>
						</div>

						<div className='resultsInfos'>
							<small>Entrega</small>
							<span>{priceFormatter.format(delivery)}</span>
						</div>

						<div className='resultsInfos'>
							<strong>Total</strong>
							<strong>{priceFormatter.format(totalOrder)}</strong>
						</div>
					</Stack>

					<Button variant='contained' size='large' type='submit'>
						CONFIRMAR PEDIDO
					</Button>
				</ProductsCard>
			</Form>
		</CheckoutContainer>
	);
}
