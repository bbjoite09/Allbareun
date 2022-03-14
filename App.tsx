import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MissionChild from './src/Pages/Mission/MissionChild';
import MissionList from './src/Pages/MissionList/MissionList';
import Report from './src/Pages/Report/Report';
import MyPage from './src/Pages/MyPage';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Mission" component={MissionChild} />
      <Tab.Screen name="MissionList" component={MissionList} />
      <Tab.Screen name="Report" component={Report} />
      <Tab.Screen name="Mypage" component={MyPage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
