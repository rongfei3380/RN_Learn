import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

export default class MovieItem extends Component{
    constructor(props) {
        super(props);
        this.setState({
            title:null,
            thumbnail:null,
            year:null,
        });
    }


    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <Image source={{uri:this.thumbnail}}
                       style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{this.title}</Text>
                    <Text style={styles.title}>测试年份</Text>
                    <Text style={styles.year}>{this.year}</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    thumbnail: {
        width: 53,
        height: 81
    },
    list: {
        paddingTop: 20,
        backgroundColor: "#F5FCFF"
    }
});
    module.exports=MovieItem;
