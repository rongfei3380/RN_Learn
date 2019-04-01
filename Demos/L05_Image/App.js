/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, PixelRatio} from 'react-native';


type Props = {};
var imgs=['http://n.sinaimg.cn/news/1_img/vcg/3ad618a7/116/w1024h692/20190331/EhtE-huxwryw4329519.jpg',
          'http://n.sinaimg.cn/news/1_img/vcg/3ad618a7/243/w1024h819/20190331/wRBd-huxwryw4329607.jpg',
          'http://n.sinaimg.cn/news/1_img/vcg/3ad618a7/105/w681h1024/20190331/gKqE-huxwryw4329720.jpg',
          'http://n.sinaimg.cn/news/1_img/vcg/3ad618a7/114/w1024h690/20190331/YKnx-huxwryw4329750.jpg'];


export default class App extends Component<Props> {
  render() {
    return (
      <View style={[styles.flex, {marginTop: 45}]}>
        <MyImage imgs={imgs}></MyImage>
      </View>
    );
  }
}

class MyImage extends Component{
  constructor(props){
    super(props);
    this.state = {
      count:0,
      imgs:this.props.imgs,
    };
  }

  render(): React.ReactNode {
    return (
        <View style={[styles.flex, {alignItems:'center'}]}>
          <View style={styles.image}>
            <Image style={styles.img}
                   resizeMode='contain'
                   source={{uri:this.state.imgs[this.state.count]}}
            />
          </View>

          <View style={styles.btns}>
            <TouchableOpacity onPress={this.goPreView.bind(this)}>
              <View style={styles.btn}><Text>上一张</Text></View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.goNext.bind(this)}>
              <View style={styles.btn}><Text>下一张</Text></View>
            </TouchableOpacity>
          </View>

          <View style={styles.image}>
            <Text>本地图片</Text>
            <Image style={styles.img}
                   resizeMode='contain'
                   source={require('./images/IMG_20170501_132713.jpg')}
            ></Image>
          </View>
        </View>
    );
  }

  goPreView(){
    var count=this.state.count;
    count--;
    if (count>= 0){
      this.setState({
        count:count,
      });
    }
  }

  goNext(){
    var count=this.state.count;
    count++;
    if (count>=0){
      this.setState({
        count:count,
      });
    }
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  btn:{
    width:60,
    height:30,
    borderColor:'#0089FF',
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:3,
    marginRight:20,
  },
  btns:{
    flexDirection:'row',
    marginTop:20,
    justifyContent: 'center',
  },
  img:{
    height: 250,
    width: 300,
  },
  image:{
    borderWidth: 1/PixelRatio.get(),
    borderRadius:3,
  }
});
