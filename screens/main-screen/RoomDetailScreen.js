import {
    Button, View, Text, ScrollView, FlatList,
    TouchableOpacity, Dimensions, StyleSheet,
    ImageBackground, Clipboard, TextInput
} from "react-native";
import React from "react";
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {EvilIcons, Ionicons} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {Linking} from 'react-native'
import TabBarIcon from "../../components/TabBarIcon";
import {formatNumber, makeHostTitle, makePriceInVND, makePriceString, makeSquareString} from "../../constants/Helper";
import {FacilityType} from "../../constants/Constant";
let propRooms = {};

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
                <View style={styles.wrapBack}>
                    <TouchableOpacity style={styles.BackButton} onPress={this.goBack}>
                        <Ionicons name="ios-arrow-round-back" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.roomHead}>{'Chi tiết phòng'}</Text>
                    <Text style={styles.BackButton}></Text>
                </View>
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
                                    <View style={styles.closeIcon}>
                                        <TabBarIcon name={'ios-close-circle'} focused={true}/>
                                    </View>
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
                    <Text style={styles.priceTitle}>{'Giá: '+ makePriceInVND(room.PriceFrom)}</Text>
                    <Text style={styles.squareTitle}>{'Diện tích: '+ makeSquareString(room.Square)}</Text>
                </View>
                <View style={styles.priceSquare}>
                    <View style={styles.left}>
                        <Text >{'Điện'}</Text>
                        <TabBarIcon name={'ios-bulb'} focused={true} size={30}/>
                        <Text >{makePriceString(room.ElectricPrice)}</Text>
                    </View>
                    <View style={styles.left}>
                        <Text >{'Nước'}</Text>
                        <TabBarIcon name={'ios-water'} focused={true} size={30}/>
                        <Text >{makePriceString(room.WaterPrice)}</Text>
                    </View>
                    <View style={styles.left}>
                        <Text >{'Internet'}</Text>
                        <TabBarIcon name={'ios-wifi'} focused={true} size={30}/>
                        <Text >{makePriceString(room.InternetPrice)}</Text>
                    </View>
                </View>

                <View style={styles.facility}>
                    <Text style={{fontSize: 20, 'marginBottom': 20}}>{'Tiện ích'}</Text>
                    <FlatList
                        data={room.Facilities}
                        keyExtractor={(item) => item + ' facilityId'}     //has to be unique
                        renderItem={({item}) => this.renderFacilities(item)} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={4}
                    />
                </View>
                <View style={{'marginTop': 30}}>
                    <Text style={{fontSize: 20, 'marginBottom': 20}}>{'Địa chỉ'}</Text>
                    <EvilIcons name="location" size={24} color="black" />
                    <Text>{house.Address}</Text>
                    <TouchableOpacity onPress={() => this.makeCall(house.Host)}>
                        <FontAwesome style={{'marginTop': 30}} name="phone" size={24} color="black" />
                        <Text>{house.Host ? makeHostTitle(house.Host) : '-'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{'marginTop': 30}}>
                    <Text style={{fontSize: 20, 'marginBottom': 10}}>{'Mô tả'}</Text>
                    <TouchableOpacity onPress={() => Clipboard.setString(room.Description)}>
                        <View>
                            <Text>
                                {room.Description}
                            </Text>
                            <Button title={'Sao chép mô tả'} onPress={Clipboard.setString(room.Description)}/>
                        </View>
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
    goBack = () => {
        this.props.navigation.goBack();
    }

    renderFacilities = (type) => {
        switch (type) {
            case FacilityType.BED:
                return <View style={styles.facilityWrapper}>
                    <ImageBackground  source={require('../../assets/images/bed.png')}
                                      style={styles.facilityItem}/>
                                      <Text style={styles.facilityText}>{'Giường'}</Text>
                </View>
                break;
            case FacilityType.AIR_CONDITION:
                return <View style={styles.facilityWrapper}>
                    <ImageBackground  source={require('../../assets/images/air.png')}
                                      style={styles.facilityItem}/>
                    <Text style={styles.facilityText}>{'Điều hòa'}</Text>
                </View>
                break;
            case FacilityType.HEATER:
                return <View style={styles.facilityWrapper}>
                    <ImageBackground  source={require('../../assets/images/heater.png')}
                                      style={styles.facilityItem}/>
                    <Text style={styles.facilityText}>{'Nóng lạnh'}</Text>
                </View>
                break;
            case FacilityType.KEY:
                return <View style={styles.facilityWrapper}>
                    <ImageBackground  source={require('../../assets/images/house-key.png')}
                                      style={styles.facilityItem}/>
                    <Text style={styles.facilityText}>{'Không chung chủ'}</Text>
                </View>
                break;
            case FacilityType.MOTOR:
                return <View style={styles.facilityWrapper}>
                    <ImageBackground  source={require('../../assets/images/motor.png')}
                                      style={styles.facilityItem}/>
                    <Text style={styles.facilityText}>{'Để xe'}</Text>
                </View>
                break;
            case FacilityType.WARDROBE:
                return <View style={styles.facilityWrapper}>
                    <ImageBackground  source={require('../../assets/images/wardrobe.png')}
                                      style={styles.facilityItem}/>
                    <Text style={styles.facilityText}>{'Tủ quần áo'}</Text>
                </View>
                break;
            case FacilityType.WASH:
                return <View style={styles.facilityWrapper}>
                    <ImageBackground  source={require('../../assets/images/wash-machine.png')}
                                      style={styles.facilityItem}/>
                    <Text style={styles.facilityText}>{'Máy giặt'}</Text>
                </View>

                break;
            case FacilityType.WINDOW:
                return <View style={styles.facilityWrapper}>
                    <ImageBackground  source={require('../../assets/images/window.png')}
                                      style={styles.facilityItem}/>
                    <Text style={styles.facilityText}>{'Cửa sổ'}</Text>
                </View>
                break;
            case FacilityType.KITCHEN_CABINET:
                return <View style={styles.facilityWrapper}>
                    <ImageBackground  source={require('../../assets/images/kitchen-cabinet.png')}
                                      style={styles.facilityItem}/>
                    <Text style={styles.facilityText}>{'Tủ bếp'}</Text>
                </View>
                break;
            case FacilityType.MAKEUP_TABLE:
                return <View style={styles.facilityWrapper}>
                    <ImageBackground  source={require('../../assets/images/makeup-table1.png')}
                                      style={styles.facilityItem}/>
                    <Text style={styles.facilityText}>{'Bàn trang điểm'}</Text>
                </View>
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
        margin: 1
    },
    itemTitle: {
        marginTop: '70%',
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    descriptionRoom: {},
    roomHead: {
        fontSize: 18,
        color: '#ac897e',
        width: '80%',
        textAlign: 'center'
    },
    roomName: {
        fontSize: 30,
        color: '#6D4C41',
    },
    houseName: {
        fontSize: 20,
        color: '#5D4037'
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
        fontSize: 20,
        color: '#F06292',
        marginBottom: 10
    },
    squareTitle: {
        width: '50%',
        textAlign: 'center',
        fontSize: 20,
        color: '#F06292'
    },
    priceSquare: {
        flexDirection: 'row',
        flex: 2,
        borderBottomColor: '#D7CCC8',
        borderBottomWidth: 1,
        marginBottom: 10,
        borderRadius: 10
    },
    left: {
        width: (Dimensions.get('window').width - 10) * 1/3,
        alignItems: 'center',
        marginBottom: 10
    },
    right: {
        width: (Dimensions.get('window').width - 10) * 1/3,
        alignItems: 'center'
    },
    facilityItem: {
        width: (Dimensions.get('window').width -100) * 1/5,
        height: (Dimensions.get('window').width - 100) * 1/5,
        alignItems: 'center',
        flexGrow: 3,
        marginTop: 5,
        fontSize: 10,
        // backgroundColor: 'red'
    },
    facilityWrapper: {
        width: (Dimensions.get('window').width -100) * 1/4,
        height: (Dimensions.get('window').width - 70) * 1/4,
        alignItems: 'center',
        flexGrow: 3,
        fontSize: 10,
        // backgroundColor: 'blue'
    },
    facilityText: {
        fontSize: 10,
        textAlign: 'center'
    },
    margin10: {
        margin: 10
    },
    facility: {
        marginTop: 20,
        borderBottomColor: '#D7CCC8',
        borderBottomWidth: 1,
        marginBottom: 10,
        borderRadius: 10,
        paddingBottom: 15
    },
    wrapBack: {
        flex: 1,
        flexDirection: 'row'
    },
});
