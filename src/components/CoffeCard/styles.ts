import styled from 'styled-components';
import { styled as styledMUI } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

export const Card = styled.div`
	display: flex;
	flex-direction: column;

	align-items: center;

	padding: 1.25rem 1.5rem;

	border-radius: 6px 36px 6px 36px;

	max-width: 16rem;
	max-height: 20rem;

	object-fit: contain;

	background-color: ${(props) => props.theme['base-card']};
	box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

	.coffeImg {
		width: 7.5rem;
		height: 7.5rem;

		position: relative;
		top: -3rem;
	}

	.group {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.tagGroups {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.2rem;
	}
`;

export const InfosContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;

	position: relative;
	top: -2rem;

	h3 {
		font-weight: 700;
		font-size: 20px;
		line-height: 130%;
		color: ${(props) => props.theme['base-subtitle']};
	}

	p {
		font-size: 14px;
		text-align: center;
		color: ${(props) => props.theme['base-label']};
	}
`;

export const ValuesContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	position: relative;
	top: -1rem;
	left: 1rem;

	strong {
		font-size: 1.5rem;
		font-weight: 800;
		font-family: 'Baloo 2', sans-serif;
	}

	small {
		font-size: 0.875rem;
	}

	.incrementGroup {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
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
