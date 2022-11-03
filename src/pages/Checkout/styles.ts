import styled from 'styled-components';

export const CheckoutContainer = styled.div``;

export const HeaderTitle = styled.header`
	display: flex;
	margin: 2.5rem 0 1rem;

	h1 {
		font-size: 1.125rem;
	}
`;

export const Form = styled.form`
	display: grid;
	grid-template-areas:
		'MAIN ASIDE'
		'FOOTER ASIDE';
	grid-template-columns: 1fr 28rem;
	grid-template-rows: 1fr 12.9rem;
	gap: 2rem;
`;

export const DeliveryCard = styled.main`
	display: flex;
	grid-area: MAIN;
	flex-direction: column;
	border-radius: 8px;
	gap: 2rem;
	padding: 2.5rem;
	background-color: ${(props) => props.theme['base-card']};

	.cepGroup {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		width: 40%;
	}

	.streetGroup {
		display: flex;
		gap: 1rem;
	}

	.cityGroup {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
`;

const SVG_COLORS = {
	yellowDark: 'yellow-dark',
	purple: 'purple',
} as const;

interface svgProps {
	color: keyof typeof SVG_COLORS;
}

export const HeaderGroup = styled.div<svgProps>`
	display: flex;
	gap: 0.5rem;
	width: 100%;
	line-height: 1.5;
	svg {
		color: ${(props) => props.theme[SVG_COLORS[props.color]]};
	}
`;

export const PaymentCard = styled.div`
	display: flex;
	grid-area: FOOTER;
	flex-direction: column;
	width: 100%;
	border-radius: 8px;
	gap: 2rem;
	padding: 2.5rem;
	background-color: ${(props) => props.theme['base-card']};

	.paymentType {
		display: flex;
		justify-content: space-between;
		gap: 0.75rem;
	}
`;

export const ProductsCard = styled.div`
	display: flex;
	grid-area: ASIDE;
	flex-direction: column;
	height: fit-content;
	border-radius: 6px 44px 6px 44px;
	gap: 2rem;
	padding: 2.5rem;
	background-color: ${(props) => props.theme['base-card']};

	.imgGroup {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	img {
		width: 10rem;
	}

	.resultsInfos {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
`;

export const OrderList = styled.div`
	direction: ltr;
	padding: 0 1rem;
	max-height: calc(100vh - 29rem);
`;

export const Scroll = styled.div`
	direction: rtl;
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 4px;
	}

	::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 100rem;
	}

	::-webkit-scrollbar-thumb {
		background: ${(props) => props.theme['purple-light']};
		border-radius: 100rem;
		cursor: pointer;
	}
`;
