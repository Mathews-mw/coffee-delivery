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
import Stack from '@mui/material/Stack';
import { InputText } from '../../components/InputText';
import { UserPlus } from 'phosphor-react';
import { useState } from 'react';
import { api } from '../../services/axios/api';

import { RegisterCard, RegisterContainer, Form, ButtonsGroup, ColorButton } from './styles';
import theme from '../../styles/themes/theme';

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
							<UserPlus size={22} />
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

					<ButtonsGroup>
						<Stack direction={'column'} spacing={2}>
							<Button color='info' variant='contained' onClick={handleClickOpen}>
								Open alert dialog
							</Button>
							<Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
								<DialogTitle id='alert-dialog-title'>{'Gostaria de usar uma foto de perfil?'}</DialogTitle>
								<DialogContent>
									<DialogContentText id='alert-dialog-description'>
										<Typography gutterBottom align='left'>
											Como vocês está se registrando agora, só é possível referenciar uma imagem para seu perfil através de algum link de alguma foto sua já existente na Web. Por exemplo:
											<i>(https://avatars.githubusercontent.com/u/97031798?v=4).</i> Qualquer link válido irá servir para ser sua foto de perfil.
										</Typography>
										<Typography gutterBottom>Após concluir seu cadastro, você pode editar seu perfil e então subir uma imagem para usar como foto de perfil.</Typography>
										<Typography gutterBottom>
											<InputText mask='' type='link' label='Link para foto de perfil' {...register('avatar')} />
										</Typography>
									</DialogContentText>
									<DialogActions>
										<Button color='primary' variant='contained' onClick={handleClose}>
											Ok
										</Button>
									</DialogActions>
								</DialogContent>
							</Dialog>
							<ColorButton variant='contained' type='submit'>
								Criar
							</ColorButton>
						</Stack>
					</ButtonsGroup>
				</RegisterCard>
			</Form>
		</RegisterContainer>
	);
}
