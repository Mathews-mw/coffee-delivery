import { Navigate, Route, Routes } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Sucess } from '../pages/Sucess';
import { Control } from '../pages/Control';
import { Checkout } from '../pages/Checkout';
import { AdminLayout } from '../layouts/AdminLayout';
import { EditProduct, RegisterProduct } from '../pages/Products';

export function AdminRoutes() {
	return (
		<Routes>
			<Route path='/' element={<AdminLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='checkout' element={<Checkout />} />
				<Route path='product/register' element={<RegisterProduct />} />
				<Route path='product/edit/:ID' element={<EditProduct />} />
				<Route path='sucess' element={<Sucess />} />
				<Route path='control' element={<Control />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Route>
		</Routes>
	);
}
