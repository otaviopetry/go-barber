import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  Username,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  const ProviderItem = ({ item: provider }: { item: Provider }) => (
    <ProviderContainer onPress={() => navigateToCreateAppointment(provider.id)}>
      <ProviderAvatar source={{ uri: provider.avatar_url }} />

      <ProviderInfo>
        <ProviderName>{provider.name}</ProviderName>

        <ProviderMeta>
          <Icon name="calendar" size={14} color="#ff9900" />
          <ProviderMetaText>Segunda à sexta</ProviderMetaText>
        </ProviderMeta>

        <ProviderMeta>
          <Icon name="clock" size={14} color="#ff9900" />
          <ProviderMetaText>8h às 18h</ProviderMetaText>
        </ProviderMeta>
      </ProviderInfo>
    </ProviderContainer>
  );

  const ListTitle = (title: string) => (
    <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <Username>{user.name}</Username>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={(item: Provider) => item.id}
        renderItem={ProviderItem}
        ListHeaderComponent={ListTitle}
      />
    </Container>
  );
};

export default Dashboard;
