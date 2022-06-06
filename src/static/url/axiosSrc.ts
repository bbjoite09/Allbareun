import { Config } from 'react-native-config';

const IP = Config.IP;
const baseUrl = `http://${IP}/api`;

export const url = {
  usersSrc: baseUrl + '/users',
  foodSrc: baseUrl + '/intake',
  healthSrc: baseUrl + '/mypage',
  reportUrl: baseUrl + '/report',
  missionUrl: baseUrl + '/mission',
};

export const axiosSrc = {
  signUp: url.usersSrc + '/register',
  signIn: url.usersSrc + '/login',
  pairing: url.usersSrc + '/partner',
  auth: url.usersSrc + '/auth',
  getFood: url.foodSrc + '/list/',
  health: url.healthSrc + '/body/',
  report: url.reportUrl + '/',
  setMissionPersonalSuccess: url.foodSrc + '/add/',
  setMissionRecommendSuccess: url.missionUrl + '/performMission/',
  getRecommendMission: url.missionUrl + '/recommend/',
  setRecommendMission: url.missionUrl + '/chooseMission',
  setPersonalMisson: url.missionUrl + '/addMission',
  getMissoin: url.missionUrl + '/showMission/',
};
