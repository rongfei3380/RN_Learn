/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text, PixelRatio, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback,Touchable} from 'react-native';

var onePT = 1/PixelRatio.get();

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
     <View style={[styles.flex, styles.topStatus]}>
       <Search></Search>
     </View>
    );
  }
}

class Search extends Component{


  // show boolean this.state
  // value 显示值
  constructor(props){
    super(props);
    this.state={
      show:false,
      value:null,
    }
  }

  hide(val){
    this.setState({
      show: false,
      value: val,
        }
    );
  }

  getValue(text){
    this.setState({
      show: true,
      value: text,
  });
  }

  render(): React.ReactNode {
    return (
        <View style={styles.flex}>
          <View style={[styles.flexDirection]}>
            <View style={[styles.flex, styles.input]}>
              <TextInput
                  returnKeyType='search'
                  placeholder="请输入关键词"
                  style={styles.inPutText}
                  value={this.state.value}
                  onChangeText={this.getValue.bind(this)}
              />
            </View>
            <View style={styles.btn}>
              <Text style={styles.search}>搜索</Text>
            </View>
          </View>
          {this.state.show?
              <View style={styles.result}>
                <Text onPress={this.hide.bind(this, this.state.value +"加QQ")}
                      style={styles.item}
                      numberOfLines={1}
                >
                  {this.state.value}加QQ
                </Text>

                <Text onPress={this.hide.bind(this, this.state.value +"园街")}
                      style={styles.item}
                      numberOfLines={1}
                >
                  {this.state.value}园街
                </Text>

                <Text onPress={this.hide.bind(this, 80 +this.state.value +"综合商店")}
                      style={styles.item}
                      numberOfLines={1}
                >
                  {this.state.value}综合商店
                </Text>

                <Text onPress={this.hide.bind(this, this.state.value +"桃")}
                      style={styles.item}
                      numberOfLines={1}
                >
                  {this.state.value}加QQ
                </Text>

                <Text onPress={this.hide.bind(this, this.state.value +"chengfeir")}
                      style={styles.item}
                      numberOfLines={1}
                >
                  {this.state.value}chengfeir
                </Text>
              </View>
              : null
          }
          <TouchableSomes></TouchableSomes>
        </View>
    );
  }
}

class TouchableSomes extends Component{
  render(): React.ReactNode {
    return (
        <View>
          <TouchableHighlight onPress={this.show.bind(this, '欢迎学习RN技术Touchable')}
                              underlayColor='#E1F6FF'
          >
            <Text style={styles.item}>欢迎学习RN技术-TouchableHightlight</Text>
          </TouchableHighlight>

          <TouchableOpacity onPress={this.show.bind(this, '我来试试Touchable组件')}>
            <Text style={styles.item}>这里是TouchableOpacity的效果</Text>
          </TouchableOpacity>

          <TouchableWithoutFeedback onPress={this.show.bind(this, '这里是一个不推荐的组件')}>
            <Text style={styles.item}>不推荐的组件-TouchableWithoutFeedback </Text>
          </TouchableWithoutFeedback>
        </View>
    );
  }
  show(txt){
    alert(txt);
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexDirection:{
    flexDirection: 'row',
  },
  topStatus:{
    marginTop:55,
  },
  input:{
    height:45,
    borderColor:'red',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  inPutText:{
    height:40,
    justifyContent:'center',
    alignItems: 'center',
  },
  btn:{
    width: 45,
    marginLeft: -5,
    marginRight: 5,
    backgroundColor:'#23BEFF',
    height: 45,
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
  },
  search:{
    color:'#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  result:{
    marginTop: onePT,
    marginLeft:18,
    marginRight:5,
    height:200,
  },
  item:{
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
  }
});
