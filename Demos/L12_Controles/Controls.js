import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    PixelRatio,
    NativeModules,
    DeviceEventEmitter,
    Alert,
} from 'react-native';

import NetWorkInfo from './NetWorkInfo';
import Camera from './Camera'
import MRNCamera from './MRNCamera'
import MyRCTCamera from './MyRCTCamera'
import MyKenBurnsView from './MyKenBurnsView'

export default class Controls extends Component{
    constructor(props){
        super(props);

    }

    goToNetInfo(){
        let navigator = this.props.navigator;
        if (navigator){
            navigator.push({
                component:NetWorkInfo,
                name:'NetWorkInfo',
            });
        }
    }

    goToCamera(){
        let navigator = this.props.navigator;
        if (navigator){
            navigator.push({
                component:Camera,
                name:'Camera',
            });
        }
    }

    goToMyRCTCamera(){
        let navigator = this.props.navigator;
        if (navigator){
            navigator.push({
                component:MyRCTCamera,
                name:'MyRCTCamera',
            });
        }
    }

    goTORNCamera(){
        let navigator = this.props.navigator;
        if (navigator){
            navigator.push({
                component:MRNCamera,
                name:'MRNCamera',
            });
        }
    }

    goToMyKenBurnsView(){
        let navigator = this.props.navigator;
        if (navigator){
            navigator.push({
                component:MyKenBurnsView,
                name:'MyKenBurnsView',
            });
        }
    }

    showMyReactNativeMethod(){
        NativeModules.MyNativeModule.rnCallNative('rn调用原生模块的方法');
    }

    getReactNativeContact(){
        let navigator = this.props.navigator;
        NativeModules.MyNativeModule.rnCallContactsList();
    }

    handleAndroidMessage = (msg)=>{
        console.log("handleAndroidMessage");
        console.log('native传来的数据' +msg);
        Alert.alert(
            'native传来的数据',
            "回调得到的数据："+msg,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        )
    }

    callAndroid_callBack = () =>{
        NativeModules.MyNativeModule.measureLayout(
            (msg) => {
                console.log(msg);
                Alert.alert(
                    'Android_callBack_Error',
                    "Error："+msg,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: true }
                )
            }, (x, y, width, height) => {
                console.log(x +'坐标',+y +'坐标',+ width +'宽', +height + '高');
                Alert.alert(
                    'Android_callBack_Sucess',
                    x +'坐标' +y +'坐标'+ width +'宽' +height + '高',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: true }
                )
            }
        );

    }

    callAndroid_promise = ()=>{
            NativeModules.MyNativeModule.rnCallNative_promise('rn调用原生模块的方法-成功啦！').then(
                (msg)=>{
                    console.log('promise成功：' +msg);
                }
            ).catch(
                (err)=>{
                    console.log(err);
                }
            );
    }

    componentWillMount(): void {
        console.log("msgcomponentWillMount addListener handleAndroidMessage");
        DeviceEventEmitter.addListener('AndroidToRNMessage',this.handleAndroidMessage);
    }

    componentWillUnmount(): void {
        console.log("msgcomponentWillMount removeListener handleAndroidMessage");
        DeviceEventEmitter.removeListener('AndroidToRNMessage', this.handleAndroidMessage);
    }


    render(): React.ReactNode {
        return (
            <ScrollView style={{marginTop: 50}}>
                <View style={styles.btnStyle}>
                    <TouchableOpacity onPress={()=>this.goToNetInfo()}>
                        <Text style={styles.btnTextStyle}>NetInfo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnStyle}>
                    <TouchableOpacity onPress={()=>this.goToCamera()}>
                        <Text style={styles.btnTextStyle}>Camera</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnStyle}>
                    <TouchableOpacity onPress={()=>this.goTORNCamera()}>
                        <Text style={styles.btnTextStyle}>MRNCamera</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnStyle}>
                    <TouchableOpacity onPress={()=>this.goToMyRCTCamera()}>
                        <Text style={styles.btnTextStyle}>MyRCTCamera</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnStyle}>
                    <TouchableOpacity onPress={()=>this.showMyReactNativeMethod()}>
                        <Text style={styles.btnTextStyle}>rnCallNative</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnStyle}>
                    <TouchableOpacity onPress={()=>this.getReactNativeContact()}>
                        <Text style={styles.btnTextStyle}>rnFromReactNativeContact</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnStyle}>
                    <TouchableOpacity onPress={()=>this.callAndroid_callBack()}>
                        <Text style={styles.btnTextStyle}>调用原生函数_回调函数</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnStyle}>
                    <TouchableOpacity onPress={()=>this.callAndroid_promise()}>
                        <Text style={styles.btnTextStyle}>调用原生函数_Promise</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.TextStyle}>Android原生暴露的常量-{NativeModules.MyNativeModule.URL}作者-{NativeModules.MyNativeModule.author}QQ-{NativeModules.MyNativeModule.QQ}</Text>

                <View style={styles.btnStyle}>
                    <TouchableOpacity onPress={()=>this.goToMyKenBurnsView()}>
                        <Text style={styles.btnTextStyle}>调用原生UI封装组件</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:'#F5FCFF',
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
    TextStyle: {
        marginTop: 20,
        alignItems: 'center',
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#e8e8e8',
        marginLeft: 40,
        marginRight: 40,
        flex: 1,
        backgroundColor: '#ff7200',
        borderRadius: 10,
        justifyContent: 'center',
        fontSize: 20,
        color: 'white'
    },
});