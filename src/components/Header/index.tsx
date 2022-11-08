import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { OrderContext } from '../../contexts/OrderContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { InputText } from '../InputText';
import { BackgroundLetterAvatars } from '../BackgroundLetterAvatars';

import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemIcon from '@mui/material/ListItemIcon';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { House, MapPin, ShoppingCart, Gear, SignOut, Storefront, ListDashes, SignIn } from 'phosphor-react';

import Logo from '../../assets/Logo.svg';
import { Cart, HeaderContainer, Location, Home, Frame } from './styles';

interface IAdress {
	cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	localidade: string;
	uf: string;
}

export function Header() {
	const navigate = useNavigate();

	const { wishList } = useContext(OrderContext);
	const { signOut, user } = useContext(AuthContext);

	const [adress, setAdress] = useState<IAdress>();
	const [imageProfile, setImageProfile] = useState(true);
	const [inputCep, setInputCep] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [openAlertModal, setOpenAlertModal] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleClickAlertModalOpen = () => {
		setOpenAlertModal(true);
	};

	const handleClickAlertModalClose = () => {
		setOpenAlertModal(false);
		navigate('authenticate/login');
	};

	async function fetchLocal() {
		const response = await axios.get(`https://viacep.com.br/ws/${inputCep}/json/`);
		const { cep, logradouro, complemento, bairro, localidade, uf } = response.data;

		setAdress({
			cep,
			logradouro,
			complemento,
			bairro,
			localidade,
			uf,
		});

		setOpenModal(false);
	}

	function handleSetLogOut() {
		signOut();
		navigate('authenticate/login');
	}

	return (
		<HeaderContainer>
			<img src={Logo} alt='Logo do header' />
			<nav>
				<Stack spacing={2} direction='row'>
					<Tooltip title='Home'>
						<NavLink to='/'>
							<Home>
								<House weight='fill' size={24} />
							</Home>
						</NavLink>
					</Tooltip>

					<Tooltip title='Checkout'>
						{user ? (
							<NavLink to='/checkout'>
								<Badge badgeContent={wishList.length} color='secondary'>
									<Cart>
										<ShoppingCart weight='fill' size={24} />
									</Cart>
								</Badge>
							</NavLink>
						) : (
							<NavLink to='/'>
								<Badge badgeContent={wishList.length} color='secondary'>
									<Cart>
										<ShoppingCart weight='fill' size={24} onClick={() => handleClickAlertModalOpen()} />
									</Cart>
								</Badge>
							</NavLink>
						)}
					</Tooltip>

					<Tooltip title='Registro de produtos'>
						<NavLink to='/product/register'>
							<Cart>
								<Storefront weight='fill' size={24} />
							</Cart>
						</NavLink>
					</Tooltip>

					<Tooltip title='Controle de produtos'>
						<NavLink to='/control'>
							<Cart>
								<ListDashes weight='fill' size={24} />
							</Cart>
						</NavLink>
					</Tooltip>

					<Tooltip title='Gerenciar conta'>
						<IconButton onClick={handleClick} size='small' sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup='true' aria-expanded={open ? 'true' : undefined}>
							{imageProfile ? (
								<Frame>
									<Avatar alt='Mathews' src={user?.avatar} variant='rounded' sx={{ width: 44, height: 44 }} />
								</Frame>
							) : (
								<Frame>
									<BackgroundLetterAvatars />
								</Frame>
							)}
						</IconButton>
					</Tooltip>
					<Menu
						anchorEl={anchorEl}
						id='account-menu'
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
								mt: 1.5,
								'& .MuiAvatar-root': {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1,
								},
								'&:before': {
									content: '""',
									display: 'block',
									position: 'absolute',
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: 'background.paper',
									transform: 'translateY(-50%) rotate(45deg)',
									zIndex: 0,
								},
							},
						}}
						transformOrigin={{ horizontal: 'right', vertical: 'top' }}
						anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
					>
						<MenuItem>
							<Link to='/authenticate/login'>
								<ListItemIcon>
									<SignIn size={20} />
								</ListItemIcon>
							</Link>
							Login
						</MenuItem>
						{!!user && (
							<>
								<MenuItem>
									<ListItemIcon>
										<Gear size={20} />
									</ListItemIcon>
									Configurações
								</MenuItem>
								<MenuItem>
									<ListItemIcon>
										<IconButton onClick={handleSetLogOut}>
											<SignOut size={20} />
										</IconButton>
									</ListItemIcon>
									Sair
								</MenuItem>
							</>
						)}
					</Menu>

					<Tooltip title='Localização'>
						<Location>
							<MapPin weight='fill' size={22} />
							<Button variant='text' color='secondary' onClick={handleClickOpenModal}>
								{!!adress ? `${adress?.localidade}, ${adress?.uf}` : 'Sua localização?'}
							</Button>
						</Location>
					</Tooltip>
				</Stack>
			</nav>

			<Dialog open={openModal} onClose={handleCloseModal} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>Insira seu CEP para identifcar sua localização</DialogTitle>
				<DialogContent>
					<Stack spacing={2}>
						<DialogContentText id='alert-dialog-description'>
							Para ter mais praticidade e sabermos de onde vocês está fazendo seu pedido, por favor, insira seu cep para identificarmos sua região.
						</DialogContentText>
						<InputText mask='' type='number' label='CEP:' containerStyle={{ width: '25%' }} onChange={(e) => setInputCep(e.target.value)} />
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button onClick={fetchLocal}>Buscar CEP</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={openAlertModal} onClose={() => setOpenAlertModal(false)} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>Faça o login para finalizar sua compra</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>Para prosseguir para a página de checkout e concluir sua compra, é necessário que você faça o login antes.</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClickAlertModalClose}>Fazer login</Button>
					<Button onClick={() => setOpenAlertModal(false)}>OK</Button>
				</DialogActions>
			</Dialog>
		</HeaderContainer>
	);
}
