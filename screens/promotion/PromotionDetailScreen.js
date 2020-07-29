import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View, FlatList, Image} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {PromotionModel} from "../../model/promotion.model";
import PromotionService from "../../services/promotion.service";
import ToastService from "../../services/toast.service";

export default class PromotionDetailScreen extends React.Component {
    constructor() {
        super();
        this.promotionService = new PromotionService();
        this.toastService = new ToastService();
        this.state = {
            "_id": "5f2040b948cb30708a242436",
            "Url": "",
            "ImageUrl": "https://live.staticflickr.com/65535/50162463503_aed831c9e9_b.jpg",
            "Description": "Khuyến mại 100% các dịch vụ như lấy cao răng, làm trắng răng, tư vấn nha khoa vv..",
            "Condition": "Đang thuê phòng tại hệ thống",
            "StartTime": "2020-07-20T00:00:00.000Z",
            "EndTime": "2020-12-20T00:00:00.000Z"
        }
    }

    componentDidMount(): void {
        this.promotionService.getList()
            .then(res => this.setState({
                promotions: res
            }))
            .catch(err => this.toastService.error(JSON.stringify(err)))
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


    renderPromotion = (item) => {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.promotionBackground}
                    source={{ uri: item.ImageUrl }}
                    resizeMode="contain"
                    resizeMethod="resize"
                />
                <View>
                    <Text style={styles.descriptionPromotion}>{item.Description}</Text>
                </View>
            </View>
        )
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
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        fontSize: 16,
        color: "#5D4037",
    },
});
