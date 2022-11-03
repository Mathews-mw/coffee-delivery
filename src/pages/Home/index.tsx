import { ShoppingCart, Timer, Package, Coffee } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import coverImage from '../../assets/Imagem.svg';
import { CoffeCard } from '../../components/CoffeCard';
import { api } from '../../services/axios/api';
import { CoffeList, HeadContainer, HomeContainer, Icon, Main } from './styles';

export function Home() {
	const [products, setProducts] = useState<IProduct[]>();
	const [tags, setTags] = useState<ITag[]>();

	const fetchProducts = useCallback(async () => {
		const response = await api.get('/products');
		const tagsResponse = await api.get('/products/tags');

		setProducts(response.data);
		setTags(tagsResponse.data);
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return (
		<HomeContainer>
			<HeadContainer>
				<div className='infosCover'>
					<div className='textTitle'>
						<h1>Encontre o café perfeito para qualquer hora do dia</h1>
						<h3>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</h3>
					</div>
					<div className='iconsContainer'>
						<div className='iconsSubContainer'>
							<div className='iconGroup' style={{ marginBottom: 20 }}>
								<Icon backgroundColor='yellowDark'>
									<ShoppingCart weight='fill' />
								</Icon>
								<p>Compra simples e segura</p>
							</div>
							<div className='iconGroup'>
								<Icon backgroundColor='yellow'>
									<Timer weight='fill' />
								</Icon>
								<p>Entrega rápida e rastreada</p>
							</div>
						</div>
						<div className='iconsSubContainer'>
							<div className='iconGroup' style={{ marginBottom: 20 }}>
								<Icon backgroundColor='gray'>
									<Package weight='fill' />
								</Icon>
								<p>Embalagem matém o café intacto</p>
							</div>
							<div className='iconGroup'>
								<Icon backgroundColor='purple'>
									<Coffee weight='fill' />
								</Icon>
								<p>O café chega fresquinho até você</p>
							</div>
						</div>
					</div>
				</div>

				<img src={coverImage} alt='Imagem lustrativa do Coffe Delivery' />
			</HeadContainer>

			<Main>
				<h1>Nossos cafés</h1>

				<CoffeList>
					{products?.map((product) => {
						return (
							<CoffeCard
								key={product.id}
								id={product.id}
								product_name={product.product_name}
								price={product.price}
								description={product.description}
								image_name={product.image_name}
								tags={tags && tags.filter((tag) => tag.uuid_ref_product === product.uuid_ref_tag)}
							/>
						);
					})}
				</CoffeList>
			</Main>
		</HomeContainer>
	);
}
