import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {StyleSheet, Text, View, Button, Image, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {createStackNavigator} from "@react-navigation/stack";
import FilterHouseScreen from "./FilterScreen";
import ListHouseScreen from "./ListHouseScreen";
import HouseDetailScreen from "./HouseDetailScreen";
import {RouterPath} from "../../constants/Router";
import DistrictService from "../../services/district.service";
import {FlatList} from "react-native-web";
import RoomService from "../../services/room.service";

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

export default class HouseScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            districts: [{"_id":"5edbc393633a4d52a5fc58d9","Name":"Đống Đa","RoomNumber":10,"HouseNumber":5,"ImageId":"5ee3ac351577dd2b3f853215"},{"_id":"5edbc393633a4d52a5fc58dc","Name":"Thanh Xuân","RoomNumber":10,"HouseNumber":5},{"_id":"5edbc393633a4d52a5fc58db","Name":"Hà Đông","RoomNumber":10,"HouseNumber":5},{"_id":"5edbc393633a4d52a5fc58da","Name":"Cầu Giấy","RoomNumber":10,"HouseNumber":5},{"_id":"5edbc393633a4d52a5fc58da","Name":"Cầu Giấy","RoomNumber":10,"HouseNumber":5},{"_id":"5edbc393633a4d52a5fc58da","Name":"Cầu Giấy","RoomNumber":10,"HouseNumber":5}],
            rooms: [{"_id":"5edbc393633a4d52a5fc58d9","Name":"Đống Đa","RoomNumber":10,"HouseNumber":5,"ImageId":"5ee3ac351577dd2b3f853215"},{"_id":"5edbc393633a4d52a5fc58dc","Name":"Thanh Xuân","RoomNumber":10,"HouseNumber":5},{"_id":"5edbc393633a4d52a5fc58db","Name":"Hà Đông","RoomNumber":10,"HouseNumber":5},{"_id":"5edbc393633a4d52a5fc58da","Name":"Cầu Giấy","RoomNumber":10,"HouseNumber":5},{"_id":"5edbc393633a4d52a5fc58da","Name":"Cầu Giấy","RoomNumber":10,"HouseNumber":5},{"_id":"5edbc393633a4d52a5fc58da","Name":"Cầu Giấy","RoomNumber":10,"HouseNumber":5}],
            houses: [],
        };
        this.districtService = new DistrictService();
        this.roomService = new RoomService();
    }
    callApi = () => {
        this.districtService.getList().then((res) => {
            this.setState({districts: res})
        });
        this.roomService.getList().then((res) => {
            this.setState({rooms: res})
        })
    }
    componentDidMount = (): void => {
        // this.districtService.getList().then((res) => {
        //     this.setState({districts: res})
        // })
        // this.callApi();
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.districtTitle}>Danh sách các quận</Text>
                    <FlatList
                        data={this.state.districts}
                        keyExtractor={this._keyExtractor}     //has to be unique
                        renderItem={({item}) => this.renderDistrict(item)} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={3}
                    />
                    <Text style={styles.roomTitle}>Danh sách các phòng Hot</Text>
                    <FlatList
                        data={this.state.rooms}
                        keyExtractor={this._keyExtractor}     //has to be unique
                        renderItem={({item}) => this.renderRoom(item)} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={3}
                    />
                </View>
            </ScrollView>
        )
    }

    renderDistrict = (item) => {
        return (
            <TouchableOpacity
                key={item._id}
                style={styles.item}
                onPress={() => {}}
            >
                <ImageBackground
                    style={styles.itemIcon}
                    source={{
                        uri: 'https://live.staticflickr.com/65535/49999422362_3ed48af520_o.jpg',
                    }}
                >
                    <Text style={styles.itemTitle}>
                        {item.Name}
                    </Text>
                </ImageBackground>

            </TouchableOpacity>
        )
    }

    renderRoom = (item) => {
        return (
            <TouchableOpacity
                key={item._id}
                style={styles.room}
                onPress={() => {}}
            >
                <ImageBackground
                    // imageStyle={roomIcon}
                    style={styles.roomText}
                    imageStyle={styles.roomIcon}
                    source={{
                        uri: 'https://live.staticflickr.com/65535/49999422362_3ed48af520_o.jpg',
                    }}
                >
                    <Text style={styles.itemTitle}>
                        {item.Name}
                    </Text>
                </ImageBackground>
                <View>
                    <Text style={styles.descriptionRoom}>{item.Name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        width: (Dimensions.get('window').width - 20) * 1/3,
        height: (Dimensions.get('window').width - 20) * 1/3,
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 3,
        padding: 2,
        margin: 3,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
    },
    itemIcon: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemTitle: {
        marginTop: '70%',
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
    },
    districtTitle: {
        color: "#352ef5",
        fontSize: 18,
        fontWeight: "bold",
    },
    roomTitle: {
        color: "#352ef5",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 30
    },
    room: {
        width: (Dimensions.get('window').width - 10) * 0.5,
        height: (Dimensions.get('window').width + 150) * 0.5,
        flexGrow: 2,
        // padding: 2,
        margin: 3,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: '10px',
    },
    roomIcon: {
        width: (Dimensions.get('window').width - 10) * 0.5,
        height: (Dimensions.get('window').width - 10) * 0.5,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: '10px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roomText: {
        // textAlign: 'center'
    },
    descriptionRoom: {
        marginTop: '20%'
        // fontSize: ;
    }
});