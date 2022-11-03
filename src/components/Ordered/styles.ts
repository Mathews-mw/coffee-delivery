import styled from 'styled-components';
import { styled as styledMUI } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

export const Container = styled.div``;

export const CheckoutItem = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;

	img {
		width: 64px !important;
		height: 64px;
	}

	p {
		margin-bottom: 0.2rem;
	}

	.uperRow {
		display: flex;
		justify-content: space-between;
	}
`;

export const ColorButton = styledMUI(Button)`
	min-width: 25px;
	width: 40px;
	margin: 0;
	padding; 0
`;

export const NumberCount = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme['base-button']};
	box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
	padding: 2px 16px;
	border-radius: 4px;
`;
