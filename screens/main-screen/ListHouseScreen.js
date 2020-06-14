import {
    Button, View, Text, ScrollView, FlatList,
    TouchableOpacity, Dimensions, StyleSheet,
    ImageBackground
} from "react-native";
import React from "react";
import {RouterPath} from "../../constants/Router";
import {makePriceString} from "../../constants/Helper";

export default class ListHouseScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            houses: [
                {
                    "_id": "5edbc4a5633a4d52a5fc58dd",
                    "DistrictId": "5edbc393633a4d52a5fc58d9",
                    "Name": "Nhà số 17 ngõ 38 Ngô Sỹ Liên",
                    "RoomNumber": 11,
                    "Address": "Nhà số 17 ngõ 38 Ngô Sỹ Liên, Văn Miếu, Đống Đa",
                    "HostId": "5edd81588582ed2f9cf244d7",
                    "PriceFrom": 2000000,
                    "PriceTo": 3800000,
                    "AvatarId": "5ee5b8678b3cb4961fe674c9",
                    "AvatarUrl": "https://live.staticflickr.com/65535/49976872231_274943d9d1_o.jpg",
                    "Host": {
                        "_id": "5edd81588582ed2f9cf244d7",
                        "Name": "A.Sơn",
                        "Phone": "0969110464"
                    }
                },
                {
                    "_id": "5edbc4a5633a4d52a5fc58dd1",
                    "DistrictId": "5edbc393633a4d52a5fc58d9",
                    "Name": "Nhà số 17 ngõ 38 Ngô Sỹ Liên",
                    "RoomNumber": 11,
                    "Address": "Nhà số 17 ngõ 38 Ngô Sỹ Liên, Văn Miếu, Đống Đa",
                    "HostId": "5edd81588582ed2f9cf244d7",
                    "PriceFrom": 2000000,
                    "PriceTo": 3800000,
                    "AvatarId": "5ee5b8678b3cb4961fe674c9",
                    "AvatarUrl": "https://live.staticflickr.com/65535/49976872231_274943d9d1_o.jpg",
                    "Host": {
                        "_id": "5edd81588582ed2f9cf244d7",
                        "Name": "A.Sơn",
                        "Phone": "0969110464"
                    }
                }
            ]
        }
    }

    componentDidMount = (): void => {
        const {district} = this.props.route.params
        // this.setState({
        //     ...this.state,
        //     houses: [{
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
        //     }]
        // })
    }

    render(): React.ReactNode {
        console.log(this.props);
        const {district} = this.props.route.params;
        const {navigation} = this.props;
        return (
            <ScrollView>
                <Text style={styles.districtName}>{district.Name}</Text>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.houses}
                        keyExtractor={(item) => item._id}     //has to be unique
                        renderItem={({item}) => this.renderHouses(item)} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={1}
                    />
                </View>
            </ScrollView>
        )
    }

    renderHouses = (item) => {
        return (
            <View style={styles.container}>
                    <TouchableOpacity
                        key={item._id}
                        style={styles.container}
                        onPress={() => {this.props.navigation.navigate(RouterPath.HOUSE_DETAIL_SCREEN, {
                            house: item
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
