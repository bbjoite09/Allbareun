import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import Typography from '../elements/Typography';
import MissionChild from '../pages/Mission/MissionChild';
import MissionParents from '../pages/Mission/MissionParents';
import MissionList from '../pages/MissionList/MissionList';
import MyPage from '../pages/MyPage';
import Report from '../pages/Report/Report';

const Tab = createBottomTabNavigator();

function ParentTab() {
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
                source={require('../static/images/Navigation/ic_mission.png')}
                style={styles.iconStyle}
              />
            ) : (
              <Image
                source={require('../static/images/Navigation/ic_missionSelected.png')}
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
                source={require('../static/images/Navigation/ic_missionList.png')}
                style={styles.iconStyle}
              />
            ) : (
              <Image
                source={require('../static/images/Navigation/ic_missionListSelected.png')}
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
                source={require('../static/images/Navigation/ic_report.png')}
                style={styles.iconStyle}
              />
            ) : (
              <Image
                source={require('../static/images/Navigation/ic_reportSelected.png')}
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
                source={require('../static/images/Navigation/ic_myPage.png')}
                style={styles.iconStyle}
              />
            ) : (
              <Image
                source={require('../static/images/Navigation/ic_myPageSelected.png')}
                style={styles.iconStyle}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export function ChildTab() {
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
                source={require('../static/images/Navigation/ic_mission.png')}
                style={styles.iconStyle}
              />
            ) : (
              <Image
                source={require('../static/images/Navigation/ic_missionSelected.png')}
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
                source={require('../static/images/Navigation/ic_missionList.png')}
                style={styles.iconStyle}
              />
            ) : (
              <Image
                source={require('../static/images/Navigation/ic_missionListSelected.png')}
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
                source={require('../static/images/Navigation/ic_report.png')}
                style={styles.iconStyle}
              />
            ) : (
              <Image
                source={require('../static/images/Navigation/ic_reportSelected.png')}
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
                source={require('../static/images/Navigation/ic_myPage.png')}
                style={styles.iconStyle}
              />
            ) : (
              <Image
                source={require('../static/images/Navigation/ic_myPageSelected.png')}
                style={styles.iconStyle}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    width: 30,
    height: 30,
  },
});

export default ParentTab;
