import styled, { css } from 'styled-components'

const Button = styled.button`
  margin: auto 0.5em;
  border: 1px solid gray;
  border-radius: 1em;
  padding: 0.5em 0.8em;
  background: rgb(189, 230, 224);
  background: linear-gradient(
    90deg,
    rgba(189, 230, 224, 1) 0%,
    rgba(176, 198, 194, 1) 35%,
    rgba(176, 198, 194, 1) 100%
  );
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.8rem;
  transition: 0.5s;

  &:hover {
    :not(:disabled) {
      background: rgb(223, 237, 238);
      background: linear-gradient(
        90deg,
        rgba(223, 237, 238, 1) 0%,
        rgba(235, 235, 235, 1) 35%,
        rgba(210, 218, 219, 1) 100%
      );
      color: gray;
      border: 1px solid white;
    }
  }

  margin: ${({ margin }) => margin};
  ${({ primary }) =>
    primary &&
    css`
      background: rgb(224, 158, 87);
      background: linear-gradient(
        90deg,
        rgba(224, 158, 87, 1) 0%,
        rgba(228, 179, 104, 1) 35%,
        rgba(119, 126, 125, 1) 100%
      );
      color: gray;

      &:hover {
        background: rgb(224, 128, 87);
        background: linear-gradient(
          90deg,
          rgba(224, 128, 87, 1) 0%,
          rgba(228, 154, 104, 1) 35%,
          rgba(119, 126, 125, 1) 100%
        );
      }
    `}
  ${({ add }) =>
    add &&
    css`
      width: auto;
      background: green;
      color: white;
    `};
  :disabled {
    background: gray;
  }
`

export default Button
