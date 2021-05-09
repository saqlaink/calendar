import styled from "styled-components";

const Button = styled.button`
  background: ${({ primary, theme }) => (primary ? theme.red : theme.white)};
  border: ${({ secondary, theme }) =>
    secondary ? `1px solid ${theme.lightGray}` : "0"};
  border-radius: 5px;
  color: ${({ primary, theme }) => (primary ? theme.white : theme.black)};
  font-size: 0.875rem;
  padding: 0.5rem 1rem;

  :focus {
    outline: 0;
  }

  :hover {
    cursor: pointer;
  }
`;

Button.defaultProps = {
  primary: false,
  secondary: false,
};

export default Button;
