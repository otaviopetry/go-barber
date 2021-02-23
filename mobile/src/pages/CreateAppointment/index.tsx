import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersList,
  ProvidersListContainer,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
} from './styles';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { providerId } = route.params as RouteParams;
  const { goBack } = useNavigation();

  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const ProviderItem = ({ item: provider }: { item: Provider }) => (
    <ProviderContainer>
      <ProviderAvatar source={{ uri: provider.avatar_url }} />
      <ProviderName>{provider.name}</ProviderName>
    </ProviderContainer>
  );

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider: Provider) => provider.id}
          renderItem={ProviderItem}
        />
      </ProvidersListContainer>
    </Container>
  );
};

export default CreateAppointment;
