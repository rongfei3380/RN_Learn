import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    ActionSheetIOS, Platform,
} from 'react-native';

export default class ActionSheet extends Component{

    showPicker(){
        ActionSheetIOS.showActionSheetWithOptions({
                options:['打电话', '发邮件', '发短信', '取消'],
                cancelButtonIndex: 3,
                destructiveButtonIndex: 0,
                title:'如何操作？',
                message:'要想清楚',
        },
            function (index) {
                alert(index);
            }
        );
    }

    showShare(){
        ActionSheetIOS.showShareActionSheetWithOptions(
            {
                message:'chengfeir\'s Github',
                url:'https://github.com/rongfei3380/',
            },
            function (error){
                alert(error);
            },
            function (suc) {
                alert(suc);
            }
        );
    }

    render(): React.ReactNode {
        return (
            <View style={styles.flex}>
                <View style={styles.headViewContainer}>

                    <View style={styles.headTextView}><Text style={styles.headTextStyle}>ActionSheet</Text></View>

                </View>

                <Text style={styles.text} onPress={()=>this.showPicker()}>弹出选择</Text>
                <Text style={styles.text} onPress={()=>this.showShare()}>弹出分享</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    flex:{
        flex:1,

    },
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
    text: {
        backgroundColor: 'orange',
        color: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        marginLeft: 10,
        marginRight: 10,
        marginTop:50,
        height: 44,
        fontSize: 18,
        textAlign: 'center',
    }
});