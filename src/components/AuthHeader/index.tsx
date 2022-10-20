import Logo from '../../assets/Logo.svg';
import { Divider, HeaderContainer } from './styles';

export function AuthHeader() {
	return (
		<HeaderContainer>
			<img src={Logo} alt='Logo do header' />
			<Divider></Divider>
		</HeaderContainer>
	);
}
