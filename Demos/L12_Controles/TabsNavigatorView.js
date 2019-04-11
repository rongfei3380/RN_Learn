import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image, DeviceEventEmitter, BackHandler,
} from 'react-native';

import {
    Navigator,
}from 'react-native-deprecated-custom-components';


import TabNavigator from 'react-native-tab-navigator/TabNavigator';
import TabNavigatorItem from "react-native-tab-navigator/TabNavigatorItem";
import Icon from "react-native-vector-icons/Ionicons";
import ShoppingFruitList from './ShoppingFruitList';
import DatePicker from './DatePicker';
import TimePicker from "./TimePicker"
import DatePickeriOS from "./DatePickeriOS"
import ActionSheet from './ActionSheet.iOS'
import Controls from './Controls'
import NetWorkInfo from './NetWorkInfo'

const deviceW = Dimensions.get('window').width

const basePx = 375
const tabBarHeight = 49+30

function px2dp(px) {
    return px *  deviceW / basePx;
}

class Home extends Component {

    render() {
        return (
            <ShoppingFruitList navigator={this.props.navigator}/>
        );
    }
}

class Profile extends Component {
    render() {
        const PlatformComp = Platform.select({
            ios: () => require('./DatePickeriOS'),
            android: () => require('./DatePicker')
        })().default;
        return (
            <PlatformComp/>
        );
    }
}

class Timeline extends Component {
    render() {
        const PlatformComp = Platform.select({
            ios: ()=> require('./ActionSheet.iOS'),
            android: ()=> require('./TimePicker')
        })().default;
        return (
            <PlatformComp/>
        );
    }
}

class Mine extends Component {
    render() {
        return (
            <Controls navigator={this.props.navigator}/>
        );
    }
}

export default class TabsNavigatorView extends Component{
    constructor(props){
        super(props);
    }
    state={
        selectedTab:'home',
    };

    componentWillMount(): void {
        console.log('componentWillMount');

        if(Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount(): void {
        if(Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = ()=>{
        // let navigator = this.props.navigator;
        // const routers = navigator.getCurrentRoutes();
        const navigator = this.props.navigator;//**************************
        const routers = navigator.getCurrentRoutes();

        if (routers.length > 1){
            navigator.pop();
            return true; // 接管默认行为
        }

        return false; // 默认行为
    }


    render() {
        // return(<Home/>);
        return (
            <TabNavigator style={styles.container}
                          tabBarStyle={{ height: tabBarHeight, overflow: 'hidden' }}
                          sceneStyle={{paddingBottom: tabBarHeight}}
            >
                <TabNavigatorItem
                    tabStyle={[{marginBottom:30}]}
                    selected={this.state.selectedTab === 'home'}
                    title='Home'
                    renderIcon={() => <Icon name="ios-home" size={px2dp(22)} color="#666" />}
                    titleStyle={{color:'#666'}}
                    renderSelectedIcon={()=><Icon name='ios-home' size={px2dp(22)} color='#34960f'/>}
                    selectedTitleStyle={{color:'#34960f'}}
                    onPress={() => this.setState({selectedTab : 'home'})}
                >
                    <ShoppingFruitList navigator={this.props.navigator}/>
                </TabNavigatorItem>

                <TabNavigatorItem
                    tabStyle={[{marginBottom:30}]}
                    selected={this.state.selectedTab === 'profile'}
                    title='Proflie'
                    renderIcon={() => <Icon name="ios-person" size={px2dp(22)} color="#666" />}
                    titleStyle={{color:'#666'}}
                    renderSelectedIcon={()=><Icon name='ios-person' size={px2dp(22)} color='#34960f'/>}
                    selectedTitleStyle={{color:'#34960f'}}
                    onPress={() => this.setState({selectedTab: 'profile'})}
                >
                    <Profile/>
                </TabNavigatorItem>

                <TabNavigatorItem
                    tabStyle={[{marginBottom:30}]}
                    selected={this.state.selectedTab === 'timeline'}
                    title='TimeLine'
                    renderIcon={() => <Icon name="ios-infinite" size={px2dp(22)} color="#666" />}
                    titleStyle={{color:'#666'}}
                    renderSelectedIcon={()=><Icon name='ios-infinite' size={px2dp(22)} color='#34960f'/>}
                    selectedTitleStyle={{color:'#34960f'}}
                    onPress={() => this.setState({selectedTab: 'timeline'})}
                >
                    <Timeline/>
                </TabNavigatorItem>

                <TabNavigatorItem
                    tabStyle={[{marginBottom:30}]}
                    selected={this.state.selectedTab === 'mine'}
                    title='Mine'
                    renderIcon={() => <Icon name="ios-settings" size={px2dp(22)} color="#666" />}
                    titleStyle={{color:'#666'}}
                    renderSelectedIcon={()=><Icon name='ios-settings' size={px2dp(22)} color='#34960f'/>}
                    selectedTitleStyle={{color:'#34960f'}}
                    onPress={() => this.setState({selectedTab: 'mine'})}
                >
                    <Mine navigator={this.props.navigator}/>
                </TabNavigatorItem>
            </TabNavigator>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F5FCFF',
    },
    tabNavigatorItem1: {
        fontSize:20,
        textAlign: 'center',
        margin:10,
    },
});