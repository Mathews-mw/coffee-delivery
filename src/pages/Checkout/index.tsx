import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import { MapPinLine, CurrencyDollar, CreditCard, Bank, Money } from 'phosphor-react';
import { InputText } from '../../components/InputText';
import { ButtonSearchCEP, CheckoutContainer, DeliveryCard, PaymentCard, ProductsCard, OrderButton } from "./styles";

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
            <InputText mask='' type='number' label='CEP' />
            <ButtonSearchCEP onClick={(e) => { e.preventDefault() }}> Pesquisar </ButtonSearchCEP>
          </div>
          <InputText mask='' type='text' label='Rua' />
          <div className='streetGroup' >
            <InputText mask='' type='number' label='Numero' containerStyle={{ width: '20%' }} />
            <InputText mask='' type='text' label='Complemento' placeholder='Opcional' containerStyle={{ flex: 3.5 }} />
          </div>
          <div className='cityGroup'>
            <InputText mask='' type='text' label='Bairro' containerStyle={{ flex: 2 }} />
            <InputText mask='' type='text' label='Cidade' containerStyle={{ flex: 5.5 }} />
            <InputText mask='' type='text' label='UF' />
          </div>

        </DeliveryCard>

        <PaymentCard>
          <div className='headerGroup'>
            <span> <CurrencyDollar size={22} /> </span>
            <div>
              <h4>Pagamento</h4>
              <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
            </div>
          </div>

          <div className='paymentType'>
            <Button variant="contained" startIcon={<CreditCard size={22} />} color="inherit" sx={{ width: "15rem", height: "5rem" }}>
              CARTÃO DE CRÉDITO
            </Button>

            <Button variant="contained" startIcon={<Bank size={22} />} color="inherit" sx={{ width: "15rem", height: "5rem" }}>
              CARTÃO DE DÉBITO
            </Button>

            <Button variant="contained" startIcon={<Money size={22} />} color="inherit" sx={{ width: "15rem", height: "5rem" }}>
              DINHEIRO
            </Button>

          </div>
        </PaymentCard>

        <ProductsCard>
          <div>
            <div>
              <p>Total de itens</p>
              <span>R$ 29,70</span>
            </div>
            <div>
              <p>Entrega</p>
              <span>R$ 3,50</span>
            </div>
            <div>
              <h4>Total</h4>
              <h3>R$ 33,20</h3>
            </div>
          </div>

          <OrderButton>
            CONFIRMAR PEDIDO
          </OrderButton>

        </ProductsCard>
      </form>
    </CheckoutContainer>
  )
}