import { Navigate, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Checkout } from '../pages/Checkout';
import { Home } from '../pages/Home';
import { ProductsRegister } from '../pages/ProductsRegister';
import { Sucess } from '../pages/Sucess';

export function UserRoute() {
	return (
		<Routes>
			<Route path='/' element={<DefaultLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='checkout' element={<Checkout />} />
				<Route path='productsregister' element={<ProductsRegister />} />
				<Route path='sucess' element={<Sucess />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Route>
		</Routes>
	);
}
