import { useCallback, useEffect, useState, useRef } from 'react';
import { api } from '../../services/axios/api';
import { EnhancedTable } from '../../components/TableDemo/index';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TablePagination from '@mui/material/TablePagination';

import { ContentContainer, ControlContainer, HeaderTitle } from './styles';

export function Control() {
	const [products, setProducts] = useState<IProduct[]>();
	const [page, setPage] = useState(0);
	const [totalPages, setTotalpages] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalContent, setTotalContent] = useState(1);
	const ref = useRef(0);
	console.log('ref: ', ref);

	console.log(products);
	console.log('page: ', page);
	console.log('rowsPerPage:  ', rowsPerPage);
	console.log(totalContent);
	console.log('totalPages: ', totalPages);
	console.log('currentPage: ', page);

	const fetchProductsData = useCallback(async (pagesAmmount: number, currentPage: number) => {
		try {
			const response = await api.get('/products/paginate', {
				params: {
					pagesAmmount: pagesAmmount,
					currentPage: currentPage,
				},
			});
			const data = await response.data;

			setProducts(data.content);
			setPage(data.currentPage);
			setTotalContent(data.totalContent);
			setTotalpages(data.totalPages);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		fetchProductsData(rowsPerPage, ref.current);
	}, [fetchProductsData, rowsPerPage, ref.current]);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
		ref.current = newPage;
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
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
				</table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={totalContent}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</ContentContainer>
			<EnhancedTable />
		</ControlContainer>
	);
}
