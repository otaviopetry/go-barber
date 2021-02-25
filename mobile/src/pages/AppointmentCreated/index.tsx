import React from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

const AppointmentCreated: React.FC = () => {
  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento concluído</Title>
      <Description>
        Terça, this january is time to michael down your vincents
      </Description>

      <OkButton>
        <OkButtonText>Okay!</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
