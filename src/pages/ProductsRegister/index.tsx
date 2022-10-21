import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputText } from '../../components/InputText';

import { Tag, FilePng, Image } from 'phosphor-react';

import { Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

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

const names = ['Tradicional', 'Gelado', 'Com leite', 'Especial', 'Alcoólico'];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
	return {
		fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	};
}

const ProductsSchema = yup.object({
	product_name: yup.string().required('Campo obrigatório'),
	tags: yup.array().notRequired(),
	price: yup.number().required('Campo obrigatório'),
	description: yup.string().required('Campo obrigatório'),
	product_img: yup.string().required('Campo obrigatório'),
});

type InputForm = yup.InferType<typeof ProductsSchema>;

export function ProductsRegister() {
	const theme = useTheme();
	const [personName, setPersonName] = useState<string[]>([]);
	const [imageDisplay, setImageDisplay] = useState<any>('');
	const [imageName, setImageName] = useState<any>();
	console.log(imageName);

	const { register, handleSubmit, watch } = useForm<InputForm>({
		resolver: yupResolver(ProductsSchema),
	});

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value },
		} = event;
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

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

	function handleCreateNewProduct(data: any) {}

	return (
		<ProductsRegContainer>
			<HeaderTitle>
				<h1>Registro de produtos</h1>
			</HeaderTitle>

			<Form onSubmit={handleSubmit(handleCreateNewProduct)}>
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
						<FormControl sx={{ m: 1, width: 300 }}>
							<InputLabel id='demo-multiple-chip-label'>Tags</InputLabel>
							<Select
								labelId='demo-multiple-chip-label'
								id='demo-multiple-chip'
								multiple
								{...register('tags')}
								value={personName}
								onChange={handleChange}
								input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
								renderValue={(selected) => (
									<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
										{selected.map((value) => (
											<Chip key={value} label={value} />
										))}
									</Box>
								)}
								MenuProps={MenuProps}
							>
								{names.map((name) => (
									<MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
										{name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</TagsSelect>

					<InputText mask='' type='text' label='Preço' containerStyle={{ width: '50%' }} {...register('price')} />
					<TextField label='Descrição' id='Description' multiline rows={4} variant='outlined' placeholder='Insira alguma descrição para o produto...' {...register('description')} />

					<div>
						<Button variant='contained' type='submit'>
							Cadastrar produto
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
						{imageDisplay ? (
							<img src={imageDisplay} alt='' />
						) : (
							<span>
								<Image size={160} />
							</span>
						)}

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
