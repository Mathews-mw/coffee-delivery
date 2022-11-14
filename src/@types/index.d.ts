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

interface IProductView {
	id: number;
	product_name: string;
	price: number;
	description: string;
	image_name: string;
	tags: string[];
	uuid_ref_tag: string;
	created_at: Date;
	updated_at?: Date;
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

interface IOrderView {
	id: number;
	user_id: number;
	cep: string;
	rua: string;
	numero: string;
	complemento: string;
	bairro: string;
	cidade: string;
	uf: string;
	payment: string;
	total_order: number;
	created_at: Date;
}
