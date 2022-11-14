import styled from 'styled-components';

export const ProductsRegContainer = styled.main``;

export const HeaderTitle = styled.header`
	margin: 2.5rem 0 1rem;

	h1 {
		font-size: 2rem;
	}
`;

export const MainContent = styled.div`
	display: grid;
	grid-template-areas: 'MAIN ASIDE';
	grid-template-columns: 1fr 20rem;
	gap: 2rem;
`;

export const Form = styled.form``;

export const ProductsRegCard = styled.main`
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	gap: 2rem;
	padding: 2.5rem;
	background-color: ${(props) => props.theme['base-card']};

	.cepGroup {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		width: 33%;
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

	.buttonsGroup {
		display: flex;
		justify-content: space-between;
	}
`;

export const HeaderGroup = styled.div`
	display: flex;
	gap: 0.5rem;
	width: 100%;
	line-height: 1.5;
	svg {
		color: ${(props) => props.theme['yellow-dark']};
	}
`;

export const TagsSelect = styled.div``;

export const ProductsCard = styled.aside`
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	gap: 2rem;
	padding: 2.5rem;
	background-color: ${(props) => props.theme['base-card']};
`;

export const ButtonSearchCEP = styled.button`
	border: none;
	border-radius: 8px;
	background-color: ${(props) => props.theme['base-button']};
	padding: 0.5rem;
	height: 3.3rem;
	color: ${(props) => props.theme.purple};
	cursor: pointer;
	font-weight: 700;
	box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);

	&:hover {
		filter: brightness(0.8);
		transition: all 0.2s;
	}
`;
export const OrderButton = styled.button`
	border: none;
	border-radius: 6px;
	padding: 0.75rem 7.3rem;

	font-weight: 700;
	color: ${(props) => props.theme.white};
	background-color: ${(props) => props.theme.yellow};

	cursor: pointer;
	box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`;

export const ProductImageCard = styled.div`
	display: flex;
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
`;
