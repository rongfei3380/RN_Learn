import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TimePickerAndroid,
} from 'react-native';

export default class TimePicker extends Component{
    constructor(props){
        super(props);
        this.state={
            result:'default',
        };
    }
    showPicker() {
        let self = this;
        let theHour = 18;
        let theMinute = 55;
        let is24Hour = true;
        let option = {
            hour: theHour,
            minute: theMinute,
            is24Hour: is24Hour,
        };

        TimePickerAndroid.open(option).then(
            result=>{
                if (result.action !== TimePickerAndroid.timeSetAction){
                    self.setState({
                       result:'用户没有选择时间'
                    });
                } else {
                    self.setState({
                        result:'用户选择时间' +(result.is24Hour? (result.hour+'时' +result.minute +'分'):(result.hour +'时' +result.minute +'分'))
                    });
                }
            }
        ).catch();
    }

    componentWillMount(): void {
        this.showPicker();

    }


    render(): React.ReactNode {
        return (
            <View style={{flex:1}}>
                <View style={styles.headViewContainer}>

                    <View style={styles.headTextView}><Text style={styles.headTextStyle}>时间选择</Text></View>

                </View>


                <Text style={styles.text} onPress={()=>this.showPicker()}>弹出时间选择</Text>

                <Text style={styles.text}>{this.state.result}</Text>

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