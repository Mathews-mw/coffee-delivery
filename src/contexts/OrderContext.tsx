import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

interface IWish {
	id: number;
	product_name: string;
	price: number;
	amount: number;
	image_name: string;
}

interface OrderContextType {
	wishList: IWish[];
	setWishList: Dispatch<SetStateAction<IWish[]>>;
	removeWishFromList: (id: number) => void;
	incrementAmount: (id: number, increment: number) => void;
	addNewOrder: (id: number, product_name: string, price: number, amount: number, image_name: string) => void;
}

export const OrderContext = createContext({} as OrderContextType);

export function OrderContextProvider({ children }: { children: React.ReactNode }) {
	const [wishList, setWishList] = useState<IWish[]>([]);

	console.log('wishList: ', wishList);

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
		setWishList((state) =>
			state.map((wish) => {
				if (wish.id === id) {
					wish.amount += increment;
				}
				return wish;
			})
		);
	}

	return <OrderContext.Provider value={{ wishList, setWishList, addNewOrder, removeWishFromList, incrementAmount }}>{children}</OrderContext.Provider>;
}
