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
import querystring from 'querystring'

const Order = () => {
  const [cart, setCart] = useState([])
  const [totalOrder, setTotalOrder] = useState(0)
  const [paymentDescription, setPaymentDescription] = useState([])
  const [codPayment, setCodPayment] = useState(0)
  // const [lastId, setLastId] = useState()

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
    if (!localCart) window.location.href = '/'
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
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  }
  //list the forms of payment
  const handlePayment = ({ paymentForm, idPaymentForm }) => {
    return (
      <option key={idPaymentForm} value={idPaymentForm}>
        {paymentForm}
      </option>
    )
  }

  const registerMongo = async (form) => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    console.log(cart)
    let customer = JSON.parse(localStorage.getItem('Login'))
    let { date, paymentFormIdPaymentForm } = form //Date and paymentForm
    let paymentDescription = await api.get(
      `/paymentForm?idPaymentForm=${paymentFormIdPaymentForm}`
    )
    let { paymentForm } = paymentDescription.data[0]
    if (customer.idPessoaFisica) {
      //Here we can mount the json
      let {
        idPessoaFisica,
        nameCustomer,
        CPF,
        RG,
        dateBirth,
        email,
        street,
        number,
        district,
        city,
        state,
        zipCode,
        phone,
      } = customer

      let salePFisica = {
        idPessoaFisica,
        nameCustomer,
        CPF,
        RG,
        dateBirth,
        email,
        street,
        number,
        district,
        city,
        state,
        zipCode,
        phone,
        date,
        paymentForm,

        color: cart[0].color,
        finishingProcess: cart[0].finishingProcess,
        cubaType: cart[0].cubaType,
        description: cart[0].description,
        imageLink: cart[0].imageLink,
        unitaryValue: cart[0].unitaryValue,
        category: cart[0].category,

        amount: cart[0].qtdd,
      }
      if (cart[1]) {
        let cartIndexOne = {
          color1: cart[1].color,
          finishingProcess1: cart[1].finishingProcess,
          cubaType1: cart[1].cubaType,
          description1: cart[1].description,
          imageLink1: cart[1].imageLink,
          unitaryValue1: cart[1].unitaryValue,
          category1: cart[1].category,

          amount1: cart[1].qtdd,
        }
        salePFisica = { ...salePFisica, ...cartIndexOne }
      }
      if (cart[2]) {
        let cartIndexTwo = {
          color2: cart[2].color,
          finishingProcess2: cart[2].finishingProcess,
          cubaType2: cart[2].cubaType,
          description2: cart[2].description,
          imageLink2: cart[2].imageLink,
          unitaryValue2: cart[2].unitaryValue,
          category2: cart[2].category,

          amount2: cart[2].qtdd,
        }
        salePFisica = { ...salePFisica, ...cartIndexTwo }
      }
      const config = {
        headers: {
          'Content-Type': '	application/json;charset=UTF-8',
        },
      }

      // console.log(salePFisica)
      //The cors isn't work
      //##-----##//
      // let response = await api.post(
      //   '/salePFisica',
      //   JSON.stringify(salePFisica),
      //   config
      // )
      // console.log(response) //Show the paymentForm
      //##-----##//

      alert(
        '***Muito obrigado pela preferência, seu pedido chegará dentro de 10 dias úteis***\n'
      )
      localStorage.removeItem('cart')
      window.location.href = '/'
    }
  }

  const registerItem = async (idProduct, qtdd, last_id, local, form, index) => {
    const formItem = {
      amount: parseInt(qtdd),
      productIdProduct: idProduct,
      orderIdOrder: last_id,
    }
    let response = await api.post(
      '/orderItem',
      querystring.stringify(formItem),
      config
    )

    //Update stock
    let {
      categoryIdCategory,
      color,
      finishingProcess,
      cubaType,
      description,
      stock,
      unitaryValue,
      imageLink,
      category,
    } = local

    //mounting a requisition
    stock = stock - qtdd
    // const updatedStock = {
    //   idProduct,
    //   categoryIdCategory,
    //   color,
    //   finishingProcess,
    //   cubaType,
    //   description,
    //   stock,
    //   unitaryValue,
    //   imageLink,
    //   category,
    // }

    //HERE WE HAVE A CORS ERROR, SO THE UPDATE IS NOT WORKING UNTIL NOW
    // let { data } = await api.put(
    //   '/product',
    //   querystring.stringify(updatedStock),
    //   config
    // )
    // console.log(`Updating stock${data}`)
    // console.log(data)
    if (index === 0) {
      //Register all the NF in mongoDB
      registerMongo(form)
    }
  }

  const registerOrder = async (form) => {
    // const response = await api.post(
    //   '/pessoaJuridica',
    //   querystring.stringify(values),
    //   config
    // )
    let { data } = await api.post('/order', querystring.stringify(form), config)
    let last_id = data[0].last_id
    console.log('register order ' + last_id)
    // setLastId(last_id)
    let local = JSON.parse(localStorage.getItem('cart'))
    local.map(({ idProduct, qtdd }, index) =>
      registerItem(idProduct, qtdd, last_id, local[index], form, index)
    )
  }

  const handleCheckOut = () => {
    if (localStorage.getItem('Login') && codPayment !== 0) {
      // console.log(localStorage.getItem('Login'))
      let today = new Date()
      let dd = String(today.getDate()).padStart(2, '0')
      let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      let yyyy = today.getFullYear()

      today = dd + '/' + mm + '/' + yyyy
      const form = {
        date: today,
        paymentFormIdPaymentForm: codPayment,
      }
      registerOrder(form)
    } else if (codPayment === 0) {
      alert('Por favor, escolha uma forma de pagamento')
    } else {
      alert('Por favor faça o Login antes de finalizar a compra')
      window.location.href = '/login'
    }
  }

  const handleSelect = (e) => {
    const { value } = e.target
    // console.log(value)
    setCodPayment(parseInt(value))
    // console.log(value)
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
              <select onChange={handleSelect}>
                <option value="0">Formas de Pagamento</option>
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
              <Button add onClick={handleCheckOut}>
                Finalizar a compra
              </Button>
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
