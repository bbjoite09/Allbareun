import { Config } from 'react-native-config';

const IP = Config.IP;
const baseUrl = `http://${IP}/api`;

export const url = {
  usersSrc: baseUrl + '/users',
  foodSrc: baseUrl + '/intake',
  healthSrc: baseUrl + '/mypage',
  reportUrl: baseUrl + '/report',
};

export const axiosSrc = {
  signUp: url.usersSrc + '/register',
  signIn: url.usersSrc + '/login',
  pairing: url.usersSrc + '/partner',
  auth: url.usersSrc + '/auth',
  addFood: url.foodSrc + '/add/',
  health: url.healthSrc + '/body/',
  report: baseUrl + '/report/',
};
