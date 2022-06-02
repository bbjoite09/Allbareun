// 아이콘 출처
// https://www.flaticon.com/kr/free-icons/ 아이콘 제작자: Freepik - Flaticon

import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import AllStack from './src/navigation/AllStack';

export type RootStackParamList = {
  MissionList: undefined;
  MissionListDetail: { day: object };
  SignIn: undefined;
  SignUp: undefined;
  ChildTab: undefined;
  ParentTab: undefined;
  Pairing: undefined;
};

const App = () => {
  return (
    <NavigationContainer>
      <AllStack />
    </NavigationContainer>
  );
};

export default App;
