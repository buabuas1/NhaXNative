import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View, FlatList, Image} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {RouterPath} from "../constants/Router";
import {makePriceString} from "../constants/Helper";
import {PromotionModel} from "../model/promotion.model";
import PromotionService from "../services/promotion.service";
import ToastService from "../services/toast.service";
import {createStackNavigator} from "@react-navigation/stack";
import MainHouseScreen from "./main-screen/MainHouseScreen";
import PromotionDetailScreen from "./promotion/PromotionDetailScreen";
const Stack = createStackNavigator();

export default function PromotionStack() {
    return (
        <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen name={RouterPath.PROMOTION_SCREEN} component={PromotionScreen}
                              options={{title: '', headerStyle: styles.displayNone}}></Stack.Screen>
                <Stack.Screen name={RouterPath.PROMOTION_DETAIL_SCREEN} component={PromotionDetailScreen}
                              options={{title: '', headerStyle: styles.displayNone}}></Stack.Screen>
            </Stack.Navigator>

        </View>

    )
}

export class PromotionScreen extends React.Component {
    constructor() {
        super();
        this.promotionService = new PromotionService();
        this.toastService = new ToastService();
        this.state = {
            promotions: []
        }
    }

    componentDidMount(): void {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.callApi();
        });
        this.callApi();
    }

    componentWillUnmount(): void {
        this._unsubscribe();
    }

    callApi = () => {
        this.promotionService.getList()
            .then(res => this.setState({
                promotions: res
            }))
            .catch(err => this.toastService.error(JSON.stringify(err)))
    }
    render(): React.ReactNode {
        const {promotions} = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <FlatList
                        data={promotions}
                        keyExtractor={(item) => item._id}     //has to be unique
                        renderItem={({item}) => this.renderPromotion(item)} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={1}
                    />
                </View>
            </ScrollView>
        );
    }


    renderPromotion = (item) => {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    key={item._id}
                    onPress={() => {this.props.navigation.navigate(RouterPath.PROMOTION_DETAIL_SCREEN, {
                        promotion: item
                    })}}
                    style={styles.descriptionPromotion}
                >
                    <Image
                        style={styles.promotionBackground}
                        source={{ uri: item.ImageUrl }}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
                    <View>
                        <Text style={styles.prmName}>{item.Name}</Text>
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
        marginTop: 5,
        marginLeft: 2,
    },
    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    contentContainerStyle: {
        marginLeft: 10
    },
    wrapBack: {
        flex: 1,
        flexDirection: 'row'
    },
    BackButton: {
        width: 30
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
        height: (Dimensions.get('window').width + 150) * 2.3/6,
        // color: "#5D4037",
    },
    displayNone: {
        opacity: 0,
        height: 0
    },
    prmName: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 18,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
});
