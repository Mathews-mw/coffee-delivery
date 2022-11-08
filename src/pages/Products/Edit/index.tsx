import * as yup from 'yup';
import { v4 as uuidV4 } from 'uuid';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { api } from '../../../services/axios/api';
import { InputText } from '../../../components/InputText';
import { ShowErrorRequest } from '../../../utils/ShowErrorRequest';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Tag, FilePng } from 'phosphor-react';

import { ProductsRegContainer, ProductsRegCard, TagsSelect, ProductImageCard, HeaderGroup, HeaderTitle, Form } from './styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
	return {
		fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	};
}

const selectTags = ['Tradicional', 'Gelado', 'Com leite', 'Especial', 'Alcoólico'];

const ProductsSchema = yup.object({
	product_name: yup.string().notRequired(),
	tags: yup.mixed().notRequired(),
	price: yup.mixed().notRequired(),
	description: yup.string().notRequired(),
	product_img: yup
		.mixed()
		.notRequired()
		.test('fileVerifyMin', 'Campo obrigatório', (value) => value.length > 0)
		.test('fileVerifyMax', 'Quatidade máxima de arquivos permitidos 1', (value) => value.length < 2)
		.test('fileFormat', 'Formato não permitido', (value) => value[0] && ['png', 'jpeg', 'svg'].includes(value[0].name.split('.').slice(-1)[0]))
		.test('fileSize', 'Tamanho máximo permitido 20 MB', (value) => value[0] && value[0].size <= 5000000),
});

type InputForm = yup.InferType<typeof ProductsSchema>;

export function Edit() {
	const theme = useTheme();
	const { ID } = useParams();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [imageName, setImageName] = useState<any>();
	const [product, setProduct] = useState<IProductView>();
	const [imageDisplay, setImageDisplay] = useState<any>('');
	const [personName, setPersonName] = useState<string[]>([]);

	const { register, handleSubmit, watch, reset, setValue, control } = useForm<InputForm>({
		resolver: yupResolver(ProductsSchema),
	});

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value },
		} = event;
		setPersonName(typeof value === 'string' ? value.split(',') : value);
		setValue('tags', event.target.value);
	};

	const fetchProductData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get(`/products/${ID}`);
			const data = await response.data;

			const defaultTags = data.tags.map((tag) => {
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

	const fileUpload = watch('product_img');

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
			reset(product);
		}
	}, [ID, product]);

	async function handleEditProduct(data: InputForm) {
		console.log(data);

		const formData = new FormData();
		try {
			formData.append('image_name', fileUpload[0]);
			formData.append('product_name', data.product_name);
			formData.append('price', data.price.toString());
			formData.append('description', data.description);
			formData.append('uuid_ref_tag', product.uuid_ref_tag);
			formData.append('tags', data.tags);
			const response = await api.put(`/products/${ID}`, formData, { headers: { 'Content-Type': 'multipart/form-data;' } });

			toast('Produto cadastrado com sucesso', {
				autoClose: 4000,
				type: 'success',
				theme: 'colored',
				draggable: true,
			});

			setImageDisplay(null);
			setImageName(null);
			reset();
		} catch (error) {
			ShowErrorRequest(error);
		}
	}

	return (
		<ProductsRegContainer>
			{loading && <CircularProgress size={68} />}

			<HeaderTitle>
				<h1>Registro de produtos</h1>
			</HeaderTitle>

			<Form onSubmit={handleSubmit(handleEditProduct)}>
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

					<InputText mask='' type='text' label='Nome do produto' containerStyle={{ width: '50%' }} {...register('product_name')} />

					<TagsSelect>
						<Controller
							control={control}
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
												setValue('tags', event.target.value);
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

					<InputText mask='99,99' type='text' label='Preço' defaultValue={'00,00'} containerStyle={{ width: '50%' }} {...register('price')} />
					<TextField label='Descrição' id='Description' multiline autoFocus rows={4} variant='outlined' placeholder='Insira alguma descrição para o produto...' {...register('description')} />

					<div>
						<Button variant='contained' type='submit'>
							Atualizar produto
						</Button>
					</div>
				</ProductsRegCard>

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
					<div>
						<Button variant='contained' component='label'>
							Upload
							<input hidden accept='image/*' type='file' {...register('product_img')} />
						</Button>
					</div>
				</ProductImageCard>
			</Form>
		</ProductsRegContainer>
	);
}
