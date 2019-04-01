/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,PixelRatio, StyleSheet, Text, View, Image, TouchableOpacity, Picker, ProgressViewIOS, ProgressBarAndroid} from 'react-native';

type Props = {};
var ProgressView = Platform.select({
    ios:() => <ProgressViewIOS styleAttr='LargeInverse' style={[{marginLeft:10}, {marginRight:10}]}/>,
    android: () => <ProgressBarAndroid styleAttr='LargeInverse' style={[{marginLeft:10}, {marginRight:10}]}/>,
});

export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state={
      language:null,
      index:0,
    };
  }

  render() {
    return (
      <View style={[styles.flex, {marginTop:45}]}>
        <Text>Picker组件</Text>

        <Picker
            slectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
            mode='dropdown'
            style={{color:'#f00'}}
        >
          <Picker.Item label='Java' value='java'/>
          <Picker.Item label='JavaScript' value='js'/>
          <Picker.Item label='C语言' value='C'/>
          <Picker.Item label='PHP开发' value='php'/>

        </Picker>

        <Text>{this.state.language}</Text>



        <ProgressView/>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  felx: {
    flex: 1,
  },
});
