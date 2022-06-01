const baseUrl = 'http://localhost:3000/api';
export const url = {
  usersSrc: baseUrl + '/users',
};

export const axiosSrc = {
  signUp: url.usersSrc + '/register',
  signIn: url.usersSrc + '/login',
  partner: url.usersSrc + '/partner',
};
