import React from 'react';
import styled from 'styled-components';
import Sunny from '../images/sun.svg';
import Rain from '../images/heavyRain.svg';
import Cloud from '../images/clouds.svg';
import Moon from '../images/moon.svg';

const WeatherForecast = ({ weatherTime, weatherTemp, condition }) => {
  var icon =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Blue_Square.svg/781px-Blue_Square.svg.png';
  switch (condition) {
    case 'Rain':
      icon = Rain;
      break;
    case 'Clouds':
      icon = Cloud;
      break;
    case 'Sunny':
      icon = Sunny;
      break;
    case 'Clear':
      icon = Sunny;
      break;
    default:
      icon = Sunny;
      break;
  }

  return (
    <WeatherContainer>
      <WeatherIcon1 src={icon} condition={condition} />

      {weatherTime === 'Inval' ? (
        <WeatherTime1></WeatherTime1>
      ) : (
        <WeatherTime1>{weatherTime}</WeatherTime1>
      )}

      {weatherTemp ? (
        <WeatherTemp1>{weatherTemp}° C</WeatherTemp1>
      ) : (
        <WeatherTemp1></WeatherTemp1>
      )}
    </WeatherContainer>
  );
};

const WeatherContainer = styled.div`
  height: 70%;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WeatherIcon1 = styled.img`
  height: 40px;
  margin: 5px;
  border-radius: 50%;
`;

const WeatherTime1 = styled.p`
  color: #545457;
  margin: 5px;
  color: ${(props) => (props.theme.mode === 'dark' ? 'whitesmoke' : '#101015')};
`;

const WeatherTemp1 = styled.h3`
  color: whitesmoke;
  color: ${(props) => (props.theme.mode === 'dark' ? 'whitesmoke' : '#101015')};
`;

export default WeatherForecast;
