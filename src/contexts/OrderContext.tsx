import React, { createContext, useState } from 'react';

interface IWish {
	id: number;
	product_name: string;
	price: number;
	amount: number;
	image_name: string;
}

interface OrderContextType {
	wishList: IWish[];
	addNewOrder: (id: number, product_name: string, price: number, amount: number, image_name: string) => void;
	removeWishFromList: (id: number) => void;
	incrementAmount: (id: number, increment: number) => void;
}

export const OrderContext = createContext({} as OrderContextType);

export function OrderContextProvider({ children }: { children: React.ReactNode }) {
	const [wishList, setWishList] = useState<IWish[]>([]);

	function addNewOrder(id: number, product_name: string, price: number, amount: number, image_name: string) {
		const wish = {
			id,
			product_name,
			price,
			amount,
			image_name,
		};

		setWishList((state) => [{ id, product_name, price, amount, image_name }, ...state]);
	}

	function removeWishFromList(id: number) {
		const wishToRemove = wishList.find((wish) => wish.id === id);
		const wishListWithoutDeletedOne = wishList.filter((wish) => wish !== wishToRemove);

		console.log('pedido a ser deletado: ', wishToRemove);
		console.log('nova lista: ', wishListWithoutDeletedOne);

		setWishList(wishListWithoutDeletedOne);
	}

	function incrementAmount(id: number, increment: number) {
		const wish = wishList.find((wish) => wish.id === id);
		wish.amount += increment;

		console.log(wishList);
		console.log('this specific wish: ', wish);
	}

	return <OrderContext.Provider value={{ wishList, addNewOrder, removeWishFromList, incrementAmount }}>{children}</OrderContext.Provider>;
}
