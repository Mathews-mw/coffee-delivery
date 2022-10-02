import styled from "styled-components";

export const HomeContainer = styled.div`
`;

export const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5.75rem 0;

  .textTitle {

    padding-right: 1rem;

    h1 {
      font-size: 3rem;
      line-height: 1.3;
      color: ${props => props.theme["base-title"]};
      margin-bottom: 1rem;
    }
  
    h3 {
      margin-bottom: 4.25rem;
      font-weight: 400;
      font-size: 1.25rem;
      padding-right: 2rem;
    }
  }

  .iconsContainer {
    display: flex;
    width: 100%;
    gap: 1rem;
  }

  .iconsSubContainer {
    margin-bottom: 0.5rem;

  }

  .iconGroup {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
`;

const BACKGROUND_COLORS = {
  yellowDark: 'yellow-dark',
  yellow: 'yellow',
  gray: 'base-text',
  purple: 'purple'

} as const

interface IconProps {
  backgroundColor: keyof typeof BACKGROUND_COLORS
}

export const Icon = styled.span<IconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: ${props => props.theme[BACKGROUND_COLORS[props.backgroundColor]]};

  svg {
    color: ${props => props.theme.white}
  }
`;

export const Main = styled.main`
  padding: 2rem 0 0 0;
  h1 {
    margin-bottom: 2rem;
    font-weight: 800;
    font-size: 2rem;
  }
`;

export const CoffeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;