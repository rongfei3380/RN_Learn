import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import KenBurnsView from './KenBurnsView';

export default class MyKenBurnsView extends Component{
    render(): React.ReactNode {
        return (
            <View style={{flex:1}}>
                <View style={styles.headViewContainer}>

                    <View style={styles.headTextView}>
                        <Text style={styles.headTextStyle}>
                            调用原生组件
                        </Text>
                    </View>

                </View>

                <View style={styles.contentStyle}>
                    <KenBurnsView
                        imgSource="country-01.jpg"
                        style={styles.KenBurnsViewStyle}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    headViewContainer: {

        height: Platform.OS == 'ios' ? 80 : 40,
        backgroundColor: 'orange',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headTextView: {
        flex: 1,
        justifyContent: 'center',
        height:44,
    },
    headTextStyle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    contentStyle: {
        flex: 1,
        marginTop:0,
        textAlign: 'center',
    },
    KenBurnsViewStyle:{
        width:200,
        height: 300,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    }
});