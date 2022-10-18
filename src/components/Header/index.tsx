import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { BackgroundLetterAvatars } from '../BackgroundLetterAvatars';
import { House, MapPin, ShoppingCart, Gear, SignOut } from 'phosphor-react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';

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
	const { signOut } = useContext(AuthContext);

	const [adress, setAdress] = useState<IAdress>();
	const [imageProfile, setImageProfile] = useState(true);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const navigate = useNavigate();

	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const fetchLocal = useCallback(async () => {
		const response = await axios.get('https://viacep.com.br/ws/69054699/json/');
		const { cep, logradouro, complemento, bairro, localidade, uf } = response.data;

		setAdress({
			cep,
			logradouro,
			complemento,
			bairro,
			localidade,
			uf,
		});
	}, []);

	useEffect(() => {
		fetchLocal();
	}, [fetchLocal]);

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
						<NavLink to='/checkout' title='Checkout'>
							<Cart>
								<ShoppingCart weight='fill' size={24} />
							</Cart>
						</NavLink>
					</Tooltip>

					<Tooltip title='Gerenciar conta'>
						<IconButton onClick={handleClick} size='small' sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup='true' aria-expanded={open ? 'true' : undefined}>
							{imageProfile ? (
								<Frame>
									<Avatar alt='Mathews' src='https://avatars.githubusercontent.com/u/97031798?v=4' variant='rounded' sx={{ width: 44, height: 44 }} />
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
					</Menu>

					<Tooltip title='Localização'>
						<Location>
							<MapPin weight='fill' size={22} /> {adress?.localidade}, {adress?.uf}
						</Location>
					</Tooltip>
				</Stack>
			</nav>
		</HeaderContainer>
	);
}
