import { Outlet } from 'react-router-dom';
import { AuthLayoutContainer } from './styles';

export function AuthLayout() {
	return (
		<AuthLayoutContainer>
			<div>
				<h1>header</h1>
			</div>
			<Outlet />
		</AuthLayoutContainer>
	);
}
