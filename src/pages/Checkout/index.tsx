import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputText } from '../../components/InputText';

import expressoGelado from '../../assets/expresso-gelado.svg';
import americano from '../../assets/americano.svg';

import { MapPinLine, CurrencyDollar, CreditCard, Bank, Money, ShoppingCartSimple, Trash } from 'phosphor-react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { HeaderTitle, Form, CheckoutItem, CheckoutContainer, DeliveryCard, PaymentCard, ProductsCard, HeaderGroup } from './styles';

const newCheckoutSchema = yup.object({
	cep: yup.string(),
});

type formInputs = yup.InferType<typeof newCheckoutSchema>;

export function Checkout() {
	const [address, setAddress] = useState<ICEPRequest>();
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
					<Stack spacing={3}>
						<CheckoutItem>
							<img src={expressoGelado} alt='' width={64} height={64} />
							<div>
								<p>Expresso Tradicional</p>
								<div className='buttonsContainer'>
									<div className='incrementGroup'>
										<button className='increment'>-</button>
										<span>1</span>
										<button className='increment'>+</button>
									</div>
									<Button variant='contained' color='inherit' size='small' startIcon={<Trash weight='fill' size={18} color='#8047F8' />}>
										Remover
									</Button>
								</div>
							</div>
							<strong>R$ 9,90</strong>
						</CheckoutItem>
						<Divider variant='middle' />
						<CheckoutItem>
							<img src={americano} alt='' width={64} height={64} />
							<div>
								<p>Expresso Tradicional</p>
								<div className='buttonsContainer'>
									<div className='incrementGroup'>
										<button className='increment'>-</button>
										<span>1</span>
										<button className='increment'>+</button>
									</div>
									<Button variant='contained' color='inherit' size='small' startIcon={<Trash weight='fill' size={18} color='#8047F8' />}>
										Remover
									</Button>
								</div>
							</div>
							<strong>R$ 9,90</strong>
						</CheckoutItem>
						<Divider variant='middle' />
					</Stack>

					<Stack spacing={2}>
						<div className='resultsInfos'>
							<small>Total de itens</small>
							<span>R$ 29,70</span>
						</div>

						<div className='resultsInfos'>
							<small>Entrega</small>
							<span>R$ 3,50</span>
						</div>

						<div className='resultsInfos'>
							<strong>Total</strong>
							<strong>R$ 33,20</strong>
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
