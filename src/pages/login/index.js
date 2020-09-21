import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { DivColumn, StyledLabel, DivLogin, Link, Lock, Nav } from './styles'
import { Button, Logo, Footer } from '../../components/index'
import * as Yup from 'yup'
import { validate } from './validate'
import api from '../../services/api'

const Login = () => {
  const handleLogin = async (user, pass) => {
    const pf = await api.get('/pessoaFisica')
    const pj = await api.get('/pessoaJuridica')
    const customers = [...pf.data, ...pj.data]
    const validation = customers.find(
      ({ email, password }) => user === email && pass === password
    )

    if (validation) {
      const { customerIdCustomer } = validation
      const address = await api.get(
        `/address?customerIdCustomer=${customerIdCustomer}`
      )
      // localStorage.setItem('Address', JSON.stringify(address.data))
      const phone = await api.get(
        `/phone?customerIdCustomer=${customerIdCustomer}`
      )
      // localStorage.setItem('Phone', JSON.stringify(phone.data))
      let compose = { ...address.data[0], ...phone.data[0] }
      localStorage.setItem(
        'Login',
        JSON.stringify({
          ...validation,
          password: 0,
          ...compose,
        })
      )
      validation.nameCustomer
        ? alert(`Bem vindo(a) ${validation.nameCustomer}`)
        : alert(`Bem vindo(a) ${validation.razaoSocial}`)
      window.location.href = '/'
    } else {
      alert('Digite um usuário ou senha válidos')
    }
    // validation
    //   ? localStorage.setItem(
    //       'Login',
    //       JSON.stringify({ ...validation, password: 0 })
    //     )
    //   : alert('Digite um usuário ou senha válidos')
    //localStorage.setItem('Login',{ ...validation, password: 0 }))
    // if (validation) {
    //   alert(JSON.stringify({ ...validation, password: 0 }))
    // }
  }
  const handleOnSubmit = async ({ email, password }, actions) => {
    // alert(JSON.stringify(email))
    handleLogin(email, password)
  }
  return (
    <>
      <Nav>
        <Logo />
      </Nav>
      <Formik
        initialValues={{
          email: 'joao@joao.com',
          password: 'teste123',
        }}
        validationSchema={Yup.object(validate)}
        onSubmit={handleOnSubmit}
      >
        <Form>
          <DivLogin>
            <Lock className="lock" />
            <DivColumn>
              <StyledLabel htmlFor="email">Email:</StyledLabel>
              <Field name="email" type="text" />
              <ErrorMessage name="email" />
              <StyledLabel htmlFor="passwor">Senha:</StyledLabel>
              <Field name="password" type="password" />
              <ErrorMessage name="password" />
              <Link href="">Registrar!</Link>
              <Link href="">Esqueci a senha!</Link>
            </DivColumn>
            <DivColumn>
              <Button type="submit">Submit</Button>
            </DivColumn>
          </DivLogin>
        </Form>
      </Formik>
      <Footer />
    </>
  )
}

export default Login
