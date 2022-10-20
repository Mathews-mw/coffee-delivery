import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Checkout } from '../pages/Checkout';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/UserRegister';
import { Sucess } from '../pages/Sucess';

export function AuthRoute() {
	return (
		<Routes>
			<Route path='/authenticate' element={<AuthLayout />}>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
			</Route>
			<Route path='*' element={<Navigate to='/authenticate/login' replace />} />
		</Routes>
	);
}
