// 아이콘 출처
// https://www.flaticon.com/kr/free-icons/ 아이콘 제작자: Freepik - Flaticon

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import Typography from './src/Components/Typography';
import MissionParents from './src/Pages/Mission/MissionParents';
import MissionList from './src/Pages/MissionList/MissionList';
import MissionListDetail from './src/Pages/MissionList/MissionListDetail';
import MyPage from './src/Pages/MyPage';
import Report from './src/Pages/Report/Report';
import SignIn from './src/Pages/SignIn';
import SignUp from './src/Pages/SignUp';

export type RootStackParamList = {
  MissionList: undefined;
  MissionListDetail: { day: object };
  SignIn: undefined;
  SignUp: undefined;
  MyTabs: undefined;
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Mission"
        component={MissionParents}
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? <Typography value="미션" /> : null,
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                source={require('./src/Assets/Navigation/ic_mission.png')}
                style={styles.iconStyle}
              />
            ) : (
              <Image
                source={require('./src/Assets/Navigation/ic_missionSelected.png')}
                style={styles.iconStyle}
              />
            ),
        }}
      />
      <Tab.Screen
        name="MissionList"
        component={MissionList}
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? <Typography value="지난 미션" /> : null,
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                source={require('./src/Assets/Navigation/ic_missionList.png')}
                style={styles.iconStyle}
              />
            ) : (
              <Image
                source={require('./src/Assets/Navigation/ic_missionListSelected.png')}
                style={styles.iconStyle}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? <Typography value="월간 레포트" /> : null,
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                source={require('./src/Assets/Navigation/ic_report.png')}
                style={styles.iconStyle}
              />
            ) : (
              <Image
                source={require('./src/Assets/Navigation/ic_reportSelected.png')}
                style={styles.iconStyle}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={MyPage}
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? <Typography value="마이페이지" /> : null,
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                source={require('./src/Assets/Navigation/ic_myPage.png')}
                style={styles.iconStyle}
              />
            ) : (
              <Image
                source={require('./src/Assets/Navigation/ic_myPageSelected.png')}
                style={styles.iconStyle}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

const AllStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MissionListDetail"
        component={MissionListDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AllStack />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 30,
    height: 30,
  },
});

export default App;
