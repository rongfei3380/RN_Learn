/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  BackHandler,
  DeviceEventEmitter,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TabsNavigatorView from './TabsNavigatorView';
import {Navigator} from "react-native-deprecated-custom-components";
import ShoppingFruitList from "./ShoppingFruitList";
import Controls from './Controls'

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
        {...route.params}
        navigator={navigator}
    />
  }

  render() {
    return (
        <Navigator
            initialRoute={{component: TabsNavigatorView, name: 'TabsNavigatorView'}}
            configureScene={this._configureScene}
            renderScene={this._renderScene}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
