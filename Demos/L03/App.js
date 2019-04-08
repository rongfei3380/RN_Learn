/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, PixelRatio, ScrollView} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components'
import {isIfStatement} from "@babel/types";
import List from './List'

type Props = {};
export default class App extends Component<Props> {

    _configureScene(route){
        if (route.sceneConfig) {
            return route.sceneConfig;
        }
        return Navigator.SceneConfigs.PushFromRight;
    }

    _renderScene(route, navigator) {

        return <route.component
            navigator={navigator}
        />
    }
  render() {
    return (
        <Navigator
            initialRoute={{component: List}}
            configureScene={this._configureScene}
            renderScene={this._renderScene}
        />
    );
  }
}

// class List extends Component{
//   constructor(props){
//     super(props);
//     // 参数赋值
//     this.state={
//       author:'chengfeir',
//       id:1,
//       user:null,
//     };
//   }
//
//   _pressButton(){
//     const {navigator} = this.props.navigator;
//     //这里可以取得 上下文 props.navigator
//     //<Component {...route.params} navigator={navigator}/>
//     // 这里传递了navigator作为props
//     const self=this;
//     if (navigator) {
//       navigator.push({
//         name:'Detail',
//         component:Detail,
//         // 这里参数传递
//         params:{
//           author: this.state.author,
//           id:this.state.id,
//           //从详情页获取user
//           getUser:function (user) {
//             self.setState({
//               user:user
//             })
//           }
//         },
//       })
//     }
//   }
//
//   render(): React.ReactNode {
//     if (this.state.user) {
//      return(
//          <View>
//            <Text style={[styles.list_item, {marginTop:55}]}>用户信息：{JSON.stringify(this.state.user)}</Text>
//          </View>
//      );
//     }  else {
//       return (
//           <ScrollView style={styles.flex}>
//             <Text style={styles.list_item} onPress={this._pressButton.bind(this)}>豪华游轮济州岛3日游</Text>
//             <Text style={styles.list_item} onPress={this._pressButton.bind(this)}>豪华邮轮台湾3日游</Text>
//             <Text style={styles.list_item} onPress={this._pressButton.bind(this)}>豪华邮轮地中海8日游</Text>
//           </ScrollView>
//       );
//     }
//   }
// }

const USER_MODELS = {
  1:{name:'mot', age:23},
  2:{name:'Jay', age: 25},
};

class Detail extends Component{
  constructor(props){
    super(props);
    this.state = {
      id:null,
    };
  }

  componentDidMount(): void {
    this.setState({
      author:this.props.author,
      id:this.props.id,
    });
  }

  _pressButton () {
    const {navigator} = this.props;
    if (this.props.getUser){
      let user = USER_MODELS[this.props.id];
      this.props.getUser(user);
    }
    if (navigator) {
      navigator.pop();
    }
  }
  render(): React.ReactNode {
    return (
        <ScrollView style={styles.detailBg}>
          <Text style={styles.itemBack}
                onPress={this._pressButton.bind(this)}
          > 点击我可以跳回去
          </Text>

          <Text style={styles.itemBack}
          > 传递来的用户id是:{this.state.id}
          </Text>

          <Text style={styles.itemBack}
          > state作者是:{this.state.author}
          </Text>

        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  flex:{
    flex:1,
    marginTop:55,
    backgroundColor: '#F5FCFF',
  },
  list_item:{
    fontSize:26,
    marginTop:5,
    marginLeft:5,
  },
  detailBg:{
    backgroundColor: '#F5FCFF',
  },
  itemBack:{
    fontSize:26,
    marginTop:55,
    marginLeft: 5,
  },
});
