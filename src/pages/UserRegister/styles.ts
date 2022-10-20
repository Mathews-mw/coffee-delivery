import styled from 'styled-components';
import { styled as styledMUI } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

export const RegisterContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 2rem;
`;

export const Form = styled.form``;

export const RegisterCard = styled.div`
	border-radius: 8px;
	width: 30rem;
	height: auto;
	gap: 2rem;
	padding: 2.5rem;
	background-color: ${(props) => props.theme['base-card']};

	.headerGroup {
		display: flex;
		gap: 0.5rem;
		width: 100%;
		line-height: 1.5;
		margin-bottom: 2rem;
	}

	.imgLink {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 1rem;
	}
`;

export const ButtonsGroup = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1rem;
`;

export const ColorButton = styledMUI(Button)`
`;
