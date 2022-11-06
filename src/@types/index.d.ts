declare module '*html';

interface IProduct {
	id: number;
	product_name: string;
	price: number;
	description: string;
	image_name: string;
	created_at: Date;
	updated_at: Date;
	uuid_ref_tag: string;
}

interface ITag {
	id: number;
	tag: string;
	created_at: Date;
	uuid_ref_product: string;
}

interface ICEPRequest {
	bairro: string;
	cep: string;
	complemento: string;
	ddd: string;
	gia: string;
	ibge: string;
	localidade: string;
	logradouro: string;
	siafi: string;
	uf: string;
}
