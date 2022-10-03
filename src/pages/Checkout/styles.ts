import styled from "styled-components";

export const CheckoutContainer = styled.div`
 
`;

export const DeliveryCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  gap: 2rem;
  padding: 2.5rem;
  background-color: ${props => props.theme["base-card"]};
  
  .headerGroup {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    line-height: 1.5;

    svg {
      color: ${props => props.theme["yellow-dark"]};
    }
  }

  .cepGroup {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 33%;
  }

  .streetGroup {
    display: flex;
    gap: 1rem;
  }

  .cityGroup {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export const PaymentCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  gap: 2rem;
  padding: 2.5rem;
  background-color: ${props => props.theme["base-card"]};

  .headerGroup {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    line-height: 1.5;

    svg {
      color: ${props => props.theme.purple};
    }
  }

  .paymentType {
    display: flex;
    width: 100%;
    gap: 1rem;

    justify-content: space-evenly;
    align-items: center;

    svg {
      color: ${props => props.theme.purple};
    }
  }
`;

export const ProductsCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  gap: 2rem;
  padding: 2.5rem;
  background-color: ${props => props.theme["base-card"]};
`;

export const ButtonSearchCEP = styled.button`
  border: none;
  border-radius: 8px;
  background-color: ${props => props.theme["base-button"]};
  padding: 0.5rem;
  height: 3.3rem;
  color: ${props => props.theme.purple};
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);

  &:hover {
    filter: brightness(0.8);
    transition: all 0.2s;
  }
`
export const OrderButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 0.75rem 7.3rem;
  
  font-weight: 700;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.yellow};

  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`