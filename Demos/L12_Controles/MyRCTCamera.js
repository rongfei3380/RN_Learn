import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class MyRCTCamera extends Component {
    _requestPermissions = async () => {
        if (Platform.OS === 'android') {
            const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
            return result === PermissionsAndroid.RESULTS.GRANTED || result === true
        }
        return true
    }

    _takePicture = async () => {
        if (this.camera) {
            const options = {quality: 0.5, base64: true}
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri)
        }
    }

    _onBarCodeRead = (e) => {
        console.log(`Barcode Found! Type: ${e.type}\nData: ${e.data}`)
    }

    componentDidMount(): void {
        ({_, status}) => {
            if (status !== 'PERMISSION_GRANTED') {
                this._requestPermissions()
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={(ref) => {
                        this.camera = ref;
                    }}
                    onBarCodeRead={(e) => this._onBarCodeRead(e)}
                    style={styles.preview}>
                    <Text style={styles.capture} onPress={() => this._takePicture()}>[CAPTURE]</Text>
                </RNCamera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});