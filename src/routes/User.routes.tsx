import { Navigate, Route, Routes } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Sucess } from '../pages/Sucess';
import { Checkout } from '../pages/Checkout';
import { DefaultLayout } from '../layouts/DefaultLayout';

export function UserRoutes() {
	return (
		<Routes>
			<Route path='/' element={<DefaultLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='/checkout' element={<Checkout />} />
				<Route path='/sucess/:ID' element={<Sucess />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Route>
		</Routes>
	);
}
