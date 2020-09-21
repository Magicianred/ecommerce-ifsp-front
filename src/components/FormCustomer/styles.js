import styled, { css } from 'styled-components'

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
  right: 15em;
  padding: 0.7em;
  border: 1px solid gray;
  background-color: white;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    'user user user'
    'grid-one grid-one grid-one'
    'grid-two grid-two grid-four'
    'grid-five grid-six grid-seven'
    'grid-eight . .'
    'address address address'
    'grid-nine grid-ten grid-eleven'
    'grid-twelve grid-thirteen grid-fourteen'
    'grid-fifteen grid-fifteen grid-fifteen'
    '. center-button .';
  grid-gap: 0.5em;

  input {
    font-size: 1rem;
  }

  input:hover {
    border: 1px solid silver;
  }

  ${({ open }) =>
    !open &&
    css`
      display: none;
    `}

  .title {
    grid-area: user;
  }
  .nameCustomer {
    grid-area: grid-one;
  }

  .email {
    grid-area: grid-two;
  }

  .cpf {
    grid-area: grid-four;
  }

  .rg {
    grid-area: grid-five;
  }

  .phone {
    grid-area: grid-six;
  }

  .birthday {
    grid-area: grid-seven;
  }

  .password {
    grid-area: grid-eight;
  }

  .address {
    grid-area: address;
  }

  .district {
    grid-area: grid-nine;
  }

  .street {
    grid-area: grid-ten;
  }

  .number {
    grid-area: grid-eleven;
  }

  .city {
    grid-area: grid-twelve;
  }

  .state {
    grid-area: grid-thirteen;
  }

  .zipCode {
    grid-area: grid-fourteen;
  }

  .terms {
    grid-area: grid-fifteen;
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
