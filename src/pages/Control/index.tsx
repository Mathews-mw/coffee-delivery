import { useNavigate } from 'react-router-dom';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useCallback, useEffect, useState, useContext } from 'react';

import { api } from '../../services/axios/api';
import { AuthContext } from '../../contexts/AuthContext';
import { ShowErrorRequest } from '../../utils/ShowErrorRequest';

import CircularProgress from '@mui/material/CircularProgress';

import { ContentContainer, ControlContainer, HeaderTitle } from './styles';

export function Control() {
	const { user } = useContext(AuthContext);

	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState<IProduct[]>();

	const fetchProductsData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get('/products');
			const data = await response.data;

			setProducts(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			ShowErrorRequest(error);
			navigate('/');
		}
	}, []);

	useEffect(() => {
		if (user) {
			fetchProductsData();
		}
	}, [user]);

	const columns: TableColumn<IProduct>[] = [
		{
			name: 'Nome',
			cell: (row) => row.product_name,
			selector: (row) => row.product_name,
			sortable: true,
		},
		{
			name: 'Preço',
			cell: (row) => row.price,
			selector: (row) => row.price,
			sortable: true,
		},
		{
			name: 'Descrição',
			cell: (row) => row.description,
			grow: 4,
		},
		{
			name: 'Imagem',
			cell: (row) => {
				return <img className='coffeImg' src={`http://localhost:3838/files/productsImages/${row.image_name}`} alt={row.image_name} style={{ width: '4rem', padding: '0.5rem 0' }} />;
			},
		},
	];

	return (
		<ControlContainer>
			<HeaderTitle>
				<h1>Controle de produtos</h1>
			</HeaderTitle>

			<ContentContainer>
				<DataTable<IProduct>
					columns={columns}
					data={products}
					responsive
					persistTableHead
					pagination
					striped
					pointerOnHover
					highlightOnHover
					progressPending={loading}
					progressComponent={<CircularProgress size={68} />}
					onRowClicked={(row) => navigate(`/product/edit/${row.id}`)}
					noHeader={true}
					noDataComponent={<span style={{ margin: 40 }}>Nenhum registro foi encontrado</span>}
					paginationComponentOptions={{
						rowsPerPageText: 'Linhas por página',
						rangeSeparatorText: 'de',
						selectAllRowsItem: true,
						selectAllRowsItemText: 'Todos',
					}}
				/>
			</ContentContainer>
		</ControlContainer>
	);
}
