// 아이콘 출처
// https://www.flaticon.com/kr/free-icons/ 아이콘 제작자: Freepik - Flaticon

import * as React from 'react';
import { AppState, Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MissionChild from './src/Pages/Mission/MissionChild';
import MissionList from './src/Pages/MissionList/MissionList';
import Report from './src/Pages/Report/Report';
import MyPage from './src/Pages/MyPage';
import Typography from './src/Components/Typography';
import MissionListDetail from './src/Pages/MissionList/MissionListDetail';

export type RootStackParamList = {
  MissionList: undefined;
  MissionListDetail: { day: object };
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Mission"
        component={MissionChild}
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
    <Stack.Navigator initialRouteName="TabNavi">
      <Stack.Screen
        name="TabNavi"
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
