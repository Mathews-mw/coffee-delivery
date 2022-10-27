import styled from 'styled-components';

export const ControlContainer = styled.div``;

export const HeaderTitle = styled.header`
	margin: 2.5rem 0 1rem;

	h1 {
		font-size: 2rem;
	}
`;

export const ContentContainer = styled.div`
	flex: 1;
	overflow: auto;
	margin-top: 2rem;

	table {
		width: 100%;
		border-collapse: collapse;
		min-width: 600px;
	}

	th {
		background-color: ${(props) => props.theme.yellow};
		padding: 1rem;
		text-align: left;
		color: ${(props) => props.theme['base-title']};
		font-size: 0.75rem;
		line-height: 1.6;

		&:first-child {
			border-top-left-radius: 8px;
			padding-left: 1.5rem;
		}

		&:last-child {
			border-top-right-radius: 8px;
			padding-right: 1.5rem;
		}
	}

	td {
		background-color: ${(props) => props.theme['yellow-light']};
		border-top: 4px solid ${(props) => props.theme['base-background']};
		padding: 1rem;
		font-size: 0.875rem;
		line-height: 1.6;

		&:first-child {
			padding-left: 1.5rem;
		}

		&:last-child {
			padding-right: 1.5rem;
		}

		img {
			width: 4rem;
		}
	}
`;
