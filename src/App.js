import './App.css';
import axios from 'axios';
import styled, {
  createGlobalStyle,
  ThemeProvider,
  keyframes,
} from 'styled-components';
import { IconButton } from '@material-ui/core';
import sun from './images/sun.svg';
import moon from './images/moon.svg';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import PersonIcon from '@material-ui/icons/Person';
import WeatherForecast from './components/WeatherForecast';
import { useRef, useState } from 'react';
import WeatherIconComponent from './components/Icon';
import Modal from 'react-modal';
import { bounce, fadeIn, rollIn, slideInUp } from 'react-animations';
import moment from 'moment';

function App() {
  const [theme, setTheme] = useState(GlobalStyle);

  Modal.setAppElement('#root');
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const [weatherInfo, setWeatherInfo] = useState(null);
  const inputRef = useRef(null);

  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const todaysDate = new Date().toLocaleDateString('en-GB', options);

  const fetchWeatherInfo = (e) => {
    e.preventDefault();
    const options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/forecast',
      params: {
        q: inputRef.current.value, //"London, uk"
        units: 'metric',
      },
      headers: {
        'x-rapidapi-key': '5ee839aacfmsh9ead2a5c2e634cep1e4af1jsn6cf3f3f58df2',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then((response) => {
        setWeatherInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setIsOpen(false);
  };

  const condition = weatherInfo?.list[0]?.weather[0]?.main;
  const condition1 = weatherInfo?.list[1]?.weather[0]?.main;
  const condition2 = weatherInfo?.list[2]?.weather[0]?.main;

  const timezone = weatherInfo?.city.timezone * 1000 - 3600 * 1000;
  const time = new Date(
    weatherInfo?.list[0]?.dt * 1000 + timezone
  ).toLocaleTimeString();
  const time2 = new Date(
    weatherInfo?.list[1].dt * 1000 + timezone
  ).toLocaleTimeString();
  const time3 = new Date(
    weatherInfo?.list[2].dt * 1000 + timezone
  ).toLocaleTimeString();
  console.log(time);

  const unixTime = weatherInfo?.list[0].dt;
  const date1 = new Date(unixTime * 1000 + timezone);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <div className='App'>
          <AppContainer>
            <AppHeader>
              <p>{todaysDate}</p>
              <AppLightDarkMode>
                <IconButton
                  onClick={() =>
                    setTheme(
                      theme.mode === 'dark'
                        ? { mode: 'light' }
                        : { mode: 'dark' }
                    )
                  }
                >
                  <LightModeImage src={sun} />
                </IconButton>
                <IconButton
                  onClick={() =>
                    setTheme(
                      theme.mode === 'dark'
                        ? { mode: 'light' }
                        : { mode: 'dark' }
                    )
                  }
                >
                  <DarkModeImage src={moon} />
                </IconButton>
              </AppLightDarkMode>
            </AppHeader>
            {/* <form onSubmit={fetchWeatherInfo}>
              <AppInput ref={inputRef} placeholder='🔎  London...' />
            </form> */}
            <AppHeroContainer>
              <WeatherIconBg>
                <WeatherIconComponent condition={condition} />
                {/* <WeatherIcon src={sun} /> */}
              </WeatherIconBg>
              {weatherInfo ? (
                <WeatherName>{weatherInfo?.city?.name}</WeatherName>
              ) : (
                <WeatherName
                  style={{ paddingTop: '20px', borderRadius: '15px' }}
                >
                  Search the Weather
                </WeatherName>
              )}

              {weatherInfo ? (
                <WeatherTemp>
                  {Math.trunc(weatherInfo?.list[0].main?.temp)}° C
                </WeatherTemp>
              ) : (
                <WeatherTemp></WeatherTemp>
              )}
            </AppHeroContainer>
            <FutureWeatherContainer>
              <WeatherForecast
                weatherTime={time.substr(0, 5)}
                weatherTemp={Math.trunc(weatherInfo?.list[1]?.main?.temp)}
                condition={condition}
              />
              <WeatherForecast
                weatherTime={time2.substr(0, 5)}
                weatherTemp={Math.trunc(weatherInfo?.list[2]?.main?.temp)}
                condition={condition1}
              />
              {/* weatherInfo?.list[3].dt_txt.substr(10, 6) */}
              <WeatherForecast
                weatherTime={time3.substr(0, 5)}
                weatherTemp={Math.trunc(weatherInfo?.list[3]?.main?.temp)}
                condition={condition2}
              />
            </FutureWeatherContainer>
            <Footer>
              <IconButton>
                <HomeIcon style={{ color: '#545457' }} />
              </IconButton>
              <IconButton onClick={toggleModal}>
                <SearchIcon1 style={{ color: '#545457' }} />
              </IconButton>
              <IconButton>
                <ExploreIcon style={{ color: '#545457' }} />
              </IconButton>
              <IconButton>
                <PersonIcon style={{ color: '#545457' }} />
              </IconButton>
              <ModalBox isOpen={isOpen} onRequestClose={toggleModal}>
                <form onSubmit={fetchWeatherInfo}>
                  <input
                    type='text'
                    ref={inputRef}
                    placeholder='🔎  London...'
                  />
                </form>
              </ModalBox>
            </Footer>
          </AppContainer>
        </div>
      </>
    </ThemeProvider>
  );
}
const GlobalStyle = createGlobalStyle`
   body {
    background-color: ${(props) =>
      props.theme.mode === 'dark' ? '#101015' : 'whitesmoke'};
  }
`;

const AppContainer = styled.div`
  background-color: ${(props) =>
    props.theme.mode === 'dark' ? '#101015' : 'whitesmoke'};
  height: 100vh;
  width: 100vw;
  overflow: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const bounceAnimation = keyframes`${bounce}`;
const fadeInAnimation = keyframes`${slideInUp}`;

const ModalBox = styled(Modal)`
  height: 50px;
  width: 350px;
  position: fixed;
  bottom: 2%;
  left: 50%;
  transform: translate(-50%, -100%);
  display: flex;
  justify-content: center;
  outline: none;
  > form > input {
    height: 25px;
    width: 250px !important;
    border-radius: 35px;
    margin: 15px;
    padding-left: 9px;
    width: 90%;
    border: none;
    outline: none;
    animation: 1s ${fadeInAnimation};
    background-color: ${(props) =>
      props.theme.mode === 'dark' ? '#101015' : 'whitesmoke'};
    color: ${(props) =>
      props.theme.mode === 'dark' ? 'whitesmoke' : '#101015'};
  }

  /* border: 1px solid #ccc;
  background: #fff;
  overflow: auto;
  border-radius: 4px;
  outline: none; */
`;

const AppHeader = styled.header`
  display: flex;
  width: 90%;
  justify-content: space-between;
  padding: 8px;
  > p {
    color: #545457;
  }
  margin-bottom: 2%;
`;

const AppInput = styled.input`
  height: 25px;
  border-radius: 35px;
  margin: 15px;
  padding-left: 9px;
  width: 90%;
  border: none;
  outline: none;
`;

const AppLightDarkMode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  border-radius: 50px;
  width: 100px;
  height: 30px;
  border: 0.5px solid #545457;
`;

const LightModeImage = styled.img`
  height: 25px;
  width: 25px;
  color: yellow;
  opacity: ${(props) => (props.theme.mode === 'dark' ? '0.2' : '1')};
`;

const DarkModeImage = styled.img`
  height: 25px;
  width: 25px;
  color: yellow;
  opacity: ${(props) => (props.theme.mode === 'dark' ? '1' : '0.3')};
`;

const AppHeroContainer = styled.div`
  height: 50vh;
  background-image: url('https://simplemaps.com/static/demos/resources/svg-library/svgs/world.svg');
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.9;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  font-weight: bold;

  @media screen and (min-width: 768px) {
    background-size: cover;
  }
`;

// const AppHeroBackground = styled.div`
//   background-color: #101015;
//   opacity: 0.91;
//   height: 100%;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   color: white;
//   font-weight: bold;
// `;

// const WeatherIcon = styled.img`
//   height: 180px;
// `;

const WeatherIconBg = styled.div`
  background: rgba(84, 84, 87, 0.25);
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 12px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const WeatherTemp = styled.h1`
  font-size: 66px;
  color: ${(props) => (props.theme.mode === 'dark' ? 'whitesmoke' : '#101015')};
`;

const WeatherName = styled.h2`
  font-size: 20px;
  letter-spacing: 1px;
  color: ${(props) => (props.theme.mode === 'dark' ? 'whitesmoke' : '#101015')};
  background-color: ${(props) =>
    props.theme.mode === 'dark' ? '#101015' : 'whitesmoke'};
`;

const FutureWeatherContainer = styled.div`
  height: 30vh;
  width: 80%;
  display: flex;
  justify-content: space-around;
`;

const Footer = styled.footer`
  width: 100%;
  height: 10vh;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-around;

  > .MuiIconButton-root:hover {
    background-color: none !important;
    outline: none;
    color: red;
  }
`;

const SearchIcon1 = styled(SearchIcon)`
  animation: 5s ${bounceAnimation};
`;

export default App;
