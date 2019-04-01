/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, ViewPagerAndroid, PixelRatio} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
// import {ViewPagerAndroid} from  '@react-native-community/viewpager'


import LikeCount from './LikeCount'
import CFButton from './CFButton'
import HomeUI from './HomeUI'

const PAGES=4;

const BGCOLOR = ['#fdc08e', '#fff6b9', '#99d1b7', '#dde5fe'];

const IMAGE_URIS=[
    'http://n.sinaimg.cn/news/1_img/vcg/3ad618a7/116/w1024h692/20190331/EhtE-huxwryw4329519.jpg',
    'http://n.sinaimg.cn/news/1_img/vcg/3ad618a7/243/w1024h819/20190331/wRBd-huxwryw4329607.jpg',
    'http://n.sinaimg.cn/news/1_img/vcg/3ad618a7/105/w681h1024/20190331/gKqE-huxwryw4329720.jpg',
    'http://n.sinaimg.cn/news/1_img/vcg/3ad618a7/114/w1024h690/20190331/YKnx-huxwryw4329750.jpg'
];



type Props = {};
export default class App extends Component<Props> {
  render(): React.ReactNode {
    let defaultName='WelcomeUI';
    let defaultComponent=WelcomeUI;
    return (
        <Navigator
            initialRoute={{name: defaultName, component: defaultComponent}}
            configureScence={(route)=>{return Navigator.SceneConfigs.FloatFromRight}}
            renderScene={
              (route, navigator)=>
              {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator}/>
              }
            }
        />
    );
  }
}

class ViewPager extends Component{
  render(): React.ReactNode {
    return (
        <ViewPagerAndroid
            style={[styles.flex, styles.viewpager1]}
            initialPage={0}
        >
          <View style={styles.center}><Text style={[{fontSize:12}, {color:'red'}]}>第一个页面</Text></View>
          <View style={styles.center}><Text style={[{fontSize:16}, {color:'blue'}]}>第二个页面</Text></View>
          <View style={styles.center}><Text style={[{fontSize:18}, {color:'green'}]}>第三个页面</Text></View>
          <View style={styles.center}><Text style={[{fontSize:20}, {color:'gray'}]}>第四个页面</Text></View>
        </ViewPagerAndroid>
    );
  }
}

class WelcomeUI extends Component{
  constructor(props){
    super(props);
    this.state = {
      page:0,
      animationsAreEnabled: true, //动画是否开启
      progress:{
        position:0,
        offset:0,
      },
    };
  };

  onPageSelected = (event) => {
    console.log(event.nativeEvent);
    this.setState({
      page: event.nativeEvent.position,
    });
  };

  onPageScroll = (event) =>{
    this.setState({
      progress: event.nativeEvent,
    });
  };

  move = (delta) =>{
    var page=this.state.page +delta;
    this.go(page);
  }

  go =(page) =>{
    if(this.state.animationsAreEnabled) {
      this.viewPager.setPage(page);
    } else {
      this.viewPager.setPageWithoutAnimation(page);
    }
    // 刷新了
    this.setState({page});
  }

  onClick=()=>{
    const  {navigator} = this.props;
    if (navigator) {
      navigator.push({
        name:'HomeUI',
        component:HomeUI,
      });
    }
  }

  render(): React.ReactNode {
    const thunbsUp = '\uD83D\uDC4D';
    var pages=[];
    for (let i = 0; i < PAGES; i++) {
      var pageStyle = {
        backgroundColor: BGCOLOR[i%BGCOLOR.length],
        alignItems: 'center',
        padding: 20,
      };
      if (i<PAGES-1){
        pages.push(
            <View key={i} style={pageStyle} collapsable={false}>
              <Image
                  style={styles.images}
                  source={{uri:IMAGE_URIS[i%BGCOLOR.length]}}
              />
              <LikeCount/>
            </View>
        );
      } else {
        pages.push(
            <View key={i} style={pageStyle} collapsable={false}>
              <Image
                  style={styles.images}
                  source={{uri: IMAGE_URIS[i%BGCOLOR.length]}}
              />

              <TouchableOpacity onPress={this.onClick}
                                style={styles.startupButton}
              >
                <Text style={styles.likesText}>{thunbsUp+'启动首页'}</Text>

              </TouchableOpacity>


            </View>
        );
      }
    }

    let {
                page,
      animationAreEnable,
              } = this.state;


    return (
      <View style={styles.container}>
        <ViewPagerAndroid style={styles.viewpager1}
                          initialPage={0}
                          onPageScroll={this.onPageScroll}
                          onPageSelected={this.onPageSelected}
                          ref={viewPager=>{this.viewPager = viewPager;}}
        >
          {pages}
        </ViewPagerAndroid>
        <View style={styles.buttons}>
          {animationAreEnable?
              <CFButton text='Turn off animations'
                        enabled={true}
                        onPress={()=>this.setState({animationAreEnable:false})}
              />
              :
              <CFButton text='Turn animations back on'
                        enabled={true}
                        onPress={()=>this.setState({animationAreEnable:true})}
              />
          }
        </View>

        <View style={styles.buttons}>
          <CFButton text='start' enabled={page>0} onPress={()=>this.go(0)}/>
          <CFButton text='Prev' enabled={page>0} onPress={()=>this.move(-1)}/>

          <Text style={styles.buttonText}>页:{page +1}/{PAGES}</Text>
          <ProgressBar size={100} progress={this.state.progress}/>

          <CFButton text='Next' enabled={page < PAGES -1} onPress={()=>this.move(1)}/>
          <CFButton text='Last' enabled={page < PAGES -1} onPress={()=>this.go(PAGES -1)}/>

        </View>

      </View>
    );
  }
}

class ProgressBar extends Component{
  constructor(props){
    super(props);
    this.state={

    };
  }
  render(): React.ReactNode {
    let fractionPosition = (this.props.progress.position + this.props.progress.offset);
    let progressBarSize = (fractionPosition/(PAGES -1)) *this.props.size;

    return (
      <View style={[styles.programBarContainer, {width:this.props.size}]}>
        <View style={[styles.progressBar, {width:progressBarSize}]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    flexDirection:'column',
  },
  container: {
    flex: 1,
  },
  center:{
    justifyContent:'center',
    alignItems: 'center',
  },
  viewpager1:{
    flex: 1,
    // height:200,
  },
  viewPager: {
    flex: 1,
  },
  pageStyle:{
    backgroundColor: '#fff6b9',
    alignItems: 'center',
    padding: 20,
  },
  images:{
    width: 300,
    height: 200,
    padding: 20,
  },
  progressBarContainer:{
    height: 10,
    margin: 10,
    borderColor: '#eeeeee',
    borderWidth: 2,
  },
  progressBar:{
    alignSelf: 'flex-start',
    flex: 1,
    backgroundColor: '#ff0000',
  },
  buttonText: {
    color: 'white',
  },
  startupButton:{
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderColor: '#333333',
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 5,
    margin: 8,
    padding: 8,
  },
  buttons:{
    flexDirection: 'row',
    height:30,
    backgroundColor: 'black',
    alignItems:'center',
    justifyContent: 'space-between',
  },
});
