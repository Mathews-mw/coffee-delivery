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
	grid-template-columns: auto 28rem;
	grid-template-rows: auto 12.9rem;
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

export const CheckoutItem = styled.div`
	display: flex;
	justify-content: space-between;

	img {
		width: 64px;
		height: 64px;
	}

	p {
		margin-bottom: 0.2rem;
	}

	.buttonsContainer {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.incrementGroup {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4px;
		gap: 0.5rem;
		border-radius: 6px;

		background-color: ${(props) => props.theme['base-button']};
	}

	.incrementGroup:hover {
		filter: brightness(0.9);
	}

	.increment {
		background: none;
		outline: none;
		border: none;
		font-size: 1.5rem;
		color: ${(props) => props.theme.purple};
		cursor: pointer;
	}

	.increment:hover {
		color: ${(props) => props.theme['purple-dark']};
	}

	.buy {
		border: none;
		outline: none;
		border-radius: 6px;
		padding: 0.5rem;
		background-color: ${(props) => props.theme['purple-dark']};
		color: ${(props) => props.theme.white};
		cursor: pointer;
	}

	.buy:hover {
		background-color: ${(props) => props.theme.purple};
	}
`;
