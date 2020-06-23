import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import {StyleSheet,FlatList, Text, View, Button, Image, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {RouterPath} from "../../constants/Router";
import DistrictService from "../../services/district.service";
import TrendingRoomService from "../../services/trending-room.service";
import {makePriceInVND, makePriceString} from "../../constants/Helper";
const roomWidth = 6;
const roomHeight = 4;
export default class MainHouseScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            districts: [
            ],
            rooms: [
            ],
            houses: [],
            isShowReload: false
        };
        this.districtService = new DistrictService();
        this.trendingRoomService = new TrendingRoomService();
    }
    callApi = () => {
        this.districtService.getList().then((res) => {
            this.setState({districts: res})
            if (!res || res.length == 0) {
                this.setState({
                    isShowReload: true
                });
            }
        });
        this.trendingRoomService.getList().then((res) => {
            this.setState({rooms: res})
        })

    }
    componentDidMount = (): void => {
        // this.districtService.getList().then((res) => {
        //     this.setState({districts: res})
        // })
        this.callApi();
    }

    render() {
        let {isShowReload} = this.state;
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
                {isShowReload && <TouchableOpacity style={styles.reloadIcon} onPress={this.callApi}>
                    <MaterialCommunityIcons name="reload" size={80} color="black"/>
                </TouchableOpacity>}
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
                onPress={() => {this.props.navigation.navigate(RouterPath.ROOM_DETAIL_SCREEN, {
                    room: item,
                    house: item.House
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
                        <Text style={styles.priceTitle}>{'Giá: ' + makePriceInVND(item.PriceFrom)}</Text>
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
    },
    reloadIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});