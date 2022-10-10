import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, LoginCard, LoginContainer } from './styles';
import { InputText } from '../../components/InputText';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

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
			await signIn(data.email, data.password, setLoading);
		} catch (error) {
			setLoading(false);
			reset();
		}
	}

	return (
		<LoginContainer>
			<LoginCard>
				<h1>Bem-vindo</h1>
				<div>Logo da aplicação</div>
				<Form onSubmit={handleSubmit(handleLoginSubmit)}>
					<InputText label='Email' mask='' className='input' type='text' {...register('email', { disabled: loading })} error={errors.email?.message} required />

					<InputText
						label='Senha'
						mask=''
						passwordView
						className={`input ${errors.password ? 'is-invalid' : ''}`}
						type='password'
						{...register('password', { disabled: loading })}
						error={errors.password?.message}
						required
					/>

					<div>
						<button type='submit' disabled={loading}>
							Acessar
						</button>
						<Link to='/autenticacao/register' style={{ textDecoration: 'none' }}>
							Criar um conta nova
						</Link>
					</div>
				</Form>
			</LoginCard>
		</LoginContainer>
	);
}
