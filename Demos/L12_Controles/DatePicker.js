import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    DatePickerAndroid,
} from 'react-native';


export default class DatePicker extends Component{
    constructor(props){
        super(props);
        this.state={
          result:'default',
        };
    }

    showPicker() {
        let self = this;
        let today = new Date();
        let theMinDate = new Date(2015, 1,1);
        let theMaxDate = new Date(2025,1,1);
        let option = {
            date: today,
            theMinDate: theMinDate,
            theMaxDate: theMaxDate,
        };
        DatePickerAndroid.open(option).then(
            result=>{
                if (result.action === DatePickerAndroid.dismissedAction){
                    self.setState({
                        result:'用户没有选择日期',
                    });
                    console.log(result);
                } else {
                    self.setState({
                        result: '用户选择了' +result.year +'年' +(result.month+1) +'月' +result.day +'日',
                    });
                    console.log('选择器返回：' +this.state.result);
                }
            }
        ).catch(
            error =>{
                console.log('出错了' +error);
            }
        );
    }

    componentWillMount(): void {
        this.showPicker();

    }


    render(): React.ReactNode {
        console.log('render' +this.state.result);
        return (
            <View style={{flex:1}}>
                <View style={styles.headViewContainer}>

                    <View style={styles.headTextView}><Text style={styles.headTextStyle}>日期选择</Text></View>

                </View>


                <Text style={styles.text} onPress={()=>this.showPicker()}>弹出日期选择</Text>

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