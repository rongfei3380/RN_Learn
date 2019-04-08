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
    Navigator,
    DeviceEventEmitter, BackHandler,
} from 'react-native';

import PropTypes from 'prop-types';
import ShoppingCart from './ShoppingCart'


const Switdh = Dimensions.get('window').width;
const Sheight = Dimensions.get('window').height;

const Model = [
    {
        id:'1',
        title:'猕猴桃1',
        desc:'12个装',
        price:99,
        url:'https://imgservice5.suning.cn/uimg1/b2c/image/bWkLaHXQ-Cod1xsGdK_GSw.jpg_400w_400h_4e'
    },
    {
        id:'2',
        title: '牛油果',
        desc: '6个装',
        price: 59,
        url:'https://imgservice2.suning.cn/uimg1/b2c/image/z5V-JGxqcV-B24mr6F9Okg.jpg_400w_400h_4e',
    },
    {
        id:'3',
        title: '橙子',
        desc: '6个装',
        price: 29,
        url:'https://imgservice3.suning.cn/uimg1/b2c/image/8lrAv3Ioy6gpLkFcOotlKg.jpg_400w_400h_4e',
    },
    {
        id:'4',
        title: '西瓜',
        desc: '1个装',
        price: 29,
        url:'https://imgservice5.suning.cn/uimg1/b2c/image/O4oHRo3RAruB2BcmjQ-4og.jpg_400w_400h_4e',
    },
    {
        id:'5',
        title: '苹果',
        desc: '6个装',
        price: 49,
        url:'https://imgservice2.suning.cn/uimg1/b2c/image/AAAIugBkF5izOM-Z4qsV6g.jpg_400w_400h_4e',
    },
    {
        id:'6',
        title: '圣女果',
        desc: '一斤装',
        price: 12,
        url:'https://imgservice1.suning.cn/uimg1/b2c/image/Qufh8ym9usHtJC8Lj39rlg.jpg_400w_400h_4e',
    }
];


export default class ShoppingFruitList extends Component{
    constructor(props){
        super(props);
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <List navigator={this.props.navigator}></List>
            </View>
        );
    }
}

class List extends Component{
    constructor(props) {
        super(props);
        this.state={
            count: 0,
            _listeners:[],
        };
    }

    _getAsyncStorageStatus() {
        AsyncStorage.getAllKeys((err, keys)=> {

            if (err) {
                //TODO 存储数据出错,给用户提示错误信息
            }

            this.setState({
                count: keys.length
            });
        });
    }

    press(data){
        this.setState({
            count: this.state.count +1,
        });
        AsyncStorage.setItem('SP-'+this.genId()+'-SP', JSON.stringify(data), function (err) {
            if (err){
                alert(err);
            } else {

            }
        });
    }

    genId(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxx'.replace(/[xy]/g, function (c) {
            let r =Math.random()*16, v = c == 'x'? r:(r&0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }

    pressOn(){
        console.log('push pressOn');
        let that = this;
        let navigator = this.props.navigator;
        if (navigator){
            navigator.push({
                component: ShoppingCart,
                name: 'ShoppingCart',
                params:{
                    fetchData: function () {
                        console.log('清空购物车 fetchData');
                        AsyncStorage.clear(function (error) {
                            if (!error){
                                that.setState({
                                    count:0,
                                });
                                alert('购物车 已清空');
                            }
                        })
                        
                    }

                },
            });
        }
    }

    componentWillMount(): void {
        console.log('componentWillMount');
        // 数据同步的一种方法
        // DeviceEventEmitter.addListener('clearStorage', (result)=> {
        //     if (result.isClearSuccess) {
        //         this._getAsyncStorageStatus();
        //     }
        // });


        //  1.监听didfocus事件
        // let navigator = this.props.navigator;
        //
        // let callBack = (event) => {
        //     console.log('list : 事件类型', {
        //         route: JSON.stringify(event.data.route),
        //         target: event.target,
        //         type: event.type,
        //     });
        //
        //     console.log('event.data.route.name :' + event.data.route.name);
        //     if ('TabsNavigatorView' === event.data.route.name&& 'didfocus' === event.type) {
        //         console.log('TabsNavigatorView && didfocus');
        //         this._getAsyncStorageStatus();
        //     }
        // };
        //
        // this._listeners=[
        //     navigator._navigationContext.addListener('willfoucus', callBack),
        //     navigator._navigationContext.addListener('didfocus', callBack),
        // ];



    }

    componentWillUnmount(): void {
        DeviceEventEmitter.removeListener('clearStorage');
        this._listeners && this._listeners.forEach(listeners =>listeners.remove());
    }

    componentWillReceiveProps(): void {
        console.log('componentWillReceiveProps');
    }

    shouldComponentUpdate(): boolean {
        console.log('shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(): void {
        console.log('componentWillUpdate');
    }

    componentDidUpdate(): void {
        console.log('componentDidUpdate');
    }

    render(): React.ReactNode {
        let list=[];
        for(let i in Model){
            if (i % 2 === 0){
                let row= (
                    <View style={styles.row} key={i}>
                        <Item title={Model[i].title}
                              url={Model[i].url}
                              style={styles.item}
                              press={this.press.bind(this, Model[i])}
                        />

                        <Item title={Model[parseInt(i) +1].title}
                              url={Model[parseInt(i) +1].url}
                              style={styles.item}
                              press={this.press.bind(this, Model[parseInt(i) +1])}
                        />
                    </View>
                );
                list.push(row);
            }
        }

        let count = this.state.count;
        let str = null;
        if (count){
            str= ',共'+count+'件商品';
        }

        return (
            <ScrollView style={{marginTop: 10}}>
                {list}
                <View style={styles.btnStyle}>
                    <TouchableOpacity onPress={()=>this.pressOn()}>
                        <Text style={styles.btnTextStyle}>去结算{str}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

class Item extends Component {
    static defaultProps = {
        url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3259139778,1077651318&fm=26&gp=0.jpg',
        title: '默认标题',
    };
    static propTypes = {
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    };



    render(): React.ReactNode {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={this.props.press}>
                    <Image resizeMode='contain'
                           style={styles.img}
                           source={{uri: this.props.url}}
                    />

                    <Text
                        numberOfLines={1}
                        style={styles.item_text}
                    >
                        {this.props.title}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}


// goCart




const styles=StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:'#F5FCFF',
    },
    row:{
        flexDirection:'row',
        marginBottom: 10,
    },
    item:{
        flex: 1,
        borderWidth:1/PixelRatio.get(),
        marginLeft: 5,
        marginRight: 5,
        padding :10,
        // height:100,
    },
    img:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        // width:100,
        height:100,

    },
    item_text: {
        textAlign: 'center',
    },
    btn_bg:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    btnStyle: {
        marginTop: 40,
        alignItems: 'center',
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#e8e8e8',
        marginLeft: 40,
        marginRight: 40,
        height: 60,
        backgroundColor: '#ff7200',
        borderRadius: 10,
        justifyContent: 'center',
    },
    btnTextStyle: {
        fontSize: 20,
        color: 'white'
    },
    btn:{
        flex:1,
        color: 'white',
        backgroundColor: '#ff7200',
        borderWidth: 1/PixelRatio.get(),
        borderRadius:3,
        height: 49,
        justifyContent:'center',
        textAlign : 'center',
        marginLeft:10,
        marginRight: 10,
        lineHeight: 24,
        marginTop: 20,
        fontSize: 18
    },
});
