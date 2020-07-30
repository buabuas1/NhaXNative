import {
    Button, View, Text, ScrollView, FlatList,
    TouchableOpacity, Dimensions, StyleSheet,
    ImageBackground
} from "react-native";
import React from "react";
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import TabBarIcon from "../../components/TabBarIcon";
import {RouterPath} from "../../constants/Router";
import {makePriceString} from "../../constants/Helper";
import RoomService from "../../services/room.service";
import ToastService from "../../services/toast.service";
import {Ionicons} from "@expo/vector-icons";


export default class HouseDetailScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            rooms: [
            ],
            isShowImageZoom: false
        }
        this.roomService = new RoomService();
        this.toastService = new ToastService();
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    componentDidMount = (): void => {
        const {house} = this.props.route.params;
        this.roomService.getRoomsByHouseId(house._id)
            .then(res => {
                this.setState({
                    rooms: res
                })
            })
            .catch(error => {
                this.toastService.error('Lỗi ' + JSON.stringify(error));
            })
    }

    render(): React.ReactNode {
        const {house} = this.props.route.params;
        const {navigation} = this.props;
        const {isShowImageZoom, rooms} = this.state;
        return (
            <ScrollView>
                <View style={styles.wrapBack}>
                    <TouchableOpacity style={styles.BackButton} onPress={this.goBack}>
                        <Ionicons name="ios-arrow-round-back" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.districtName}>{house.Name}</Text>
                    <Text style={styles.BackButton}></Text>
                </View>

                <View style={styles.container}>
                    <FlatList
                        data={rooms}
                        keyExtractor={(item) => item._id}     //has to be unique
                        renderItem={({item}) => this.renderRoom(item, house)} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={1}
                    />
                </View>
            </ScrollView>

        )
    }

    renderRoom = (item, house) => {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    key={item._id}
                    style={styles.container}
                    onPress={() => {this.props.navigation.navigate(RouterPath.ROOM_DETAIL_SCREEN, {
                        room: item,
                        house: house
                    })}}
                >
                    <ImageBackground
                        imageStyle={styles.itemIcon}
                        style={styles.left}
                        source={{
                            uri: item.AvatarUrl,
                        }}
                    >
                    </ImageBackground>
                    <View style={styles.right}>
                        <Text style={styles.priceTitle}>{'Giá: '+ makePriceString(item.PriceFrom, item.PriceTo)}</Text>
                        <Text style={styles.nameTitle}>{item.Name}</Text>
                        <Text style={styles.addressTitle}>{item.Address}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    closeImageZoom = () => {
        this.setState({
            isShowImageZoom: false
        })
    }

    showImageZoom = () => {
        this.setState({
            isShowImageZoom: true
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        marginTop: 5
    },
    item: {
        // width: (Dimensions.get('window').width - 10) * 0.5,
        // height: (Dimensions.get('window').width + 150) * 0.5,
        flex: 2,
        flexDirection: 'column',
        // flexGrow: 2,
        // padding: 2,
        margin: 3,
        // borderWidth: 1,
        // borderColor: "black",
        // borderRadius: 10,
    },
    itemIcon: {
        borderWidth: 1,
        // borderColor: "black",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemTitle: {
        marginTop: '70%',
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    descriptionRoom: {
    },
    districtName: {
        color: "#03A9F4",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
        width: '80%',
    },
    wrapBack: {
        flex: 1,
        flexDirection: 'row'
    },
    left: {
        // backgroundColor: 'red',
        width: (Dimensions.get('window').width - 10) * 1/3,
        height: (Dimensions.get('window').width - 10) * 1/3,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
    },
    right: {
        // backgroundColor: 'blue',
        width: (Dimensions.get('window').width - 10) * 2/3,
        height: (Dimensions.get('window').width - 10) * 1/3,
        paddingLeft: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    priceTitle: {
        color: 'green',
        marginTop: 10
    },
    nameTitle: {
        color: 'black',
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    addressTitle: {
        color: 'gray',
        marginTop: 10,
        fontSize: 10
    }
});
