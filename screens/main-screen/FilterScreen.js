import {Button, View} from "react-native";
import React from "react";

export default function FilterHouseScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Notifications"
                onPress={() => navigation.navigate('ListHouseScreen')}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}
