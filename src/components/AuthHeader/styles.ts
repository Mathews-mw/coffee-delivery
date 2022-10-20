import styled from 'styled-components';

export const HeaderContainer = styled.header`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

export const Divider = styled.span`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	&::before {
		content: '';
		width: 35rem;
		margin-top: 2rem;
		border-bottom: 2px solid ${(props) => props.theme['purple-light']};
	}
`;
