import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import ParentTab, { ChildTab } from './Tab';
import MissionListDetail from '../pages/MissionList/MissionListDetail';
import Pairing from '../pages/Pairing';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import BodyData from '../pages/BodyData';

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
        name="Pairing"
        component={Pairing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ParentTab"
        component={ParentTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChildTab"
        component={ChildTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MissionListDetail"
        component={MissionListDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BodyData"
        component={BodyData}
        options={{ headerShown: true, headerTitle: '' }}
      />
    </Stack.Navigator>
  );
};

export default AllStack;
