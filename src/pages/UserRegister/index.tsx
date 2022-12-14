import * as yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { cpf } from 'cpf-cnpj-validator';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { api } from '../../services/apiClient';
import { InputText } from '../../components/Form/InputText';
import { ShowErrorRequest } from '../../utils/ShowErrorRequest';
import { ShowSuccessRequest } from '../../utils/ShowSuccessRequest';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { UserPlus } from 'phosphor-react';
import { RegisterCard, RegisterContainer, Form, ButtonsGroup, ColorButton } from './styles';

const registerFormSchema = yup.object({
	name: yup.string().required('Campo obrigatório!'),
	email: yup.string().email().required('Campo obrigatório!'),
	cpf: yup
		.string()
		.required('Campo obrigatório!')
		.test('validateCPF', 'CPF inválido', (value) => cpf.isValid(value || '')),
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
		reset,
		formState: { errors },
	} = useForm<RegisterFormInputs>({
		resolver: yupResolver(registerFormSchema),
	});

	const navigate = useNavigate();

	const [loadingActions, setLoadingActions] = useState(false);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	async function handleRegisterNewUser(data: RegisterFormInputs) {
		const { name, email, cpf, password, confirm_password, phone, avatar } = data;

		try {
			setLoadingActions(true);

			const newUser = {
				name,
				email,
				cpf,
				phone_number: phone,
				password,
				confirm_password,
				avatar,
			};
			const { data: dataResult } = await api.post('/users', newUser);

			setLoadingActions(false);
			ShowSuccessRequest(data);
			reset();

			navigate('/authenticate/login');
		} catch (error) {
			ShowErrorRequest(error);
		}
	}

	function onError() {
		toast('Preencha os campos obrigatórios', {
			autoClose: 3000,
			type: 'warning',
			draggable: true,
			theme: 'dark',
			position: 'bottom-right',
		});
	}

	return (
		<RegisterContainer>
			<Form onSubmit={handleSubmit(handleRegisterNewUser, onError)}>
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
					<InputText mask='' type='text' label='CPF' {...register('cpf')} error={errors.cpf?.message} />
					<InputText mask='' label='Telefone' {...register('phone')} error={errors.phone?.message} />
					<div className='imgLink'>
						<Button color='info' variant='contained' onClick={handleClickOpen}>
							Inserir link para imagem de perfil
						</Button>
					</div>
					<InputText mask='' type='password' label='Senha' passwordView {...register('password')} error={errors.password?.message} />
					<InputText mask='' type='password' label='Confirmar senha' passwordView {...register('confirm_password')} error={errors.confirm_password?.message} />

					<ButtonsGroup>
						<ColorButton variant='contained' type='submit'>
							Criar
						</ColorButton>
						<Link to='/authenticate/login' style={{ textDecoration: 'none' }}>
							<ColorButton variant='contained' color='info'>
								Voltar
							</ColorButton>
						</Link>
					</ButtonsGroup>
				</RegisterCard>

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
			</Form>
		</RegisterContainer>
	);
}
