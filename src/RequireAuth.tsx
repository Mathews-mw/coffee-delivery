import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
const { isSigned } = useContext(AuthContext);

export function RequireAuth({ children }: { children: JSX.Element }) {
	const { isSigned } = useContext(AuthContext);

	let location = useLocation();

	if (!isSigned) {
		return <Navigate to='authenticate/login' state={{ from: location }} replace />;
	} else {
		return children;
	}
}
