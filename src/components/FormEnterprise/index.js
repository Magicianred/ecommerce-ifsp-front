import React from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import Button from '../Button'
import { validate } from './validate'
import * as Yup from 'yup'
import {
  DivBackDrop,
  GridContainer,
  CloseButton,
  FlexContainer,
  Title,
  StyledTerms,
} from './styles'
import api from '../../services/api'
import querystring from 'querystring'

const generate_token = (length) => {
  //edit the token allowed characters
  let a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split(
    ''
  )
  let b = []
  for (let i = 0; i < length; i++) {
    let j = (Math.random() * (a.length - 1)).toFixed(0)
    b[i] = a[j]
  }
  return b.join('')
}

let token = generate_token(30)

const FormEnterprise = ({ isOpen, toggle }) => {
  const handleOnSubmit = async (values, actions) => {
    // alert(JSON.stringify(values))
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }

    const response = await api.post(
      '/pessoaJuridica',
      querystring.stringify(values),
      config
    )
    if (response.data[0].result === 'Dados inseridos com sucesso') {
      alert('Dados cadastrados com sucesso!')
      window.location.href = '/'
    } else {
      alert('Dados inválidos')
    }
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        userType: 3,
        token,
        CNPJ: '',
        razaoSocial: '',
        street: '',
        number: '',
        district: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
      }}
      validationSchema={Yup.object(validate)}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <DivBackDrop open={isOpen}></DivBackDrop>
        <GridContainer open={isOpen}>
          <CloseButton onClick={toggle}>x</CloseButton>
          <Title className="title">Pessoa Jurídica</Title>
          <FlexContainer className="email">
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="name" />
          </FlexContainer>
          <FlexContainer className="password">
            <label htmlFor="password">Senha:</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" />
          </FlexContainer>
          <FlexContainer className="userType">
            <label htmlFor="userType">Tipo de usuário</label>
            <Field as="select" name="userType" value="1" disabled>
              <option value="1">Comum</option>
              <option value="2">Admin</option>
            </Field>
          </FlexContainer>
          <FlexContainer className="token">
            <label htmlFor="token">Token:</label>
            <Field name="token" type="token" disabled />
            <ErrorMessage name="token" />
          </FlexContainer>
          <FlexContainer className="nameCustomer">
            <label htmlFor="nameCustomer">Nome:</label>
            <Field name="nameCustomer" type="text" />
            <ErrorMessage name="nameCustomer" />
          </FlexContainer>
          <FlexContainer className="cnpj">
            <label htmlFor="CNPJ">CNPJ:</label>
            <Field name="CNPJ" type="text" />
            <ErrorMessage name="CNPJ" />
          </FlexContainer>
          <FlexContainer className="razaoSocial">
            <label htmlFor="razaoSocial">Razão Social:</label>
            <Field name="razaoSocial" type="text" />
            <ErrorMessage name="razaoSocial" />
          </FlexContainer>
          <FlexContainer className="phone">
            <label htmlFor="phone">Telefone(+55):</label>
            <Field name="phone" type="text" />
            <ErrorMessage name="phone" />
          </FlexContainer>
          <Title className="address">Endereço:</Title>
          <FlexContainer className="street">
            <label htmlFor="street">Rua:</label>
            <Field name="street" type="text" />
            <ErrorMessage name="street" />
          </FlexContainer>
          <FlexContainer className="number">
            <label htmlFor="number">Número:</label>
            <Field name="number" type="text" />
            <ErrorMessage name="number" />
          </FlexContainer>
          <FlexContainer className="district">
            <label htmlFor="district">Bairro:</label>
            <Field name="district" type="text" />
            <ErrorMessage name="district" />
          </FlexContainer>
          <FlexContainer className="city">
            <label htmlFor="city">Cidade:</label>
            <Field name="city" type="text" />
            <ErrorMessage name="city" />
          </FlexContainer>
          <FlexContainer className="state">
            <label htmlFor="state">Estado:</label>
            <Field name="state" type="text" />
            <ErrorMessage name="state" />
          </FlexContainer>
          <FlexContainer className="zipCode">
            <label htmlFor="zipCode">CEP:</label>
            <Field name="zipCode" type="text" />
            <ErrorMessage name="zipCode" />
          </FlexContainer>
          <FlexContainer className="terms" row>
            <StyledTerms>
              <Field name="acceptedTerms" component="input" type="checkbox" />
              <label htmlFor="acceptedTerms">
                Aceito os termos e condições
              </label>
              <ErrorMessage name="acceptedTerms" />
            </StyledTerms>
          </FlexContainer>
          <FlexContainer className="submit">
            <Button margin="auto" type="submit">
              Submit
            </Button>
          </FlexContainer>
        </GridContainer>
      </Form>
    </Formik>
  )
}

export default FormEnterprise
