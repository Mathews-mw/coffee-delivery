import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/UserRegister';

export function AuthRoutes() {
	return (
		<Routes>
			<Route path='/' element={<DefaultLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Route>
			<Route path='/authenticate' element={<AuthLayout />}>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
			</Route>
			<Route path='*' element={<Navigate to='/authenticate/login' replace />} />
		</Routes>
	);
}
