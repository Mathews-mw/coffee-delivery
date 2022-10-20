import { Outlet } from 'react-router-dom';
import { AuthHeader } from '../../components/AuthHeader';
import { AuthLayoutContainer } from './styles';

export function AuthLayout() {
	return (
		<AuthLayoutContainer>
			<AuthHeader />
			<Outlet />
		</AuthLayoutContainer>
	);
}
