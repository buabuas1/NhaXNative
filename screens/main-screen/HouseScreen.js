import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {createStackNavigator} from "@react-navigation/stack";
import FilterHouseScreen from "./FilterScreen";
import ListHouseScreen from "./ListHouseScreen";
import HouseDetailScreen from "./HouseDetailScreen";
import {RouterPath} from "../../constants/Router";


function MainScreen({ navigation }) {
    return (
        <View style={{ flex: 1}}>
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate(RouterPath.FILTER_SCREEN)}
            />
        </View>
    );
}

const Stack = createStackNavigator();

function MainScreenStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={RouterPath.MAIN_SCREEN} component={MainScreen} options={{ title: '', headerStyle: styles.displayNone }}/>
            <Stack.Screen name={RouterPath.FILTER_SCREEN} component={FilterHouseScreen} options={{ title: 'My home' }}/>
            <Stack.Screen name={RouterPath.LIST_HOUSE_SCREEN} component={ListHouseScreen} options={{ title: 'My home' }}/>
            <Stack.Screen name={RouterPath.HOUSE_DETAIL_SCREEN} component={HouseDetailScreen} options={{ title: 'My home' }}/>
        </Stack.Navigator>
    );
}

export default function HouseScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text>Danh sách phòng theo Quận</Text>
            <View style={styles.container}>
                <Text></Text>
                <Text>333333333333333333</Text>
                <Text>333333333333333333</Text>
            </View>
            <MainScreenStack/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        flexDirection: 'row',
        padding: 16
    },
    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
    displayNone: {
        height: 0,
        opacity: 0
    }
});
