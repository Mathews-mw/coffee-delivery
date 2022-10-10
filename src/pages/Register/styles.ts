import styled from "styled-components";

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
  background-color: ${props => props.theme["base-card"]};

  .headerGroup {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    line-height: 1.5;
    margin-bottom: 2rem;
  };

  button[type='submit'] {
    border: none;
    border-radius: 6px;
    padding: 0.75rem 2.5rem;

    font-weight: 700;
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.yellow};

    cursor: pointer;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);

    &:hover {
      background-color: ${props => props.theme["yellow-dark"]};
      transition: all 0.2s;
    }
  }
`;