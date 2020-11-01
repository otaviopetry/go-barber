import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiClock, FiPower } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Amanhã</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars3.githubusercontent.com/u/55718618?s=460&u=4a2cd153a684ad1aa997b7ee48d546c267448c75&v=4"
                alt="Otavio Petry"
              />

              <strong>Otavio Petry</strong>
              <span>
                <FiClock />
                10:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                11:00
              </span>

              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/55718618?s=460&u=4a2cd153a684ad1aa997b7ee48d546c267448c75&v=4"
                  alt="Otavio Petry"
                />

                <strong>Otavio Petry</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                11:00
              </span>

              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/55718618?s=460&u=4a2cd153a684ad1aa997b7ee48d546c267448c75&v=4"
                  alt="Otavio Petry"
                />

                <strong>Otavio Petry</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                11:00
              </span>

              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/55718618?s=460&u=4a2cd153a684ad1aa997b7ee48d546c267448c75&v=4"
                  alt="Otavio Petry"
                />

                <strong>Otavio Petry</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
