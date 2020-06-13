import {
    Button, View, Text, ScrollView, FlatList,
    TouchableOpacity, Dimensions, StyleSheet,
    ImageBackground
} from "react-native";
import React from "react";
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import TabBarIcon from "../../components/TabBarIcon";

const images = [{
    // Simplest usage.
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    props: {
        // headers: ...
    }
}]

export default class HouseDetailScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            rooms: [],
            isShowImageZoom: false
        }
    }

    componentDidMount = (): void => {
        this.setState({
            ...this.state,
            rooms: [{
                "_id": "5edbc393633a4d52a5fc58d9",
                "Name": "Đống Đa",
                "RoomNumber": 10,
                "HouseNumber": 5,
                "ImageId": "5ee3ac351577dd2b3f853215"
            }, {
                "_id": "5edbc393633a4d52a5fc58dc",
                "Name": "Thanh Xuân",
                "RoomNumber": 10,
                "HouseNumber": 5
            }, {
                "_id": "5edbc393633a4d52a5fc58db",
                "Name": "Hà Đông",
                "RoomNumber": 10,
                "HouseNumber": 5
            }, {
                "_id": "5edbc393633a4d52a5fc58da",
                "Name": "Cầu Giấy",
                "RoomNumber": 10,
                "HouseNumber": 5
            }, {
                "_id": "5edbc393633a4d52a5fc58da",
                "Name": "Cầu Giấy",
                "RoomNumber": 10,
                "HouseNumber": 5
            }, {"_id": "5edbc393633a4d52a5fc58da", "Name": "Cầu Giấy", "RoomNumber": 10, "HouseNumber": 5}]
        })
    }

    render(): React.ReactNode {
        console.log(this.props);
        const {house} = this.props.route.params;
        const {navigation} = this.props;
        const {isShowImageZoom} = this.state;
        const images = [{url: 'https://live.staticflickr.com/65535/49999422362_3ed48af520_o.jpg'},
            {url: 'https://live.staticflickr.com/65535/49999422362_3ed48af520_o.jpg'},
            {url: 'https://live.staticflickr.com/65535/49999422362_3ed48af520_o.jpg'}];
        return (
            <ScrollView>
                <Text style={styles.houseName}>{house.Name}</Text>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.rooms}
                        keyExtractor={(item) => item._id}     //has to be unique
                        renderItem={({item}) => this.renderRoom(item)} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={3}
                    />

                </View>
                <Text style={styles.houseName}>{'house.Name'}</Text>
                <View style={styles.MainContainer}>
                    <Modal
                        visible={isShowImageZoom}
                        transparent={false}>
                        <TouchableOpacity  onPress={this.closeImageZoom}>
                            <View style={styles.closeIcon}><TabBarIcon  name={'ios-close-circle'}
                                               focused={true}></TabBarIcon></View>
                        </TouchableOpacity>


                        <ImageViewer onCancel={() => {this.closeImageZoom()}}
                                     enableSwipeDown={true} imageUrls={images} />
                    </Modal>
                </View>
            </ScrollView>

        )
    }

    renderRoom = (item) => {
        return (
            <TouchableOpacity
                key={item._id}
                style={styles.item}
                onPress={this.showImageZoom}
            >
                <ImageBackground
                    style={styles.itemIcon}
                    source={{
                        uri: 'https://live.staticflickr.com/65535/49999422362_3ed48af520_o.jpg',
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
    descriptionRoom: {
    },
    houseName: {
        color: "blue",
        fontSize: 18,
        fontWeight: "bold",
    },
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        width: 100,
        height: 100
    },
    closeIcon: {
        // alignItems: 'right'
        width: '100%',
        flexDirection: 'row-reverse',
        // alignItems: 'flex-end'
    }
});
