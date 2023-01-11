import { useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { UserRoutes } from './User.routes';
import { AuthRoutes } from './Auth.routes';
import { AdminRoutes } from './Admin.routes';
import { AuthContext } from '../contexts/AuthContext';

export function Router() {
	const navigate = useNavigate();
	const { isSigned, isAdmin, loading } = useContext(AuthContext);

	if (loading) {
		return (
			<div>
				<h2>Carregando, por favor aguarde...</h2>
			</div>
		);
	}

	return (
		<Routes>
			{isSigned && isAdmin && <Route path='*' element={<AdminRoutes />} />}
			{isSigned && !isAdmin && <Route path='*' element={<UserRoutes />} />}
			{!isSigned && <Route path='*' element={<AuthRoutes />} />}
		</Routes>
	);
}
