import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

interface IWish {
	id: number;
	product_name: string;
	price: number;
	amount: number;
	image_name: string;
	imageUrl: string;
}

interface OrderContextType {
	wishList: IWish[];
	setWishList: Dispatch<SetStateAction<IWish[]>>;
	confirmedOrder: IOrderView;
	removeWishFromList: (id: number) => void;
	incrementAmount: (id: number, increment: number) => void;
	addNewOrder: (id: number, product_name: string, price: number, amount: number, image_name: string, imageUrl: string) => void;
	handleConfirmedOrder: (data: IOrderView) => void;
}

export const OrderContext = createContext({} as OrderContextType);

export function OrderContextProvider({ children }: { children: React.ReactNode }) {
	const [wishList, setWishList] = useState<IWish[]>([]);
	const [confirmedOrder, setConfirmedOrder] = useState<IOrderView>();

	function handleConfirmedOrder(data: IOrderView) {
		setConfirmedOrder(data);
	}

	function addNewOrder(id: number, product_name: string, price: number, amount: number, image_name: string, imageUrl: string) {
		const wish = {
			id,
			product_name,
			price,
			amount,
			image_name,
			imageUrl,
		};

		setWishList((state) => [{ id, product_name, price, amount, image_name, imageUrl }, ...state]);
	}

	function removeWishFromList(id: number) {
		const wishToRemove = wishList.find((wish) => wish.id === id);
		const wishListWithoutDeletedOne = wishList.filter((wish) => wish !== wishToRemove);

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

	return <OrderContext.Provider value={{ wishList, confirmedOrder, setWishList, addNewOrder, removeWishFromList, handleConfirmedOrder, incrementAmount }}>{children}</OrderContext.Provider>;
}
