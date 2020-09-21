import React, { useState, useEffect } from 'react'
import { Header, Footer, Button } from '../../components/index'
import api from '../../services/api'
import { Container, Flex } from './styles'
import { handleProducts } from './handleProducts'

const Main = () => {
  const [pagination, setPaginaton] = useState({
    limit: 9,
    start: 0,
  })

  const [products, setProducts] = useState([])
  const [response, setResponse] = useState({
    data: [],
  })

  const loadProducts = async () => {
    const response = await api.get('/product')
    setTimeout(() => {
      setResponse({ ...response, data: response.data })
    }, 2000)
  }

  function nextPage() {
    setPaginaton({ ...pagination, start: pagination.limit + pagination.start })
    window.scrollTo(0, 0)
  }

  function prevPage() {
    setPaginaton({ ...pagination, start: pagination.limit - pagination.start })
    window.scrollTo(0, 0)
  }

  function handlePagination() {
    const { limit, start } = pagination
    const { data } = response
    const paginatedProducts = data.filter((item, index) => {
      if (index >= start && index < start + limit) {
        return item
      }
    })

    setProducts(paginatedProducts)
  }

  useEffect(() => {
    handlePagination()
    loadProducts()
  }, [pagination, response])

  return (
    <>
      <Header />
      <Flex className="before-after">
        <Button onClick={prevPage} disabled={pagination.start === 0}>
          Anterior
        </Button>
        <Button
          onClick={nextPage}
          disabled={pagination.start + pagination.limit >= response.data.length}
        >
          Próxima
        </Button>
      </Flex>
      <Container>{products.map(handleProducts)}</Container>
      <Flex className="before-after">
        <Button onClick={prevPage} disabled={pagination.start === 0}>
          Anterior
        </Button>
        <Button
          onClick={nextPage}
          disabled={pagination.start + pagination.limit >= response.data.length}
        >
          Próxima
        </Button>
      </Flex>
      <Footer />
    </>
  )
}

export default Main
