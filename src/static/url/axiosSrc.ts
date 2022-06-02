import { Config } from 'react-native-config';

const IP = Config.IP;
const baseUrl = `http://${IP}/api`;

export const url = {
  usersSrc: baseUrl + '/users',
  foodSrc: baseUrl + '/intake',
  healthSrc: baseUrl + '/mypage',
};

export const axiosSrc = {
  signUp: url.usersSrc + '/register',
  signIn: url.usersSrc + '/login',
  pairing: url.usersSrc + '/partner',
  auth: url.usersSrc + '/auth',
  food: url.foodSrc,
  health: url.healthSrc + '/body',
};
