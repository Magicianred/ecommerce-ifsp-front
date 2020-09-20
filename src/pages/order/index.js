import React, { useState, useEffect } from 'react'
import { Logo, Footer, Button } from '../../components/index'
import {
  Nav,
  Container,
  FlexRow,
  DivFlex,
  Img,
  FigCaption,
  DivRow,
  TitlePrice,
  DivButtons,
  TitleDetails,
  Strongest,
  RemoveButton,
  Link,
  StyledLabel,
  Input,
} from './styles'
import { handleImage } from '../main/handleImage'
import api from '../../services/api'

const Order = () => {
  const [cart, setCart] = useState([])
  const [totalOrder, setTotalOrder] = useState(0)
  const [paymentDescription, setPaymentDescription] = useState([])

  // let localCart = localStorage.getItem('cart')
  const loadPaymentForm = async () => {
    const { data } = await api.get('/paymentForm')
    setPaymentDescription(data)
  }

  const loadCart = () => {
    setCart(JSON.parse(localStorage.getItem('cart')))
  }

  const loadTotal = () => {
    let localCart = JSON.parse(localStorage.getItem('cart'))
    console.log(localCart)
    let total = localCart.reduce(function (acc, { total }) {
      return (acc += parseFloat(total))
    }, 0)
    setTotalOrder(total.toFixed(2))
  }

  // const orderItems = JSON.parse(localStorage.getItem('cart'))

  useEffect(() => {
    loadCart()
    loadTotal()
    loadPaymentForm()
  }, [])

  const handleOrder = ({
    idProduct,
    category,
    color,
    cubaType,
    description,
    finishingProcess,
    imageLink,
    qtdd,
    stock,
    total,
    unitaryValue,
  }) => {
    const handleRemove = () => {
      console.log(idProduct)
      let cartCopy = [...cart]

      cartCopy = cartCopy.filter((item) => item.idProduct !== idProduct)

      setCart(cartCopy)

      let cartString = JSON.stringify(cartCopy)
      localStorage.setItem('cart', cartString)
      window.location.href = '/order'
    }

    const handleChange = (e) => {
      const {
        target: { value },
      } = e

      let cartCopy = [...cart]

      let existentItem = cartCopy.find((item) => item.idProduct === idProduct)

      let change = parseFloat(unitaryValue * value).toFixed(2)

      existentItem.total = change
      existentItem.qtdd = value

      if (existentItem.qtdd <= 0) {
        //remove item  by filtering it from cart array
        cartCopy = cartCopy.filter((item) => item.idProduct !== idProduct)
      }

      setCart(cartCopy)

      let cartString = JSON.stringify(cartCopy)
      localStorage.setItem('cart', cartString)

      let total = cartCopy.reduce(function (acc, { total }) {
        return (acc += parseFloat(total))
      }, 0)
      console.log(total)
      setTotalOrder(total.toFixed(2))

      // console.log(change)
    }

    return (
      <FlexRow key={`idProduct-${idProduct}`}>
        <DivFlex className="flexOne">
          <Img src={handleImage(imageLink)}></Img>
          <FigCaption>{color}</FigCaption>
          <DivRow>
            <DivRow>
              <StyledLabel htmlFor="qtdd">
                Quantidade
                <Input
                  type="number"
                  name="qtdd"
                  defaultValue={qtdd}
                  onChange={handleChange}
                />
              </StyledLabel>
            </DivRow>
            <TitlePrice>
              Total R$:
              {total}
            </TitlePrice>
          </DivRow>
          <DivButtons>
            <Link href="/">
              <Button>Voltar as compras</Button>
            </Link>
            <RemoveButton onClick={handleRemove}>
              <span role="img" aria-label="sheep">
                &#128465;
              </span>
            </RemoveButton>
          </DivButtons>
        </DivFlex>
        <DivFlex className="flexTwo">
          <TitleDetails>
            <Strongest>Categoria: </Strongest>
            {category}
          </TitleDetails>
          <TitleDetails>
            <Strongest>Quantidade em estoque: </Strongest>
            {stock}
          </TitleDetails>
          <TitleDetails>
            <Strongest>Acabamento: </Strongest>
            {finishingProcess}
          </TitleDetails>
          <TitleDetails>
            <Strongest>Tipo da cuba: </Strongest>
            {cubaType}
          </TitleDetails>
          <TitleDetails>
            <Strongest>Comprimento </Strongest>x<Strongest> Largura </Strongest>{' '}
            x<Strongest> Altura: </Strongest>
            {description}
          </TitleDetails>
        </DivFlex>
      </FlexRow>
    )
  }
  //list the forms of payment
  const handlePayment = ({ paymentForm, idPaymentForm }) => {
    return (
      <option key={idPaymentForm} value={paymentForm}>
        {paymentForm}
      </option>
    )
  }
  return (
    <>
      <Nav>
        <Logo />
      </Nav>
      <FlexRow>
        <DivFlex className="flexOne">
          <DivRow>
            <DivRow>
              <TitlePrice>
                Total da ordem R$:
                {totalOrder}
              </TitlePrice>
            </DivRow>
            <DivRow>
              <select>
                <option value="-">Formas de Pagamento</option>
                {paymentDescription.map(handlePayment)}
              </select>
            </DivRow>
          </DivRow>
        </DivFlex>
        <DivFlex className="flexTwo">
          <DivRow>
            <DivButtons>
              <Link href="/">
                <Button>Voltar as compras</Button>
              </Link>
              <Button add>Finalizar a compra</Button>
            </DivButtons>
          </DivRow>
        </DivFlex>
      </FlexRow>
      <Container>
        {localStorage.getItem('cart') ? (
          cart.map(handleOrder)
        ) : (
          <h1>Não existem itens no carrinho</h1>
        )}
      </Container>
      <Footer />
    </>
  )
}

export default Order
