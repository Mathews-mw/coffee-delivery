import { MapPinLine } from 'phosphor-react';
import { CheckoutContainer, DeliveryCard, PaymentCard, ProductsCard } from "./styles";

export function Checkout() {
  return (
    <CheckoutContainer>
      <h1>Complete se pedido</h1>
      <div>
        <DeliveryCard>
          <div>
            <span> <MapPinLine size={22} /> </span>
            <h4>Endereço de entrega</h4>
            <p>Informe o endereço onde deseja receber seu pedido</p>
          </div>

          <form action="">

          </form>
        </DeliveryCard>
        <PaymentCard>

        </PaymentCard>
      </div>
      <div>
        <ProductsCard>

        </ProductsCard>
      </div>
    </CheckoutContainer>
  )
}