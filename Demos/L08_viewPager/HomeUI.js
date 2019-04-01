import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';


export default class HomeUI extends Component{
    goBack(){
        const {navigator} = this.props;
        if (navigator){
            navigator.pop();
        }
    }
    render(): React.ReactNode {
        return (
            <View style={homeStyles.flex}>
                <Text style={homeStyles.text} onPress={this.goBack.bind(this)}>点击这里可以返回哦~</Text>
            </View>
        );
    }
}

const homeStyles=StyleSheet.create({
    flex:{
        flex:1,
        flexDirection:'row',
    },
    text:{
        alignItems:'center',
        justifyContent:'center',
    },
});

module.exports=HomeUI;