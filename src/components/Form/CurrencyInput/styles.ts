import styled from 'styled-components';
import InputMask from 'react-input-mask';

export const Container = styled.div`
	display: flex;

	box-sizing: border-box;
	padding: 0.4rem 0.45rem;
	flex-direction: column;
	border: 1px solid #c4c4c4;
	border-radius: 6px;
	max-height: 56px;
	height: 56px;

	transition: all 0.1s ease-in-out;

	&.getFocus {
		border: 2px solid #3178c6;
	}

	&.outOfFocus {
		border: 1px solid #c4c4c4;
	}

	label {
		color: var(--accent);
		font-size: 0.7rem;
		font-family: 'Roboto Mono', monospace;
		text-transform: uppercase;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	&.is-invalid {
		border: 1px solid #f0000080;
	}
`;

export const ContainerInput = styled.div`
	position: relative;
	display: flex;
	flex: 1 1 0%;

	.form-control {
		border: none;
		outline: none;
	}

	input {
		background-color: transparent;
	}
`;

export const TextInput = styled(InputMask)`
	border: none;
	outline: none;
	padding: 5px;
	margin-left: 0.5rem;
	margin-right: 0.5rem;
	line-height: 1.4;
	transition: all 0.5s;

	&:not(:placeholder-shown) {
		width: 100%;
		transition: all 0.5s;
	}
`;

export const ErrorText = styled.span`
	font-size: 11px;
	color: #f0000080;
	height: 10px;
	margin-bottom: 5px;
`;

export const RequiredText = styled.span`
	color: #f00;
	margin-left: 3px;
	cursor: pointer;
`;

export const ErrorSymbol = styled.span`
	width: 22px;
	height: 22px;
	margin-right: 2.5rem;
	color: ${(props) => props.theme['red-500']};
`;
