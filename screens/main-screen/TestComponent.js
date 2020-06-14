
import * as React from 'react'
import {StyleSheet, Text, ScrollView, View} from 'react-native'

export default class Fixed extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tbar}>
                    <Text style={styles.text}>{'Fixed top bar'}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tbar: {
        width: 375,
        height: 100,
        borderBottomWidth: 5,
        borderColor: 'black',
        backgroundColor: 'red'
    },
    main: {
        flex: 1
    },
    item: {
        height: 200,
        width: 375,
        marginTop: 10,
        backgroundColor: 'green'
    },
    bbar: {
        width: 375,
        height: 100,
        borderTopWidth: 5,
        borderColor: 'black',
        backgroundColor: 'red'
    },
    text: {
        color: '#ffffff',
        fontSize: 40
    }
});