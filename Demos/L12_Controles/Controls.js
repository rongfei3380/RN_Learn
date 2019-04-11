import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    PixelRatio,
    Navigator,
    NativeModules,
} from 'react-native';

import NetWorkInfo from './NetWorkInfo';
import Camera from './Camera'
import MRNCamera from './MRNCamera'
import MyRCTCamera from './MyRCTCamera'

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

    showMyReactNativeMethod(){
        NativeModules.MyNativeModule.rnCallNative('rn调用原生模块的方法');
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
});