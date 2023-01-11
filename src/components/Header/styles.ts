import styled from 'styled-components';

export const HeaderContainer = styled.header`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;

	nav {
		a {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		a:link {
			text-decoration: none;
		}

		a:visited {
			text-decoration: none;
		}

		a:hover {
			text-decoration: underline;
		}

		a:active {
			text-decoration: underline;
		}
	}
`;

export const Location = styled.span`
	display: flex;
	align-items: center;
	padding: 0.5rem;

	border-radius: 6px;

	background-color: ${(props) => props.theme['purple-light']};
	color: ${(props) => props.theme.purple};

	gap: 0.5rem;
`;

export const Cart = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.625rem;

	border: none;
	border-radius: 6px;

	background-color: ${(props) => props.theme['yellow-light']};
	color: ${(props) => props.theme['yellow-dark']};

	&:hover {
		background-color: ${(props) => props.theme.yellow};
		transition: all 0.2s;
	}
`;

export const Home = styled.button`
	display: flex;
	align-items: center;
	padding: 0.5rem;

	border: none;
	border-radius: 6px;

	background-color: ${(props) => props.theme['yellow-light']};
	color: ${(props) => props.theme['yellow-dark']};

	cursor: pointer;

	&:hover {
		background-color: ${(props) => props.theme.yellow};
		transition: all 0.2s;
	}
`;

export const Frame = styled.span`
	border-radius: 6px;
`;
