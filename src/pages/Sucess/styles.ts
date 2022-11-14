import styled from 'styled-components';

export const SucessContainer = styled.main``;

export const Header = styled.div`
	display: flex;
	flex-direction: column;
	margin: 5.75rem 0 2.5rem 0;

	h1 {
		font-size: 2rem;
		line-height: 1.3;
		color: ${(props) => props.theme['yellow-dark']};
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.25rem;
	}
`;

export const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

export const Card = styled.div`
	display: flex;
	grid-area: ASIDE;
	flex-direction: column;
	height: fit-content;
	max-width: 32.875rem;
	width: 100%;

	border-radius: 6px 44px 6px 44px;
	border: 1px solid #8047f8;
	border: double 1px transparent;
	background-image: linear-gradient(white, white), linear-gradient(90deg, #dbac2c, #8047f8);
	background-origin: border-box;
	background-clip: content-box, border-box;

	.container {
		display: flex;
		flex-direction: column;
		padding: 2.5rem;
		gap: 2rem;
	}

	.orderInfo {
		display: flex;
		align-items: center;

		gap: 0.75rem;
	}

	p {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
`;

export const ImageContainer = styled.div``;

const BACKGROUND_COLORS = {
	purple: 'purple',
	yellow: 'yellow',
	yellowDark: 'yellow-dark',
} as const;

interface IconProps {
	backgroundColor: keyof typeof BACKGROUND_COLORS;
}

export const Icon = styled.span<IconProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	width: 2rem;
	height: 2rem;
	border-radius: 999px;
	background: ${(props) => props.theme[BACKGROUND_COLORS[props.backgroundColor]]};

	svg {
		color: ${(props) => props.theme.white};
	}
`;
