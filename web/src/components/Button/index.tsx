import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// make data type from another one
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  // set button type and if another one is passed, override
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
