import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { AuthLayout } from './layouts/AuthLayout';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Checkout } from './pages/Checkout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Sucess } from './pages/Sucess';
import { RequireAuth } from './RequireAuth';

export function Router() {
	const { isSigned } = useContext(AuthContext);

	return (
		<Routes>
			<Route path='/authenticate' element={<AuthLayout />}>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='*' element={<Navigate to='/authenticate/login' />} />
			</Route>

			{isSigned ? (
				<Route path='/' element={<DefaultLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/checkout' element={<Checkout />} />
					<Route path='/sucess' element={<Sucess />} />
				</Route>
			) : (
				<Route path='*' element={<Navigate to='/authenticate/login' replace />} />
			)}
		</Routes>
	);
}
