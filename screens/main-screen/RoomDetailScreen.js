import {
    Button, View, Text, ScrollView, FlatList,
    TouchableOpacity, Dimensions, StyleSheet,
    ImageBackground
} from "react-native";
import React from "react";
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import TabBarIcon from "../../components/TabBarIcon";
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
                <Text style={styles.houseName}>{house.Name}</Text>
                <View style={styles.container}>
                    <FlatList
                        data={room.ImageUrls}
                        keyExtractor={(item) => item._id}     //has to be unique
                        renderItem={({item}) => this.renderRoom(item)} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={2}
                    />

                </View>
                <Text style={styles.houseName}>{house.Name}</Text>
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
            </ScrollView>

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
    houseName: {
        color: "blue",
        fontSize: 18,
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
    }
});
