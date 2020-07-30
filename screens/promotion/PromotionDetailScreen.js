import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    Modal
} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {PromotionModel} from "../../model/promotion.model";
import PromotionService from "../../services/promotion.service";
import ToastService from "../../services/toast.service";
import {makeStringDate} from "../../constants/Helper";
import ImageViewer from "react-native-image-zoom-viewer";
import TabBarIcon from "../../components/TabBarIcon";

export default class PromotionDetailScreen extends React.Component {
    constructor() {
        super();
        this.promotionService = new PromotionService();
        this.toastService = new ToastService();
        this.state = {
            isShowImageZoom: false
        }
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    render(): React.ReactNode {
        const {promotion} = this.props.route.params;
        return (
            <ScrollView>
                <View style={styles.wrapBack}>
                    <TouchableOpacity style={styles.BackButton} onPress={this.goBack}>
                        <Ionicons name="ios-arrow-round-back" size={25} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    {this.renderPromotion(promotion)}
                </View>
            </ScrollView>
        );
    }


    renderPromotion = (item: PromotionModel) => {
        const images = [{url: item.ImageUrl}];
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    key={item._id}
                    style={styles.url}
                    onPress={() => this.showImageZoom(item._id)}
                >
                    <Image
                        style={styles.promotionBackground}
                        source={{ uri: item.ImageUrl }}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
                </TouchableOpacity>
                <View style={styles.descriptionPromotion}>
                    <Text style={styles.prmName}>{item.Name}</Text>
                    <Text style={styles.prmTime}>Từ {makeStringDate(item.StartTime)} đến {makeStringDate(item.EndTime)}</Text>
                    <Text style={styles.prmCond}>{item.Condition}</Text>
                    <Text style={styles.prmDes}>{item.Description}</Text>
                </View>
                <View style={styles.MainContainer}>
                    <Modal
                        visible={this.state.isShowImageZoom}
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
                            }} enableSwipeDown={true} imageUrls={images} index={0} />
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }

    closeImageZoom = () => {
        this.setState({
            isShowImageZoom: false
        })
    }

    showImageZoom = (id) => {
        this.setState({
            isShowImageZoom: true,
            index: 0
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        marginTop: 5,
        marginLeft: 2,
    },
    wrapBack: {
        flex: 1,
        flexDirection: 'row'
    },
    BackButton: {
        marginLeft: 2,
        width: 50,
        height: 15
    },

    promotionBackground: {
        width: (Dimensions.get('window').width - 10),
        height: (Dimensions.get('window').width + 150) * 1.5/6,
        resizeMode: "contain",
    },
    itemTitle: {
        marginTop: '70%',
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    descriptionPromotion: {
        width: (Dimensions.get('window').width - 10),
        height: (Dimensions.get('window').width + 150) * 2.5/6,
        fontSize: 16,
        color: "#5D4037",
    },
    prmName: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20
    },
    prmTime: {
        color: '#F06292',
        textAlign: 'center',
        fontSize: 16
    },
    prmCond: {
        color: 'blue',
        textAlign: 'center',
        fontSize: 16,
        borderBottomColor: '#D7CCC8',
        borderBottomWidth: 2,
        marginBottom: 10,
        paddingBottom: 5,
        marginTop: 5
    },
    prmDes: {

    },
    fullScreen: {
        width: '100%',
        height: '100%',
        backgroundColor: 'blue'
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
});
