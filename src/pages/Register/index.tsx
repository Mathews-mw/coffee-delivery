import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { InputText } from '../../components/InputText';
import { UserPlus } from 'phosphor-react';
import { RegisterCard, RegisterContainer, Form } from './styles';
import { useState } from 'react';
import { api } from '../../services/axios/api';

const registerFormSchema = yup.object({
	name: yup.string().required('Campo obrigatório!'),
	email: yup.string().email().required('Campo obrigatório!'),
	phone: yup.string().required('Campo obrigatório!'),
	password: yup.string().required('Campo obrigatório!').min(8, 'Sua senha precisa ter no mínimo 8 dígitos'),
	confirm_password: yup.string().required('Campo obrigatório!'),
	avatar: yup.string().notRequired(),
});

type RegisterFormInputs = yup.InferType<typeof registerFormSchema>;

export function Register() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegisterFormInputs>({
		resolver: yupResolver(registerFormSchema),
	});

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	async function handleRegisterNewUser(data: RegisterFormInputs) {
		const { name, email, password, confirm_password, phone, avatar } = data;

		const newUser = {
			name: data.name,
			email: data.email,
			phone: data.phone,
			password: data.password,
			confirm_password: data.confirm_password,
			avatar: data.avatar,
		};

		console.log(newUser);
		await api.post('/users', newUser);
	}

	return (
		<RegisterContainer>
			<Form onSubmit={handleSubmit(handleRegisterNewUser)}>
				<RegisterCard>
					<div className='headerGroup'>
						<span>
							{' '}
							<UserPlus size={22} />{' '}
						</span>
						<div>
							<h4>Crie sua conta</h4>
							<p>Registe-se na nossa plataforma para ter uma melhor experiência</p>
						</div>
					</div>

					<InputText mask='' type='text' label='Nome' {...register('name')} error={errors.name?.message} />
					<InputText mask='' type='email' label='E-mail' {...register('email')} error={errors.email?.message} />
					<InputText mask='(99) 99999-9999' label='Telefone' {...register('phone')} error={errors.phone?.message} />
					<InputText mask='' type='password' label='Senha' passwordView {...register('password')} error={errors.password?.message} />
					<InputText mask='' type='password' label='Confirmar senha' passwordView {...register('confirm_password')} error={errors.confirm_password?.message} />

					<div>
						<Button color='secondary' variant='outlined' onClick={handleClickOpen}>
							Open alert dialog
						</Button>
						<Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
							<DialogTitle id='alert-dialog-title'>{'Gostaria de usar uma foto de perfil?'}</DialogTitle>
							<DialogContent>
								<DialogContentText id='alert-dialog-description'>
									<Typography gutterBottom>
										Como vocês está se registrando agora, só é possível referenciar uma imagem para seu perfil através de algum link de alguma foto sua já existente na Web. Por exemplo:
										(https://avatars.githubusercontent.com/u/97031798?v=4). Qualquer link válido irá servir para ser sua foto de perfil.
									</Typography>
									<Typography gutterBottom>Após concluir seu cadastro, você pode editar seu perfil e então subir uma imagem para usar como foto de perfil.</Typography>
									<Typography gutterBottom>
										<InputText mask='' type='link' label='Link para foto de perfil' {...register('avatar')} />
									</Typography>
								</DialogContentText>
								<DialogActions>
									<Button color='secondary' onClick={handleClose}>
										Ok
									</Button>
								</DialogActions>
							</DialogContent>
						</Dialog>
					</div>

					<button type='submit'> Criar </button>
				</RegisterCard>
			</Form>
		</RegisterContainer>
	);
}
