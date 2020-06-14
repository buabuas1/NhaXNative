import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {StyleSheet,FlatList, Text, View, Button, Image, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {RouterPath} from "../../constants/Router";
import DistrictService from "../../services/district.service";
import RoomService from "../../services/room.service";
const roomWidth = 6;
const roomHeight = 4;
export default class MainHouseScreen extends React.Component {
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
            <View>
                <View style={styles.container}>
                    <Text style={styles.districtTitle}>{'Danh sách các quận'}</Text>
                    <FlatList
                        data={this.state.districts}
                        keyExtractor={(item) => item._id}     //has to be unique
                        renderItem={({item}) => this.renderDistrict(item)} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={3}
                    />
                    <Text style={styles.roomTitle}>{'Danh sách các phòng Hot'}</Text>
                    <FlatList
                        data={this.state.rooms}
                        keyExtractor={(item) => item._id}     //has to be unique
                        renderItem={({item}) => this.renderRoom(item)} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={3}
                    />
                </View>
            </View>
        )
    }

    renderDistrict = (item) => {
        return (
            <TouchableOpacity
                key={item._id}
                style={styles.item}
                onPress={() => {this.props.navigation.navigate(RouterPath.LIST_HOUSE_SCREEN, {
                    district: item
                })}}
            >
                <ImageBackground
                    style={styles.itemIcon}
                    imageStyle={styles.itemIcon}
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
                onPress={() => {this.props.navigation.navigate(RouterPath.HOUSE_DETAIL_SCREEN, {
                    house: item
                })}}
            >
                <ImageBackground
                    // imageStyle={roomIcon}
                    style={styles.roomText}
                    imageStyle={styles.roomIcon}
                    source={{
                        uri: 'https://live.staticflickr.com/65535/49999422362_3ed48af520_o.jpg',
                    }}
                >
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
        // flex: 1,
        // flexDirection: 'row',
        height: 30,
        marginTop: 10
    },
    roomTitle: {
        color: "#352ef5",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 30
    },
    room: {
        width: (Dimensions.get('window').width - 10) * 0.5,
        height: (Dimensions.get('window').width * 2) * 0.5 * roomHeight / roomWidth,
        flexGrow: 2,
        // padding: 2,
        margin: 3,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
    },
    roomIcon: {
        width: (Dimensions.get('window').width - 10) * 0.5,
        height: (Dimensions.get('window').width - 10) * 0.5 * roomHeight / roomWidth,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
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