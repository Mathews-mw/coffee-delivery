import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  
  padding: 1.25rem 1.5rem;

  border-radius: 6px 36px 6px 36px;

  width: 16rem;
  height: 20rem;

  background-color: ${props => props.theme["base-card"]};

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

  h3 {
    font-weight: 700;
    font-size: 20px;
    line-height: 130%;
    color: ${props => props.theme["base-subtitle"]} ;
  }

  p {
    font-size: 14px;
    text-align: center;
    color: ${props => props.theme["base-label"]};
  }
`;

export const ValuesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

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

    background-color: ${props => props.theme["base-button"]};
  }

  .incrementGroup:hover {
    filter: brightness(0.9);
  }

  .increment {
    background: none;
    outline: none;
    border: none;
    font-size: 1.5rem;
    color: ${props => props.theme.purple};
    cursor: pointer;
  }

  .increment:hover {
    color: ${props => props.theme["purple-dark"]};
  }

  .buy {
    border: none;
    outline: none;
    border-radius: 6px;
    padding: 0.5rem;
    background-color: ${props => props.theme["purple-dark"]};
    color: ${props => props.theme.white};
    cursor: pointer;
  }

  .buy:hover {
    background-color: ${props => props.theme.purple};
  }
`;
