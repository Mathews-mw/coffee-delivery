import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { Checkout } from '../pages/Checkout';
import { Control } from '../pages/Control';
import { Home } from '../pages/Home';
import { ProductsRegister } from '../pages/ProductsRegister';
import { Sucess } from '../pages/Sucess';

export function AdminRoutes() {
	return (
		<Routes>
			<Route path='/' element={<AdminLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='checkout' element={<Checkout />} />
				<Route path='productsregister' element={<ProductsRegister />} />
				<Route path='sucess' element={<Sucess />} />
				<Route path='control' element={<Control />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Route>
		</Routes>
	);
}
