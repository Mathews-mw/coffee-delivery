import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/apiClient';

import axios from 'axios';
import * as yup from 'yup';
import { ShowErrorRequest } from '../../utils/ShowErrorRequest';
import { ShowSuccessRequest } from '../../utils/ShowSuccessRequest';

import { Ordered } from '../../components/Ordered';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from '../../components/Form/InputText';
import { priceFormatter } from '../../utils/formatter';
import { OrderContext } from '../../contexts/OrderContext';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { MapPinLine, CurrencyDollar, CreditCard, Bank, Money, CheckCircle, Check } from 'phosphor-react';

import { HeaderTitle, Form, CheckoutContainer, DeliveryCard, PaymentCard, ProductsCard, HeaderGroup, OrderList, Scroll, RadioGroupCustom, RadioCustom, FormControlLabelCustom } from './styles';

enum PaymantEnum {
	CreditCard = 'creditCard',
	DebitCard = 'debitCard',
	Cash = 'cash',
}

const newCheckoutSchema = yup.object({
	cep: yup.number().required('Campo Obrigatório'),
	rua: yup.string().required('Campo Obrigatório'),
	numero: yup.string().required('Campo Obrigatório'),
	complemento: yup.string().notRequired(),
	bairro: yup.string().required('Campo Obrigatório'),
	cidade: yup.string().required('Campo Obrigatório'),
	uf: yup.string().required('Campo Obrigatório'),
	payment: yup.mixed<PaymantEnum>().oneOf(Object.values(PaymantEnum)),
});

type FormInputs = yup.InferType<typeof newCheckoutSchema>;

export function Checkout() {
	const navigate = useNavigate();

	const { wishList, setWishList, handleConfirmedOrder } = useContext(OrderContext);

	const [address, setAddress] = useState<ICEPRequest>();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const totalCart = wishList.reduce((total, element) => {
		return (total += element.price * element.amount);
	}, 0);

	const delivery = 5.15;
	let totalOrder = totalCart + delivery;

	const {
		register,
		handleSubmit,
		watch,
		control,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormInputs>({
		resolver: yupResolver(newCheckoutSchema),
	});

	async function getCEP() {
		const cep = watch('cep');
		const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

		setAddress(response.data);
	}

	async function handleCreateOrder(data: FormInputs) {
		setSuccess(false);
		setLoading(true);
		let wishIdProducts = wishList.map((wish) => {
			return { product_id: wish.id };
		});

		try {
			const response = await api.post('/orders', {
				cep: data.cep,
				rua: data.rua,
				numero: data.numero,
				complemento: data.complemento,
				bairro: data.bairro,
				cidade: data.cidade,
				uf: data.uf,
				payment: data.payment,
				productsIds: wishIdProducts,
				total_order: totalOrder,
			});

			const { message, order } = await response.data;

			handleConfirmedOrder(order);

			setSuccess(true);
			setLoading(false);
			reset();
			setWishList([]);

			ShowSuccessRequest(message);

			setTimeout(() => {
				navigate(`/sucess/${order.id}`);
			}, 1000);
		} catch (error) {
			ShowErrorRequest(error);
			setLoading(false);
			setSuccess(false);
		}
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
						<InputText mask='' type='number' label='CEP' {...register('cep', { valueAsNumber: true })} error={errors.cep?.message} />
						<Button variant='contained' color='inherit' type='button' size='small' sx={{ height: '3.3rem' }} onClick={() => getCEP()}>
							Pesquisar
						</Button>
					</div>
					<InputText mask='' type='text' label='Rua' defaultValue={address?.logradouro} {...register('rua')} error={errors.rua?.message} />
					<div className='streetGroup'>
						<InputText mask='' type='number' label='Numero' containerStyle={{ width: '20%' }} {...register('numero')} error={errors.numero?.message} />
						<InputText mask='' type='text' label='Complemento' placeholder='Opcional' containerStyle={{ flex: 3.5 }} {...register('complemento')} />
					</div>
					<div className='cityGroup'>
						<InputText mask='' type='text' label='Bairro' defaultValue={address?.bairro} containerStyle={{ flex: 4 }} {...register('bairro')} error={errors.bairro?.message} />
						<InputText mask='' type='text' label='Cidade' defaultValue={address?.localidade} containerStyle={{ flex: 3 }} {...register('cidade')} error={errors.cidade?.message} />
						<InputText mask='' type='text' label='UF' defaultValue={address?.uf} {...register('uf')} error={errors.uf?.message} />
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

					<Controller
						control={control}
						name='payment'
						render={({ field }) => {
							return (
								<RadioGroupCustom row onChange={field.onChange} value={field.value}>
									<FormControlLabelCustom
										sx={{ width: '12.5rem', height: '3.2rem' }}
										value='creditCard'
										label='CARTÃO DE CRÉDITO'
										control={<RadioCustom color='success' icon={<CreditCard size={22} color='#8047F8' />} checkedIcon={<CheckCircle size={22} weight='fill' />} />}
									/>
									<FormControlLabelCustom
										sx={{ width: '12.5rem', height: '3.2rem' }}
										value='debitCard'
										label='CARTÃO DE DÉBITO'
										control={<RadioCustom color='success' icon={<Bank size={22} color='#8047F8' />} checkedIcon={<CheckCircle size={22} weight='fill' />} />}
									/>
									<FormControlLabelCustom
										sx={{ width: '12.5rem', height: '3.2rem' }}
										value='cash'
										label='DINHEIRO'
										control={<RadioCustom color='success' icon={<Money size={22} color='#8047F8' />} checkedIcon={<CheckCircle size={22} weight='fill' />} />}
									/>
								</RadioGroupCustom>
							);
						}}
					/>
				</PaymentCard>

				<ProductsCard>
					<Scroll>
						<OrderList>
							<Stack spacing={3}>
								{wishList.length > 0 &&
									wishList.map((wish) => {
										return <Ordered key={wish.id} id={wish.id} itemName={wish.product_name} price={wish.price} amount={wish.amount} imageName={wish.image_name} imageUrl={wish.imageUrl} />;
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

					<Button variant='contained' size='large' type='submit' sx={{ gap: 2 }} color={success ? 'success' : 'primary'} disabled={isSubmitting}>
						{loading ? <CircularProgress color='success' size={32} /> : success ? <Check size={32} /> : 'CONFIRMAR PEDIDO'}
					</Button>
				</ProductsCard>
			</Form>
		</CheckoutContainer>
	);
}
