import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { Login } from '../pages/Login';
import { Register } from '../pages/UserRegister';

export function AuthRoutes() {
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
