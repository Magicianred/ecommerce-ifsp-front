import React from 'react'
import querystring from 'querystring'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Button from '../Button'
import { validate } from './validate'
import {
  FlexContainer,
  GridContainer,
  Title,
  StyledTerms,
  DivBackDrop,
  CloseButton,
} from './styles'
import api from '../../services/api'

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

const FormCustomer = ({ isOpen, toggle }) => {
  const handleOnSubmit = async (values, actions) => {
    // alert(JSON.stringify(values))
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }

    const response = await api.post(
      '/pessoaFisica',
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
        nameCustomer: '',
        email: '',
        token,
        userType: 1,
        CPF: '',
        RG: '',
        phone: '',
        dateBirth: '',
        password: '',
        district: '',
        number: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
      }}
      validationSchema={Yup.object(validate)}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <DivBackDrop open={isOpen}></DivBackDrop>
        <GridContainer open={isOpen}>
          <CloseButton onClick={toggle}>x</CloseButton>
          <Title className="title">Pessoa Física</Title>
          <FlexContainer className="nameCustomer">
            <label htmlFor="nameCustomer">Nome:</label>
            <Field name="nameCustomer" type="text" />
            <ErrorMessage name="nameCustomer" />
          </FlexContainer>
          <FlexContainer className="email">
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="name" />
          </FlexContainer>
          <FlexContainer className="token">
            <label htmlFor="token">Token:</label>
            <Field name="token" type="token" disabled />
            <ErrorMessage name="token" />
          </FlexContainer>
          <FlexContainer>
            <label htmlFor="userType">Tipo de usuário</label>
            <Field as="select" name="userType" value="1" disabled>
              <option value="1">Comum</option>
              <option value="2">Admin</option>
            </Field>
          </FlexContainer>
          <FlexContainer className="cpf">
            <label htmlFor="CPF">CPF:</label>
            <Field name="CPF" type="text" />
            <ErrorMessage name="CPF" />
          </FlexContainer>
          <FlexContainer className="rg">
            <label htmlFor="RG">RG:</label>
            <Field name="RG" type="text" />
            <ErrorMessage name="RG" />
          </FlexContainer>
          <FlexContainer className="phone">
            <label htmlFor="phone">Telefone:</label>
            <Field name="phone" type="text" />
            <ErrorMessage name="phone" />
          </FlexContainer>
          <FlexContainer className="bithday">
            <label htmlFor="dateBirth">Data de Nascimento:</label>
            <Field name="dateBirth" type="string" />
            <ErrorMessage name="dateBirth" />
          </FlexContainer>
          <FlexContainer className="password">
            <label htmlFor="password">Senha:</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" />
          </FlexContainer>
          <Title className="address">Endereço:</Title>
          <FlexContainer className="district">
            <label htmlFor="district">Bairro:</label>
            <Field name="district" type="text" />
            <ErrorMessage name="district" />
          </FlexContainer>
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
            </StyledTerms>
            <ErrorMessage name="acceptedTerms" />
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

export default FormCustomer
