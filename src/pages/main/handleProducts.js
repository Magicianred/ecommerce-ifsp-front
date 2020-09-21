import React from 'react'
import { handleImage } from './handleImage'
import {
  Product,
  ResponsiveDiv,
  Img,
  Figcaption,
  Flex,
  Link,
  DivDetails,
  Details,
  Price,
} from './styles'
import { Button } from '../../components/index'

export const handleProducts = ({
  idProduct,
  color,
  unitaryValue,
  imageLink,
  category,
  finishingProcess,
  description,
}) => {
  return (
    <Product key={idProduct}>
      <ResponsiveDiv>
        <Img src={handleImage(imageLink)} />
        <Figcaption>{color}</Figcaption>
      </ResponsiveDiv>
      <Flex>
        <Price>R${unitaryValue}</Price>
        <Link href={`/product/${idProduct}`}>
          <Button>Comprar</Button>
        </Link>
      </Flex>
      <DivDetails>
        <Details>Descrição: {description}</Details>
        <Details>Categoria: {category}</Details>
        <Details>Acabamento: {finishingProcess}</Details>
      </DivDetails>
    </Product>
  )
}
