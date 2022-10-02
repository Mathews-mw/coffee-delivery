import styled from "styled-components";

export const CheckoutContainer = styled.div`
 
`;

export const DeliveryCard = styled.div`
  display: flex;
  //flex-wrap: wrap;
  flex-direction: column;
  padding: 2.5rem;
  background-color: ${props => props.theme["base-card"]};

  .headerGroup {
    display: flex;
    gap: 0.5rem;
    width: 100%;
  }

  .cepGroup {
    display: flex;
    width: 100%;
  }
`;

export const PaymentCard = styled.div`

`;

export const ProductsCard = styled.div`

`;