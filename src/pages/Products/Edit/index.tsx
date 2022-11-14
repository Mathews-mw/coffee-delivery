import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { api } from '../../../services/axios/api';
import { InputText } from '../../../components/InputText';
import { ShowErrorRequest } from '../../../utils/ShowErrorRequest';
import { ShowSuccessRequest } from '../../../utils/ShowSuccessRequest';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { green } from '@mui/material/colors';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';

import { Tag, FilePng, Check, FloppyDiskBack } from 'phosphor-react';

import { ProductsRegContainer, ProductsRegCard, TagsSelect, ProductImageCard, HeaderGroup, HeaderTitle, Form, MainContent } from './styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

function getStyles(name: string, personName: readonly string[], theme: Theme) {
	return {
		fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	};
}
const selectTags = ['Tradicional', 'Gelado', 'Com leite', 'Especial', 'Alcoólico'];

const ProductUpdateSchema = yup.object({
	product_name: yup.string().notRequired(),
	tags: yup.mixed().notRequired(),
	price: yup.mixed().notRequired(),
	description: yup.string().notRequired(),
});

const UpdatImageSchema = yup.object({
	product_img: yup
		.mixed()
		.required()
		.test('fileVerifyMin', 'Campo obrigatório', (value) => value.length > 0)
		.test('fileVerifyMax', 'Quatidade máxima de arquivos permitidos 1', (value) => value.length < 2)
		.test('fileFormat', 'Formato não permitido', (value) => value[0] && ['png', 'jpeg', 'svg'].includes(value[0].name.split('.').slice(-1)[0]))
		.test('fileSize', 'Tamanho máximo permitido 20 MB', (value) => value[0] && value[0].size <= 5000000),
});

type InputProductUpdateForm = yup.InferType<typeof ProductUpdateSchema>;
type InputUpdateImageForm = yup.InferType<typeof UpdatImageSchema>;

export function Edit() {
	const theme = useTheme();
	const { ID } = useParams();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [imageName, setImageName] = useState<any>();
	const [product, setProduct] = useState<IProductView>();
	const [imageDisplay, setImageDisplay] = useState<any>('');
	const [personName, setPersonName] = useState<string[]>([]);
	const [openAlertModal, setOpenAlertModal] = useState(false);

	const formProductUpdate = useForm<InputProductUpdateForm>({
		resolver: yupResolver(ProductUpdateSchema),
	});

	const formUpdateImage = useForm<InputUpdateImageForm>({
		resolver: yupResolver(UpdatImageSchema),
	});

	const buttonSx = {
		...(success && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700],
			},
		}),
	};

	const fetchProductData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get(`/products/${ID}`);
			const data = await response.data;

			const defaultTags = data.tags.map((tag: any) => {
				return tag.tag;
			});

			const editProduct = {
				id: ID,
				product_name: data.product_name,
				price: data.price,
				description: data.description,
				image_name: data.image_name,
				tags: defaultTags,
				created_at: data.created_at,
				updated_at: data.update_at,
				uuid_ref_tag: data.uuid_ref_tag,
			} as any;

			setProduct(editProduct);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			ShowErrorRequest(error);
			navigate(-1);
		}
	}, []);

	const fileUpload = formUpdateImage.watch('product_img');

	async function uploadImage() {
		if (fileUpload) {
			const base64 = await convertBase64(fileUpload[0]);

			setImageDisplay(base64);
			setImageName(fileUpload[0]);
		}
	}

	function convertBase64(file: any) {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	}

	useEffect(() => {
		uploadImage();
	}, [fileUpload]);

	useEffect(() => {
		fetchProductData();
	}, [ID]);

	useEffect(() => {
		if (product) {
			const prriceFormatted = product.price.toString().replace('.', ',');

			formProductUpdate.reset({
				product_name: product.product_name,
				tags: product.tags,
				price: prriceFormatted,
				description: product.description,
			});
			formUpdateImage.reset({ product_img: product.image_name });
		}
	}, [ID, product]);

	async function handleEditImage(data: InputUpdateImageForm) {
		setLoading(true);
		setSuccess(false);

		const formData = new FormData();
		try {
			formData.append('image_name', fileUpload[0]);

			const response = await api.patch(`/products/image/${ID}`, formData, { headers: { 'Content-Type': 'multipart/form-data;' } });

			ShowSuccessRequest(response.data);
			setImageDisplay(null);
			setImageName(null);

			uploadImage();

			setLoading(false);
			setSuccess(true);
			formUpdateImage.reset();
		} catch (error) {
			ShowErrorRequest(error);
		}
	}

	async function handleEditProduct(data: InputProductUpdateForm) {
		try {
			const response = await api.put(`/products/${ID}`, {
				product_name: data.product_name,
				price: data.price,
				description: data.description,
				uuid_ref_tag: product.uuid_ref_tag,
				tags: data.tags,
			});

			await ShowSuccessRequest(response.data);
			formProductUpdate.reset();
			navigate('/control');
		} catch (error) {
			ShowErrorRequest(error);
			navigate('/control');
		}
	}

	async function handleDeleteProduct() {
		try {
			const response = await api.delete(`/products/${ID}`);

			ShowSuccessRequest(response.data);
			navigate('/control');
		} catch (error) {
			ShowErrorRequest(error);
			navigate('/control');
		}
	}

	return (
		<ProductsRegContainer>
			{loading && <CircularProgress size={68} />}

			<HeaderTitle>
				<h1>Registro de produtos</h1>
			</HeaderTitle>

			<MainContent>
				<Form onSubmit={formProductUpdate.handleSubmit(handleEditProduct)}>
					<ProductsRegCard>
						<HeaderGroup>
							<span>
								<Tag size={22} />
							</span>
							<div>
								<h4>Informações sobre o produto</h4>
								<p>Insira aqui as informações necessárias para cadastrar o produto na loja virtual</p>
							</div>
						</HeaderGroup>

						<InputText mask='' type='text' label='Nome do produto' containerStyle={{ width: '50%' }} {...formProductUpdate.register('product_name')} />

						<TagsSelect>
							<Controller
								control={formProductUpdate.control}
								name='tags'
								render={({ field }) => {
									return (
										<FormControl sx={{ width: 300 }}>
											<InputLabel id='demo-multiple-chip-label'>Tags</InputLabel>
											<Select
												labelId='demo-multiple-chip-label'
												id='demo-multiple-chip'
												multiple
												value={field?.value ? field.value : personName}
												onChange={(event: any) => {
													setPersonName(event.target.value as string[]);
													formProductUpdate.setValue('tags', event.target.value);
												}}
												input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
												renderValue={(selected) => (
													<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
														{selected.map((value) => (
															<Chip key={value} label={value} />
														))}
													</Box>
												)}
											>
												{selectTags.map((name) => (
													<MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
														{name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									);
								}}
							/>
						</TagsSelect>

						<InputText mask='99,99' type='text' label='Preço' defaultValue={'00,00'} containerStyle={{ width: '50%' }} {...formProductUpdate.register('price')} />
						<TextField
							label='Descrição'
							id='Description'
							multiline
							autoFocus
							rows={4}
							variant='outlined'
							placeholder='Insira alguma descrição para o produto...'
							{...formProductUpdate.register('description')}
						/>

						<div className='buttonsGroup'>
							<Button variant='contained' type='submit' disabled={loading}>
								Atualizar produto
							</Button>

							<Button color='warning' disabled={loading} onClick={() => setOpenAlertModal(true)}>
								Deletar Produto
							</Button>
						</div>
					</ProductsRegCard>
				</Form>

				<ProductImageCard>
					<HeaderGroup>
						<span>
							<FilePng size={22} />
						</span>
						<div>
							<h4>Inserir imagem</h4>
						</div>
					</HeaderGroup>
					<div className='imgGroup'>
						{imageDisplay ? <img src={imageDisplay} alt='' /> : <img className='coffeImg' src={`http://localhost:3838/files/productsImages/${product?.image_name}`} alt='' />}

						{imageName && <span>{imageName.name}</span>}
					</div>

					<Divider />

					<Form onSubmit={formUpdateImage.handleSubmit(handleEditImage)}>
						<Stack direction={'row'} spacing={2}>
							<Button variant='contained' component='label'>
								Upload
								<input hidden accept='image/*' type='file' {...formUpdateImage.register('product_img')} />
							</Button>

							{/* prettier-ignore */}
							<Fab aria-label='save' 
              color='primary' 
              sx={buttonSx} 
              type='submit'
              disabled={loading}
              >
								{loading ? <CircularProgress color='success' size={32} /> : success ? <Check size={32}/> : <FloppyDiskBack size={32}/>}
							</Fab>
						</Stack>
					</Form>
				</ProductImageCard>
			</MainContent>

			<Dialog open={openAlertModal} onClose={() => setOpenAlertModal(false)} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>Certeza que deseja deletar o produto?</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>Ao deletar este produto, ele será removido da base de dados.</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button color='secondary' onClick={() => setOpenAlertModal(false)}>
						Não
					</Button>
					<Button color='error' onClick={handleDeleteProduct}>
						Sim
					</Button>
				</DialogActions>
			</Dialog>
		</ProductsRegContainer>
	);
}
