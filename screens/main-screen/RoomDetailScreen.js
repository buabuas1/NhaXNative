import {
    Button, View, Text, ScrollView, FlatList,
    TouchableOpacity, Dimensions, StyleSheet,
    ImageBackground
} from "react-native";
import React from "react";
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Linking} from 'react-native'
import TabBarIcon from "../../components/TabBarIcon";
import {formatNumber, makeHostTitle, makePriceString, makeSquareString} from "../../constants/Helper";
import {FacilityType} from "../../constants/Constant";
let propRooms = {};
const images = [{
    // Simplest usage.
    url: '"https://live.staticflickr.com/65535/49977139892_9640f4c127_k.jpg"',

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    props: {
        // headers: ...
    }
},
    {
        url: 'https://live.staticflickr.com/65535/49977140202_3e6bfbe948_k.jpg',
    },
    {
        url: 'https://live.staticflickr.com/65535/49977140097_55ab88a0c7_k.jpg',
    },
    {
        url: 'https://live.staticflickr.com/65535/49977139412_04ac207104_k.jpg',
    },
    {
        url: 'https://live.staticflickr.com/65535/49977137872_c3f524e2cb_k.jpg',
    }
]

export default class RoomDetailScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowImageZoom: false,
            index: 0
        }
    }

    componentDidMount = (): void => {
    }

    render(): React.ReactNode {
        console.log(this.props);
        const {room, house} = this.props.route.params;
        propRooms = room;
        const {navigation} = this.props;
        const {isShowImageZoom, index} = this.state;
        const images = room && room.ImageUrls && room.ImageUrls.map((i) => {return {url: i.Url}});
        return (
            <ScrollView>
                <View style={styles.container}>
                    <FlatList
                        data={room.ImageUrls}
                        keyExtractor={(item) => item._id}     //has to be unique
                        renderItem={({item}) => this.renderRoom(item)} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={2}
                    />

                </View>
                <View style={styles.margin10}>
                    <Text style={styles.roomName}>{room.Name}</Text>
                    <Text style={styles.houseName}>{house.Name}</Text>
                    {this.makeRoomInfo(room, house)}
                    <View style={styles.MainContainer}>
                        <Modal
                            visible={isShowImageZoom}
                            transparent={false}>
                            <View style={styles.closeIC}>
                                <TouchableOpacity onPress={this.closeImageZoom}>
                                    <View style={styles.closeIcon}><TabBarIcon name={'ios-close-circle'}
                                                                               focused={true}></TabBarIcon></View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.fullScreen}>
                                <ImageViewer onCancel={() => {
                                    this.closeImageZoom()
                                }} enableSwipeDown={true} imageUrls={images} index={index}/>
                            </View>
                        </Modal>
                    </View>
                </View>
            </ScrollView>

        )
    }

    makeCall = (host) => {
        Linking.openURL(`tel:${host.Phone}`);
    }

    makeRoomInfo = (room, house) => {
        return (
            <View style={{'marginTop': 30}}>
                <View style={styles.priceSquare}>
                    <Text style={styles.priceTitle}>{'Giá: '+ makePriceString(room.PriceFrom, room.PriceTo)}</Text>
                    <Text style={styles.squareTitle}>{'Diện tích: '+ makeSquareString(room.Square)}</Text>
                </View>
                <View style={styles.priceSquare}>
                    <View style={styles.left}>
                        <TabBarIcon name={'ios-water'} focused={true}/>
                        <Text >{'4k'}</Text>
                    </View>
                    <View style={styles.right}>
                        <TabBarIcon name={'ios-bulb'} focused={true}/>
                        <Text >{'4k'}</Text>
                    </View>
                </View>

                <View style={{'marginTop': 30}}>
                    <Text style={{fontSize: 20}}>{'Tiện ích'}</Text>
                    <FlatList
                        data={room.ImageUrls}
                        keyExtractor={(item) => item._id}     //has to be unique
                        renderItem={({item}) => this.renderFacilities(item)} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={4}
                    />
                </View>
                <View style={{'marginTop': 30}}>
                    <Text style={{fontSize: 20}}>{'Địa chỉ'}</Text>
                    <EvilIcons name="location" size={24} color="black" />
                    <Text>{house.Address}</Text>
                    <TouchableOpacity onPress={() => this.makeCall(house.Host)}>
                        <FontAwesome style={{'marginTop': 30}} name="phone" size={24} color="black" />
                        <Text>{house.Host ? makeHostTitle(house.Host) : '-'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderRoom = (item) => {
        return (
            <TouchableOpacity
                key={item._id}
                style={styles.url}
                onPress={() => this.showImageZoom(item._id)}
            >
                {/*<Text>{item.Name}</Text>*/}
                <ImageBackground
                    style={styles.itemIcon}
                    source={{
                        uri: item.Url,
                    }}
                >
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    closeImageZoom = () => {
        this.setState({
            isShowImageZoom: false
        })
    }

    showImageZoom = (id) => {
        const index = propRooms.ImageUrls ? propRooms.ImageUrls.findIndex(i => i._id === id) : 0
        this.setState({
            isShowImageZoom: true,
            index: index
        })
    }

    renderFacilities = (item) => {
        switch (item.Type) {
            case FacilityType.BED:
                return <ImageBackground  source={require('../../assets/images/bed.png')}
                                         style={styles.facilityItem}/>
                break;
            case FacilityType.AIR_CONDITION:
                return <ImageBackground  source={require('../../assets/images/air.png')}
                                         style={styles.facilityItem}/>
                break;
            case FacilityType.HEATER:
                return <ImageBackground  source={require('../../assets/images/heater.png')}
                                         style={styles.facilityItem}/>
                break;
            case FacilityType.KEY:
                return <ImageBackground  source={require('../../assets/images/house-key.png')}
                                         style={styles.facilityItem}/>
                break;
            case FacilityType.MOTOR:
                return <ImageBackground  source={require('../../assets/images/motor.png')}
                                         style={styles.facilityItem}/>
                break;
            case FacilityType.WARDROBE:
                return <ImageBackground  source={require('../../assets/images/wardrobe.png')}
                                         style={styles.facilityItem}/>
                break;
            case FacilityType.WASH:
                return <ImageBackground  source={require('../../assets/images/wash-machine.png')}
                                         style={styles.facilityItem}/>
                break;
            case FacilityType.WIFI:
                return <ImageBackground  source={require('../../assets/images/wifi.png')}
                                         style={styles.facilityItem}/>
                break;
            case FacilityType.WINDOW:
                return <ImageBackground  source={require('../../assets/images/window.png')}
                                         style={styles.facilityItem}/>
                break;
            default:
                return <ImageBackground  source={require('../../assets/images/air.png')}
                                         style={styles.facilityItem}/>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        width: (Dimensions.get('window').width) * 0.5,
        height: (Dimensions.get('window').width) * 0.5 * 9 / 16,
        flexGrow: 2,
        margin: 1,
    },
    itemIcon: {
        width: (Dimensions.get('window').width) * 0.5,
        height: (Dimensions.get('window').width) * 0.5 * 9 / 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemTitle: {
        marginTop: '70%',
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    descriptionRoom: {},
    roomName: {
        fontSize: 30,
        fontWeight: "bold",
    },
    houseName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    closeIcon: {
        // alignItems: 'right'
        width: '100%',
        flexDirection: 'row-reverse',
        // alignItems: 'flex-end'
    },
    closeIC: {
        width: '100%',
        position: 'absolute',
        zIndex: 100,
        flex: 1,
        flexDirection: 'row-reverse',
        marginRight: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    fullScreen: {
        width: '100%',
        height: '100%',
        backgroundColor: 'blue'
    },
    priceTitle: {
        width: '50%',
        textAlign: 'center',
        // flex: 2
    },
    squareTitle: {
        width: '50%',
        textAlign: 'center',
        // flex: 2
    },
    priceSquare: {
        flexDirection: 'row',
        flex: 2
    },
    left: {
        width: (Dimensions.get('window').width - 10) * .5,
        alignItems: 'center'
    },
    right: {
        width: (Dimensions.get('window').width - 10) * .5,
        alignItems: 'center'
    },
    facilityItem: {
        width: (Dimensions.get('window').width - 100) * .25,
        height: (Dimensions.get('window').width - 100) * .25,
        alignItems: 'center',
        flexGrow: 4,
        // margin: 2
    },
    margin10: {
        margin: 10
    }
});
