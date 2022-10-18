import styled from 'styled-components';
import { styled as styledMUI } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

export const RegisterContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	max-width: 1440px;
	margin: 2rem auto 10rem;
	padding: 10rem 10rem;
`;

export const Form = styled.form``;

export const RegisterCard = styled.div`
	border-radius: 8px;
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
`;

export const ButtonsGroup = styled.div``;

/* export const ColorButton = styledMUI(Button)(
	({ theme }) => `
  color: ${theme.bg.main}
`
); */

export const ColorButton = styledMUI(Button)`
`;
