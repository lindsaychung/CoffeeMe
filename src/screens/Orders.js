import React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Global from '../Global';
import Icon from 'react-native-vector-icons/FontAwesome';
import OrderListItem from './orders/OrderListItem';

export default class Orders extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoading: true,
            isLogin: false
        };
    }

    componentDidMount () {
        let monitorLogin = setInterval(() => {
            if (Global.userAuthenticated === true && this.state.isLogin === false) {
                this.setState({
                    isLogin: true
                }, () => {
                    clearInterval(monitorLogin)
                })
            }
        }, 2000)
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevState.isLogin === false && this.state.isLogin === true) {
            fetch('https://api-jp.kii.com/api/apps/2c1pzz9jg5dd/buckets/ORDERS/query', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Global.userAccessToken,
                    'Content-Type': 'application/vnd.kii.QueryRequest+json',
                },
                body: JSON.stringify({
                    "bucketQuery": {
                        "clause": {
                            "type": "eq",
                            "field": "customer.id",
                            "value": Global.userID
                        }
                    },
                    "bestEffortLimit": 10
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        orderList: responseJson.results.map(order => {
                            return {
                                key: order['_id'],
                                orderInfo: order
                            }
                        })
                    })
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    goToShop = (item) => {
        this.props.navigator.push({
            screen: 'SingleShop',
            title: item.shop.name,
            passProps: {
                shopInfo: Object.assign({}, item.shop,
                    {'_id': item.shop.id})
            },
            animated: true,
            animationType: 'slide-horizontal',
            backButtonHidden: false,
            navigatorStyle: {
                tabBarHidden: true
            }
        });
    }

    showAuthenticate = () => {
        this.props.navigator.push({
            screen: 'Authenticate',
            title: 'User Authentication',
            animated: true,
            animationType: 'fade',
            backButtonHidden: true,
            passProps: {
                didLogin: () => {
                    this.setState({
                        isLogin: true
                    })
                }
            },
        });
    }

    render () {
        if (this.state.isLoading && this.state.isLogin) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return(
            <View style={styles.container}>
                {Global.userAuthenticated ?
                    <View>
                        <FlatList
                            data={this.state.orderList}
                            renderItem={({item}) => <OrderListItem
                                order={item.orderInfo}
                                onOrderAgainPress={this.goToShop}
                                onShopPress={this.goToShop}
                            />}
                        />
                    </View>:
                    <View style={{alignSelf: 'center', marginTop: 100}}>
                        <Text style={{ color: '#a2a2a2', alignSelf: 'center', fontSize: 12, marginBottom: 20 }}>
                            You Are Not Currently Logged In
                        </Text>
                        <Icon.Button backgroundColor="#0c64ff" borderRadius={2}
                                     iconStyle={{marginRight: 0}} style={{alignSelf: 'center'}}
                                     onPress={this.showAuthenticate}>
                            Press to Login
                        </Icon.Button>
                    </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    }
})