import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    PixelRatio,
    DeviceEventEmitter,
} from 'react-native';

import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Ionicons";
export default class ShoppingCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            price: 0,
        };
    }

    _clearStorage() {
        console.log('点了清空购物车');
        // AsyncStorage.clear((err)=> {
        //     if (err) {
        //
        //     } else  {
        //         //TODO err处理
        //         console.log('AsyncStorage this is' + this);
        //         this.setState({
        //             data: [],
        //             price: 0,
        //         }, ()=> {
        //             //发送消息
        //             DeviceEventEmitter.emit('clearStorage', {isClearSuccess: true});
        //             alert('购物车已经清空');
        //         });
        //
        //     }
        // });
        if (this.props.fetchData){
            console.log('点击了清空购物车 --- 回调去影响列表页面');
            this.props.fetchData();
        }

        const {navigator} = this.props;
        if (navigator){
            navigator.pop();
        }

    }

    componentDidMount(): void {
        console.log('componentDidMount this is' + this);
        AsyncStorage.getAllKeys((err, keys)=>{
            if (err){
                alert(err);
            }
            AsyncStorage.multiGet(keys, (err, result)=>{
                if (err){
                    alert(err);
                }
                let arr=[];
                for (let i in result){
                    arr.push(JSON.parse(result[i][1]));
                }
                this.setState({
                    data:arr,
                });

            });

        });
    }

    render(): React.ReactNode {
        let data = this.state.data;
        let price = this.state.price;
        let list = [];
        for (let i in data) {
            price += parseFloat(data[i].price);
            list.push(
                <View key={i}
                      style={[styles.row, styles.list_item]}
                >
                    <Text style={styles.list_item_desc}>
                        {data[i].title}
                        {data[i].desc}
                    </Text>

                    <Text style={styles.list_item_desc}>
                        ￥{data[i].price}
                    </Text>

                </View>
            );
        }

        let str = null;
        if (price) {
            str = ', 共' + price.toFixed(1) + '元';
        }

        return (
            <View style={{flex:1}}>
                <View style={styles.headViewContainer}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={()=>{
                            this.props.navigator.pop();
                        }}
                    >
                        <View style={{justifyContent: 'center'}}>
                            <Icon name='ios-arrow-back'
                                  style={styles.backArrowImageStyle}
                                size={22}
                            />
                        </View>

                    </TouchableOpacity>

                    <View style={styles.headTextView}><Text style={styles.headTextStyle}>购物车</Text></View>

                </View>

                <ScrollView>
                    {list}
                    <Text style={styles.btn}>支付{str}</Text>
                    <Text style={styles.clear} onPress={()=>this._clearStorage()}>清空购物车</Text>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    headViewContainer: {

        height: Platform.OS == 'ios' ? 80 : 40,
        backgroundColor: 'blue',
        flexDirection: 'row',
        alignItems: 'center'


    },
    headTextView: {
        flex: 1,
        justifyContent: 'center',
        marginTop:36,
        height:44,
        marginRight: 10 +30,
    },
    headTextStyle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    backArrowView: {},
    backArrowImageStyle: {
        marginTop:36,
        width: 22,
        marginLeft: 10,
        height:22,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    list_item: {
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        borderWidth: 1,
        height: 30,
        borderRadius: 3,
        borderColor: '#ddd'
    },
    list_item_desc: {
        flex: 2,
        fontSize: 15
    },
    btn: {
        backgroundColor: 'blue',
        height: 33,
        textAlign: 'center',
        color: '#fff',
        marginLeft: 10,
        marginRight: 10,
        lineHeight: 24,
        marginTop: 40,
        fontSize: 18,
    },
    clear: {
        marginTop: 10,
        backgroundColor: 'blue',
        color: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        marginLeft: 10,
        marginRight: 10,
        lineHeight: 24,
        height: 33,
        fontSize: 18,
        textAlign: 'center',
    }
});

