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

export default class HouseDetailScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            rooms: [
                {
                    "Facilities": [
                        "5edbc90f633a4d52a5fc58eb",
                        "5edbc90f633a4d52a5fc58ec"
                    ],
                    "Images": [
                        "5edbce16633a4d52a5fc5904",
                        "5edbce16633a4d52a5fc5903",
                        "5edbce16633a4d52a5fc5905"
                    ],
                    "_id": "5edbce9d633a4d52a5fc5907",
                    "HouseId": "5edbc4a5633a4d52a5fc58dd",
                    "Name": "Phòng nhỏ",
                    "Square": 20,
                    "AvatarId": "5edbce16633a4d52a5fc5903",
                    "PriceFrom": 1800000,
                    "PriceTo": 2000000,
                    "ImageUrls": [
                        {
                            "_id": "5edbce16633a4d52a5fc5903",
                            "Url": "https://live.staticflickr.com/65535/49977135083_8150d5899d_o.jpg"
                        },
                        {
                            "_id": "5edbce16633a4d52a5fc5904",
                            "Url": "https://live.staticflickr.com/65535/49977135898_8f22f4d123_o.jpg"
                        },
                        {
                            "_id": "5edbce16633a4d52a5fc5905",
                            "Url": "https://live.staticflickr.com/65535/49977915317_eb40db6b20_o.jpg"
                        }
                    ],
                    "AvatarUrl": "https://live.staticflickr.com/65535/49977135083_8150d5899d_o.jpg"
                },
                {
                    "Facilities": [
                        "5edbc90f633a4d52a5fc58e7",
                        "5edbc90f633a4d52a5fc58e8",
                        "5edbc90f633a4d52a5fc58e9",
                        "5edbc90f633a4d52a5fc58eb",
                        "5edbc90f633a4d52a5fc58ea",
                        "5edbc90f633a4d52a5fc58ec"
                    ],
                    "Images": [
                        "5edbcd7e633a4d52a5fc58fe",
                        "5edbcd7e633a4d52a5fc58ff",
                        "5edbcd7e633a4d52a5fc5900",
                        "5edbcd7e633a4d52a5fc5901",
                        "5edbcd7e633a4d52a5fc5902"
                    ],
                    "_id": "5edbce9d633a4d52a5fc5906",
                    "HouseId": "5edbc4a5633a4d52a5fc58dd",
                    "Name": "Phòng full đồ",
                    "Square": 20,
                    "AvatarId": "5ee5b8678b3cb4961fe674c9",
                    "PriceFrom": 3500000,
                    "PriceTo": 3800000,
                    "ImageUrls": [
                        {
                            "_id": "5edbcd7e633a4d52a5fc58fe",
                            "Url": "https://live.staticflickr.com/65535/49977139892_9640f4c127_k.jpg"
                        },
                        {
                            "_id": "5edbcd7e633a4d52a5fc58ff",
                            "Url": "https://live.staticflickr.com/65535/49977140202_3e6bfbe948_k.jpg"
                        },
                        {
                            "_id": "5edbcd7e633a4d52a5fc5900",
                            "Url": "https://live.staticflickr.com/65535/49977140097_55ab88a0c7_k.jpg"
                        },
                        {
                            "_id": "5edbcd7e633a4d52a5fc5901",
                            "Url": "https://live.staticflickr.com/65535/49977139412_04ac207104_k.jpg"
                        },
                        {
                            "_id": "5edbcd7e633a4d52a5fc5902",
                            "Url": "https://live.staticflickr.com/65535/49977137872_c3f524e2cb_k.jpg"
                        }
                    ],
                    "AvatarUrl": "https://live.staticflickr.com/65535/49976872231_274943d9d1_o.jpg"
                }
            ],
            isShowImageZoom: false
        }
    }

    componentDidMount = (): void => {
        // this.setState({
        //     ...this.state,
        //     rooms: [{
        //         "_id": "5edbc393633a4d52a5fc58d9",
        //         "Name": "Đống Đa",
        //         "RoomNumber": 10,
        //         "HouseNumber": 5,
        //         "ImageId": "5ee3ac351577dd2b3f853215"
        //     }, {
        //         "_id": "5edbc393633a4d52a5fc58dc",
        //         "Name": "Thanh Xuân",
        //         "RoomNumber": 10,
        //         "HouseNumber": 5
        //     }, {
        //         "_id": "5edbc393633a4d52a5fc58db",
        //         "Name": "Hà Đông",
        //         "RoomNumber": 10,
        //         "HouseNumber": 5
        //     }, {
        //         "_id": "5edbc393633a4d52a5fc58da",
        //         "Name": "Cầu Giấy",
        //         "RoomNumber": 10,
        //         "HouseNumber": 5
        //     }, {
        //         "_id": "5edbc393633a4d52a5fc58da",
        //         "Name": "Cầu Giấy",
        //         "RoomNumber": 10,
        //         "HouseNumber": 5
        //     }, {"_id": "5edbc393633a4d52a5fc58da", "Name": "Cầu Giấy", "RoomNumber": 10, "HouseNumber": 5}]
        // })
    }

    render(): React.ReactNode {
        console.log(this.props);
        const {house} = this.props.route.params;
        const {navigation} = this.props;
        const {isShowImageZoom, rooms} = this.state;
        const images = [{
            url: 'https://live.staticflickr.com/65535/49976872231_274943d9d1_o.jpg',
        },{
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
            }];
        return (
            <ScrollView>
                <Text style={styles.districtName}>{house.Name}</Text>
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
                        <Text style={styles.priceTitle}>{'Giá: '+ item.PriceFrom + ' - ' + item.PriceTo}</Text>
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
        color: "blue",
        fontSize: 18,
        fontWeight: "bold",
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
