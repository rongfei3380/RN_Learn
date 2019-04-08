import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    DatePickerIOS,
} from 'react-native';

export default class DatePickeriOS extends Component{
    constructor(props){
        super(props);
        this.state={
            date1: new Date(),
            date2: new Date(),
            date3: new Date(),
        };
    }

    onDateChange1(date){
        this.setState({
            date1: date,
        });
    }

    onDateChange2(date){
        this.setState({
            date2: date,
        });
    }

    onDateChange3(date){
        this.setState({
            date3: date,
        });
    }


    componentWillMount(): void {


    }


    render(): React.ReactNode {
        console.log('render' +this.state.result);
        return (
            <View style={{flex:1}}>
                <DatePickerIOS
                    style={styles.flex}
                    date={this.state.date1}
                    mode='datetime'
                    onDateChange={d=>this.onDateChange1(d)}
                />
                <DatePickerIOS
                    style={styles.flex}
                    date={this.state.date2}
                    mode='time'
                    onDateChange={d=>this.onDateChange2(d)}
                />
                <DatePickerIOS
                    style={styles.flex}
                    date={this.state.date3}
                    mode='date'
                    onDateChange={d=>this.onDateChange3(d)}
                />

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
    container:{
        flex: 1,
    },
    headTextView: {
        flex: 1,
        justifyContent: 'center',
        height:44,
    },
    flex:{
        flex: 1,
    },
});