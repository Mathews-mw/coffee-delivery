import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { InputText } from '../../components/Form/InputText';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import { Form, LoginCard, LoginContainer, ButtonsGroup, ColorButton } from './styles';
import { ShowErrorRequest } from '../../utils/ShowErrorRequest';

const loginFormSchema = Yup.object({
	email: Yup.string().required('Campo obrigatório'),
	password: Yup.string().required('Campo obrigatório'),
});

type loginFormInputs = Yup.InferType<typeof loginFormSchema>;

export function Login() {
	const { signIn } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<loginFormInputs>({
		resolver: yupResolver(loginFormSchema),
	});

	async function handleLoginSubmit(data: loginFormInputs) {
		try {
			await signIn(data.email, data.password);
		} catch (error) {
			setLoading(false);
		}
	}

	return (
		<LoginContainer>
			<Form onSubmit={handleSubmit(handleLoginSubmit)}>
				<LoginCard>
					<div className='headerGroup'>
						<h1>Login</h1>
					</div>
					<InputText label='Email' mask='' className='input' type='text' {...register('email', { disabled: loading })} error={errors.email ? errors.email.message : ''} />
					<InputText label='Senha' mask='' passwordView error={errors.password ? errors.password.message : ''} type='password' {...register('password', { disabled: loading })} />

					<ButtonsGroup>
						<ColorButton variant='contained' type='submit' disabled={loading}>
							Acessar
						</ColorButton>
						<Link to='/authenticate/register' style={{ textDecoration: 'none' }}>
							<ColorButton variant='contained' color='secondary'>
								Criar Conta
							</ColorButton>
						</Link>
					</ButtonsGroup>
				</LoginCard>
			</Form>
		</LoginContainer>
	);
}
