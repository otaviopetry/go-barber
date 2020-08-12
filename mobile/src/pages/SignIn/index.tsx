import React from 'react';
import { Text, StatusBar, Image } from 'react-native';

import { Container } from './styles';
import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#eaeaea" />
      <Container>
        <Image source={logoImg} />
        <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 24 }}>
          Hello dude!
        </Text>
      </Container>
    </>
  );
};

export default SignIn;
