import styled, { css } from 'styled-components'

export const DivBackDrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);

  ${({ open }) =>
    !open &&
    css`
      display: none;
    `}
`
export const GridContainer = styled.div`
  display: grid;
  position: fixed;
  top: 2em;
  left: 15em;
  right: 15em;
  padding: 0.7em;
  border: 1px solid gray;
  background-color: white;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    'user user user'
    'grid-one grid-one grid-two'
    'grid-three grid-four grid-five'
    'grid-six grid-seven .'
    'address address address'
    'grid-eight grid-nine grid-ten'
    'grid-eleven grid-twelve grid-thirteen'
    'grid-fourteen grid-fourteen grid-fourteen'
    '. center-button .';
  grid-gap: 0.5em;
  ${({ open }) =>
    !open &&
    css`
      display: none;
    `}

  .title {
    grid-area: user;
  }
  .email {
    grid-area: grid-one;
  }
  .password {
    grid-area: grid-two;
  }
  .userType {
    grid-area: grid-three;
  }
  .token {
    grid-area: grid-four;
  }
  .nameCustomer {
    grid-area: grid-five;
  }
  .cnpj {
    grid-area: grid-six;
  }
  .razaoSocial {
    grid-area: grid-seven;
  }
  .address {
    grid-area: address;
  }
  .street {
    grid-area: grid-eight;
  }
  .number {
    grid-area: grid-nine;
  }
  .district {
    grid-area: grid-ten;
  }
  .city {
    grid-area: grid-eleven;
  }
  .state {
    grid-area: grid-twelve;
  }
  .zipCode {
    grid-area: grid-thirteen;
  }
  .terms {
    grid-area: grid-fourteen;
  }
  .submit {
    grid-area: center-button;
  }

  @media (max-width: 900px) {
    top: 0;
    left: 0;
    right: 0;
  }
`

export const StyledTerms = styled.div`
  grid-gap: 0.5em;
  display: grid;
  grid-template-columns: 1em 14em;
  align-items: center;
`

export const CloseButton = styled.button`
  position: absolute;
  right: 1em;
  top: 1em;
  padding: 0.3em;
  border: 1px solid gray;
  cursor: pointer;
  padding: 0 0.5em;
  font-weight: bold;
  color: gray;
`

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    border-radius: 0.5em;
    border: 1px solid gray;
  }

  label {
    color: gray;
  }
  ${(props) =>
    props.row &&
    css`
      flex-direction: row;
      input[type='checkbox'] {
        margin: 0;
        padding: 0;
      }
    `}
`

export const Title = styled.h2``
