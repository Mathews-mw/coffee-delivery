import styled from 'styled-components';
import InputMask from 'react-input-mask';

export const Container = styled.div`
  display: flex;
  padding: 0.4rem 0.6rem;
  flex-direction: column;
  flex: 1;
  margin-bottom: 10px;
  background: ${props => props.theme.white};
  //border: 1px solid black;
  box-shadow: 0 0 1px 1px ${props => props.theme['base-label']};
  border-radius: 6px;

  &.getFocus {
    box-shadow: 0 0 1px 1px ${props => props.theme.yellow}80;
    border: none;
  }

  label {
    color: ${props => props.theme['base-label']};
    font-size: 0.7rem;
    font-family: 'Roboto Mono', monospace;
    text-transform: uppercase;
  }
`;

export const ContainerInput = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 0%;

  input[type='number'] {
    -moz-appearance:textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const TextInput = styled(InputMask)`
  background-color: transparent;
  outline: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid transparent;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  line-height: 1.4;
  width: 20%;
  transition: all 0.5s;

  &.is-invalid {
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid ${props => props.theme["red-500"]};
  }

  &:focus {
    border-bottom: 1px solid ${props => props.theme['base-label']};
    width: 100%;
    transition: all 0.5s;
    box-shadow: none;
  }

  &:not(:placeholder-shown) {
    width: 100%;
    transition: all 0.5s;
  }
`;

export const ErrorText = styled.span`
  font-size: 11px;
  color: ${props => props.theme["red-500"]}cc;
  height: 10px;
  margin-top: 5px;

`;

export const ErrorSymbol = styled.span`
  width: 22px;
  height: 22px;
  margin-right: 2.5rem;
  color: ${props => props.theme["red-500"]}
`;

export const RequiredText = styled.span`
  color: ${props => props.theme["red-500"]};
  margin-left: 3px;
  cursor: pointer;

`;

export const ButtonEyeView = styled.button`
  position: absolute;
  display: flex;
  right: 16px;
  align-self: center;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
`;