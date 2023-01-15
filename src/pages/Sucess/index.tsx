import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { OrderContext } from '../../contexts/OrderContext';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { MapPin, CurrencyDollar, Timer } from 'phosphor-react';

import SucessIlustration from '../../../public/illustration.png';
import { Card, Content, Header, Icon, ImageContainer, SucessContainer } from './styles';

export function Sucess() {
	const { confirmedOrder } = useContext(OrderContext);

	const [loading, setLoading] = useState(false);

	let paymentType: string;

	if (confirmedOrder) {
		switch (confirmedOrder.payment) {
			case 'creditCard':
				paymentType = 'Cartão de crédito';
				break;
			case 'debitCard':
				paymentType = 'Cartão de débito';
				break;
			case 'cash':
				paymentType = 'Dinheiro';
				break;
			default:
				paymentType = 'Não informado';
				break;
		}
	}

	return (
		<SucessContainer>
			{loading && (
				<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
					<CircularProgress />
				</Backdrop>
			)}

			<Header>
				<h1>Uhuu! Pedido confirmado</h1>
				<p>Agora é só aguardar que o café logo chegará até você</p>
			</Header>

			<Content>
				<Card>
					<div className='container'>
						<div className='orderInfo'>
							<Icon backgroundColor='purple'>
								<MapPin weight='fill' />
							</Icon>
							<p>
								Entrega em:
								<strong>
									{confirmedOrder.rua}, {confirmedOrder.numero} - {confirmedOrder.bairro}
								</strong>
							</p>
						</div>

						<div className='orderInfo'>
							<Icon backgroundColor='yellow'>
								<Timer weight='fill' />
							</Icon>
							<p>
								Previsão de entrega:
								<strong>20 min - 30 min</strong>
							</p>
						</div>

						<div className='orderInfo'>
							<Icon backgroundColor='yellowDark'>
								<CurrencyDollar weight='fill' />
							</Icon>
							<p>
								Pagamento na entrega:
								<strong>{paymentType}</strong>
							</p>
						</div>
					</div>
				</Card>

				<ImageContainer>
					<img src={SucessIlustration} alt='Ilustration' />
				</ImageContainer>
			</Content>
		</SucessContainer>
	);
}
