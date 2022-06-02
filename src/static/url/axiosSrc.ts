import { Config } from 'react-native-config';

const IP = Config.IP;
const baseUrl = `http://${IP}/api`;

export const url = {
  usersSrc: baseUrl + '/users',
};

export const axiosSrc = {
  signUp: url.usersSrc + '/register',
  signIn: url.usersSrc + '/login',
  partner: url.usersSrc + '/partner',
};
