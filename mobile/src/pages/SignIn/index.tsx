import React from 'react';
import { Text, StatusBar } from 'react-native';

import { Container } from './styles';

const SignIn: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#eaeaea" />
      <Container>
        <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 24 }}>
          Hello dude!
        </Text>
      </Container>
    </>
  );
};

export default SignIn;
