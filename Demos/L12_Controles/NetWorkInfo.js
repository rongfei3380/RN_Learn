import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NetInfo,
    ToastAndroid,
} from 'react-native';

export default class NetWorkInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isConnected:null,
          connectionInfo:null,
        };
    }

    _handleConnectivityChange = (isConnected)=>{
        ToastAndroid.show((isConnected ? 'onLine': 'offLine'));
    }

    _handleNetStatusChange = (status)=>{
        ToastAndroid.show('当前网络状态：'+ status, ToastAndroid.SHORT);
    }

    goPostNet1(){
        ToastAndroid.show('fetch-POST访问网络-方法1', ToastAndroid.SHORT);
        let url = 'http:xxxxxxx';
        let map = {method: 'POST'};

        let privateHeaders = {
            'Private-header1': 'value1',
            'Private-header2': 'value2',
            'content-Type':'text/plain',
            'User-Agent' : 'testAgent',
        };


        map.body = JSON.stringify({
            'username':'username',
            'password':'password',
            'act' : 'signin',
        });

        map.follow = 10; // 设置请求允许的最大重定向次数 0为不允许重定向
        map.timeout = 8000; //设置超时时间，0 为没有超时时间 此值在重定向时会被重置
        map.size = 0; // 设置请求回应中的消息体最大允许长度，0为没有限制

        console.log('fetch-POST访问网络-方法1');

        fetch(url, map).then(
            (response) =>{
                console.log('fetch-第一个then里面');
                return response.text();
            }
        ).then(
            (responseText) => {
                // 这里不能用console 否则看不到 这是一个巨大的坑 ！！！
                alert('服务器返回：' +responseText);
            }
        ).catch(
            (error)=>{
                console.log('错误：' +error);
            }
        );
    }

    postRequest(url, data, callback){
        let map = {
            method: 'POST',
            headers: {
                'Private-header1': 'value1',
                'Private-header2': 'value2',
                'content-Type': 'text/plain',
                'User-Agent': 'testAgent',
            },
            body:JSON.stringify(data),
            follow:20,
            timeout: 8000,
            size: 0,
        };

        fetch(url, map).then(
            (response) =>response.text()
        ).then(
            (responseText) => {
                callback(responseText);
            }
        ).catch(
            (error)=>{
                callback(error);
            }
        );
    }

    goPostNet2(){
        ToastAndroid.show('fetch-POST访问网络-方法2', ToastAndroid.SHORT);
        let url = 'http://xxxxxxxxx';
        let data = {
            'username':'username',
            'password':'password',
            'act' : 'signin',
        };
        console.log('fetch-POST访问网络-方法2');
        this.postRequest(url, data, (result) =>{
            alert('服务器返回：' +responseText);
        });
    }

    goGetNet():void{
        ToastAndroid.show('fetch-GET访问网络', ToastAndroid.SHORT);
        console.log('GET访问网络');
        let url= 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';
        fetch(url).then(
            (response)=>response.text()
        ).then(
            (responseText) =>{
                alert('服务器返回：' +responseText)
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        );

    }

    componentDidMount(): void {
        NetInfo.isConnected.addEventListener('isConnected', this._handleConnectivityChange);

        NetInfo.addEventListener('statusChange', this._handleNetStatusChange);

        //检测网络是否连接
        NetInfo.isConnected.fetch().done(
            (isConnected) => {this.setState({isConnected:isConnected})}
        );
        NetInfo.fetch().done(
            (connectionInfo) => {this.setState({connectionInfo:connectionInfo})}
        );
    }

    componentWillUnmount(): void {
        NetInfo.isConnected.removeEventListener('isConnected',this._handleConnectivityChange);
        NetInfo.removeEventListener('statusChange', this._handleNetStatusChange);
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>当前的网络状态</Text>
                <Text style={styles.instructions}>{this.state.isConnected ? '网络在线' : '离线'}</Text>

                <Text style={styles.welcome}>当前网络连接类型</Text>
                <Text style={styles.instructions}>{this.state.connectionInfo}</Text>

                <Text style={styles.welcome}>当前网络是否计费（仅Android平台）</Text>
                <Text style={styles.instructions}>{NetInfo.isConnectionExpensive == true ? '需要计费' : '不需要计费'}</Text>



                <Text style={styles.fetchPost}>fetch-POST访问网络1/2</Text>
                <Text style={styles.fetchGet} onPress={()=>this.goGetNet()}>fetch-POST访问网络</Text>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop:50,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        color: '#333333',
        marginTop: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginTop: 10,
    },
    fetchPost:{
        backgroundColor: 'orange',
        textAlign:'center',
        color: 'white',
        marginTop: 50,
        fontSize: 20,
        marginLeft:20,
        marginRight:20,
        flexDirection:'row'
    },
    fetchGet:{
        backgroundColor: 'red',
        textAlign:'center',
        color: 'white',
        marginTop: 50,
        fontSize: 20,
        marginLeft:20,
        marginRight:20,
        flexDirection:'row'
    }
});

