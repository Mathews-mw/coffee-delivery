import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  //padding: 2rem 10rem;

  .actions {
    display: flex;
    gap: 1rem
  }
`;

export const Location = styled.span`
  display: flex;
  align-items: center;
  padding: 0.5rem;

  border-radius: 6px;
  
  background-color: ${props => props.theme["purple-light"]};
  color: ${props => props.theme.purple};

  gap: 0.5rem
`;

export const Cart = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem;

  border: none;
  border-radius: 6px;
  
  background-color: ${props => props.theme["yellow-light"]};
  color: ${props => props.theme["yellow-dark"]};

  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.yellow};
    transition: all 0.2s;
  }
`;

export const Home = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem;

  border: none;
  border-radius: 6px;
  
  background-color: ${props => props.theme["yellow-light"]};
  color: ${props => props.theme["yellow-dark"]};

  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.yellow};
    transition: all 0.2s;
  }
`;