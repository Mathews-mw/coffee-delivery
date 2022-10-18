import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { AuthLayout } from '../layouts/AuthLayout';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Home } from '../pages/Home';
import { Checkout } from '../pages/Checkout';
import { Sucess } from '../pages/Sucess';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function Router() {
	const { isSigned, loading } = useContext(AuthContext);

	if (loading) {
		return <div>Carregando, por favor aguarde...</div>;
	}

	return (
		<Routes>
			{isSigned && (
				<Route path='/' element={<DefaultLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='checkout' element={<Checkout />} />
					<Route path='sucess' element={<Sucess />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Route>
			)}
			{!isSigned && (
				<Route path='/authenticate' element={<AuthLayout />}>
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
					<Route path='*' element={<Navigate to='/authenticate/login' replace />} />
				</Route>
			)}
		</Routes>
	);
}
