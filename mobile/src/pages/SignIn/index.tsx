import React from 'react';
import { Text, StatusBar, Image } from 'react-native';

import { Container, Title } from './styles';
import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#eaeaea" />
      <Container>
        <Image source={logoImg} />
        <Title>Hello Dude!</Title>
      </Container>
    </>
  );
};

export default SignIn;
