import { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/axios/api';

import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

import { ContentContainer, ControlContainer, HeaderTitle } from './styles';

export function Control() {
	const [products, setProducts] = useState<IProduct[]>();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const fetchProductsData = useCallback(async () => {
		const response = await api.get('/products');

		setProducts(response.data);
	}, []);

	useEffect(() => {
		fetchProductsData();
	}, [fetchProductsData]);

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(parseInt(event.target.value, 5));
		setPage(0);
	};

	return (
		<ControlContainer>
			<HeaderTitle>
				<h1>Control</h1>
			</HeaderTitle>

			<ContentContainer>
				<table>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Preço</th>
							<th>Descrição</th>
							<th>Imagem</th>
						</tr>
					</thead>
					<tbody>
						{products?.map((product) => {
							return (
								<tr key={product.id}>
									<td>{product.product_name}</td>
									<td>R$ {product.price}</td>
									<td>{product.description}</td>
									<td>
										<img className='coffeImg' src={`http://localhost:3838/files/productsImages/${product.image_name}`} alt={product.image_name} />
									</td>
								</tr>
							);
						})}
					</tbody>
					<tfoot>
						<td colSpan={4}>
							{/* prettier-ignore */}
							<TablePagination 
								component='div' 
								// @ts-ignore
								count={products?.length} 
								page={page} 
								onPageChange={handleChangePage} 
								rowsPerPage={rowsPerPage} 
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</td>
					</tfoot>
				</table>
			</ContentContainer>
		</ControlContainer>
	);
}
