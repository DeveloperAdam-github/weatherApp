import React from 'react';
import styled from 'styled-components';
import Sunny from '../images/sun.svg';
import Rain from '../images/heavyRain.svg';
import Cloud from '../images/clouds.svg';

const WeatherIconComponent = ({ condition }) => {
  var icon = Sunny;
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

  return <WeatherIcon src={icon} condition={condition} alt='Weather Icon' />;
};

const WeatherIcon = styled.img`
  height: 120px;
`;

export default WeatherIconComponent;
