// 아이콘 출처
// https://www.flaticon.com/kr/free-icons/ 아이콘 제작자: Freepik - Flaticon

import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import AllStack from './src/navigation/AllStack';
import { Provider } from 'react-redux';
import store from './src/redux/store';

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
    <Provider store={store}>
      <NavigationContainer>
        <AllStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
