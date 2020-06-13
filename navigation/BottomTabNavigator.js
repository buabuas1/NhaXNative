import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import MessageScreen from '../screens/MessageScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import PromotionScreen from '../screens/PromotionScreen';
import MainHouseScreen from '../screens/main-screen/MainHouseScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({navigation, route}) {
    // Set the header title on the parent stack navigator depending on the
    // currently active tab. Learn more in the documentation:
    // https://reactnavigation.org/docs/en/screen-options-resolution.html
    navigation.setOptions({headerTitle: getHeaderTitle(route)});

    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen
                name="House"
                component={HomeScreen}
                options={{
                    title: 'Tìm phòng',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="ios-home"/>,
                }}
            />
            <BottomTab.Screen
                name="Khuyến mại"
                component={PromotionScreen}
                options={{
                    title: 'Khuyến mại',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="ios-gift"/>,
                }}
            />
            <BottomTab.Screen
                name="Nhắn tin"
                component={MessageScreen}
                options={{
                    title: 'Nhắn tin',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="ios-chatbubbles"/>,
                }}
            />
            <BottomTab.Screen
                name="Tài khoản"
                component={UserAccountScreen}
                options={{
                    title: 'Tài khoản',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="ios-person"/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
    console.log(route);
    switch (routeName) {
        case 'Home':
            return 'Nhà X';
        case 'Links':
            return 'Links to learn more';
        case 'Nhắn tin':
            return 'Nhắn tin với Admin';
        case 'Tài khoản':
            return 'Tài khoản';
        case 'Khuyến mại':
            return 'Khuyến mại';
        case 'House':
            return 'Tìm phòng';
    }
}
