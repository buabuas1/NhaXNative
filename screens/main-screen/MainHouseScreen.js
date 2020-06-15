import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {StyleSheet,FlatList, Text, View, Button, Image, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {RouterPath} from "../../constants/Router";
import DistrictService from "../../services/district.service";
import RoomService from "../../services/room.service";
import {makePriceInVND, makePriceString} from "../../constants/Helper";
const roomWidth = 6;
const roomHeight = 4;
export default class MainHouseScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            districts: [
                {
                    "_id": "5edbc393633a4d52a5fc58d9",
                    "Name": "Đống Đa",
                    "RoomNumber": 10,
                    "HouseNumber": 5,
                    "ImageId": "5ee5acb48b3cb4961fe674c4",
                    "ImageUrl": "https://live.staticflickr.com/65535/49998629201_6c136b10ac_o.jpg"
                },
                {
                    "_id": "5edbc393633a4d52a5fc58dc",
                    "Name": "Thanh Xuân",
                    "RoomNumber": 10,
                    "HouseNumber": 5,
                    "ImageId": "5ee5acb48b3cb4961fe674c5",
                    "ImageUrl": "https://live.staticflickr.com/65535/49998629116_a7634e0f43_o.jpg"
                },
                {
                    "_id": "5edbc393633a4d52a5fc58db",
                    "Name": "Hà Đông",
                    "RoomNumber": 10,
                    "HouseNumber": 5,
                    "ImageId": "5ee5acb48b3cb4961fe674c6",
                    "ImageUrl": "https://live.staticflickr.com/65535/50004149582_6b91179faa_o.jpg"
                },
                {
                    "_id": "5edbc393633a4d52a5fc58da",
                    "Name": "Cầu Giấy",
                    "RoomNumber": 10,
                    "HouseNumber": 5,
                    "ImageId": "5ee5acb48b3cb4961fe674c3",
                    "ImageUrl": "https://live.staticflickr.com/65535/49999422362_3ed48af520_o.jpg"
                },
                {
                    "_id": "5ee5995c8b3cb4961fe674c1",
                    "Name": "Bắc Từ Liêm",
                    "RoomNumber": 10,
                    "HouseNumber": 5,
                    "ImageId": "5ee5acb48b3cb4961fe674c7",
                    "ImageUrl": "https://live.staticflickr.com/65535/50003369828_50ccdd51f3_o.jpg"
                },
                {
                    "_id": "5ee5995c8b3cb4961fe674c2",
                    "Name": "Nam Từ Liêm",
                    "RoomNumber": 10,
                    "HouseNumber": 5,
                    "ImageId": "5ee5acb48b3cb4961fe674c8",
                    "ImageUrl": "https://live.staticflickr.com/65535/50003368138_43ffb99b64_o.jpg"
                }
            ],
            rooms: [
                {
                    "_id": "5edbc4a5633a4d52a5fc58dd",
                    "DistrictId": "5edbc393633a4d52a5fc58d9",
                    "Name": "Nhà số 17 ngõ 38 Ngô Sỹ Liên",
                    "RoomNumber": 11,
                    "Address": "Nhà số 17 ngõ 38 Ngô Sỹ Liên, Văn Miếu, Đống Đa",
                    "PriceFrom": 2000000,
                    "PriceTo": 3800000,
                    "AvatarId": "5ee5b8678b3cb4961fe674c9",
                    "AvatarUrl": "https://live.staticflickr.com/65535/49976872231_274943d9d1_o.jpg"
                },
                {
                    "_id": "5edbc4a5633a4d52a5fc58dd1",
                    "DistrictId": "5edbc393633a4d52a5fc58d9",
                    "Name": "Nhà số 17 ngõ 38 Ngô Sỹ Liên",
                    "RoomNumber": 11,
                    "Address": "Nhà số 17 ngõ 38 Ngô Sỹ Liên, Văn Miếu, Đống Đa",
                    "PriceFrom": 2000000,
                    "PriceTo": 3800000,
                    "AvatarId": "5ee5b8678b3cb4961fe674c9",
                    "AvatarUrl": "https://live.staticflickr.com/65535/49976872231_274943d9d1_o.jpg"
                },
                {
                    "_id": "5edbc4a5633a4d52a5fc58dd12",
                    "DistrictId": "5edbc393633a4d52a5fc58d9",
                    "Name": "Nhà số 17 ngõ 38 Ngô Sỹ Liên",
                    "RoomNumber": 11,
                    "Address": "Nhà số 17 ngõ 38 Ngô Sỹ Liên, Văn Miếu, Đống Đa",
                    "PriceFrom": 2000000,
                    "PriceTo": 3800000,
                    "AvatarId": "5ee5b8678b3cb4961fe674c9",
                    "AvatarUrl": "https://live.staticflickr.com/65535/49976872231_274943d9d1_o.jpg"
                },
                {
                    "_id": "22fffff",
                    "DistrictId": "5edbc393633a4d52a5fc58d9",
                    "Name": "Nhà số 17 ngõ 38 Ngô Sỹ Liên",
                    "RoomNumber": 11,
                    "Address": "Nhà số 17 ngõ 38 Ngô Sỹ Liên, Văn Miếu, Đống Đa",
                    "PriceFrom": 2000000,
                    "PriceTo": 3800000,
                    "AvatarId": "5ee5b8678b3cb4961fe674c9",
                    "AvatarUrl": "https://live.staticflickr.com/65535/49976872231_274943d9d1_o.jpg"
                }
            ],
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
                    <Text style={styles.districtTitle}>{'Danh sách các quận'}</Text>
                    <FlatList
                        data={this.state.districts}
                        keyExtractor={(item) => item._id}     //has to be unique
                        renderItem={({item}) => this.renderDistrict(item)} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={3}
                    />
                    <Text style={styles.roomTitle}>{'Danh sách các phòng Hot'}</Text>
                    <Image source={require('../../assets/images/hot-icon.gif')}
                    style={{width: 40, height: 40}}/>
                    <FlatList
                        data={this.state.rooms}
                        keyExtractor={(item) => item._id}     //has to be unique
                        renderItem={({item}) => this.renderRoom(item)} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={2}
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
                onPress={() => {this.props.navigation.navigate(RouterPath.LIST_HOUSE_SCREEN, {
                    district: item
                })}}
            >
                <ImageBackground
                    style={styles.itemIcon}
                    imageStyle={styles.itemIcon}
                    source={{
                        uri: item.ImageUrl,
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
                        uri: item.AvatarUrl,
                    }}
                >
                </ImageBackground>
                <View style={{marginLeft: 10}}>
                    <View>
                        <Text style={styles.priceTitle}>{'Giá: ' + makePriceInVND(1500000)}</Text>
                    </View>
                    <View>
                        <Text style={styles.nameTitle}>{item.Name}</Text>
                    </View>
                    <View>
                        <Text style={styles.addressTitle}>{item.Address}</Text>
                    </View>
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
    },
    itemIcon: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemTitle: {
        marginTop: '70%',
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center',
    },
    districtTitle: {
        color: "#5D4037",
        fontSize: 18,
        fontWeight: "bold",
        // flex: 1,
        // flexDirection: 'row',
        height: 30,
        margin: 10
    },
    roomTitle: {
        color: "#5D4037",
        fontSize: 18,
        fontWeight: "bold",
        margin: 10,
        marginTop: 20
    },
    room: {
        width: (Dimensions.get('window').width - 10) * 0.5,
        height: (Dimensions.get('window').width * 1.8) * 0.5 * roomHeight / roomWidth,
        flexGrow: 2,
        // padding: 2,
        margin: 3,
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
    priceTitle: {
        marginTop: '70%',
        color: '#F06292',
        textAlign: 'right',
        paddingBottom: 5
    },
    nameTitle: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
        paddingBottom: 5
    },
    addressTitle: {
        color: '#6D4C41',
        fontSize: 12
    }
});