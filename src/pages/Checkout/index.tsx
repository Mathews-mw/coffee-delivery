import { MapPinLine } from 'phosphor-react';
import { InputText } from '../../components/InputText';
import { CheckoutContainer, DeliveryCard, PaymentCard, ProductsCard } from "./styles";

export function Checkout() {
  return (
    <CheckoutContainer>
      <h1>Complete se pedido</h1>
      <form action="">
        <DeliveryCard>
          <div className='headerGroup'>
            <span> <MapPinLine size={22} /> </span>
            <div>
              <h4>Endereço de entrega</h4>
              <p>Informe o endereço onde deseja receber seu pedido</p>
            </div>
          </div>

          <div className='cepGroup'>
            <InputText mask='' type='number' label='CEP' style={{ width: '80px' }} />
            <button> Pesquisar </button>
          </div>

          <InputText mask='' type='text' label='Rua' />
          <InputText mask='' type='number' label='Numero' />
          <InputText mask='' type='text' label='Complemento' placeholder='Opcional' />
          <InputText mask='' type='text' label='Bairro' />
          <InputText mask='' type='text' label='Cidade' />
          <InputText mask='' type='text' label='UF' />
        </DeliveryCard>

        <PaymentCard>

        </PaymentCard>

        <ProductsCard>

        </ProductsCard>
      </form>
    </CheckoutContainer>
  )
}