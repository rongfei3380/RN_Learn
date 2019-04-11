import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    CameraRoll,
    PixelRatio,
    TouchableOpacity,
    ScrollView,
    PermissionsAndroid,
} from 'react-native';


import {Image} from "react-native-elements";

let fetchParams = {
    first: 10,
    assetType: 'Photos',
    // groupTypes in not supported on Android
    // groupTypes: 'all',
};

let imageUrl = 'https://imgservice4.suning.cn/uimg1/b2c/image/QX9BWmeTS0_LnvfcLsFUYQ.jpg_400w_400h_4e';

export default class Camera extends Component {
    constructor(props){
        super(props);
        this.state={
            images:[]
        };
    }

    showImagePicker(){
    }

    async requestReadPermission() {
        try {
            //返回string类型
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    //第一次请求拒绝后提示用户你为什么要这个权限
                    'title': '我要读写权限',
                    'message': '没权限我不能工作，同意就好了'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("你已获取了读写权限");
                this.getPhotos();
            } else {
                console.log("获取读写权限失败");
            }
        } catch (err) {
            console.log(err.toString())
        }
    }

    getPhotos(){
        let _that = this;
        CameraRoll.getPhotos(fetchParams).then(
            (date)=>{
                console.log(date);
                let edges = date.edges;
                let images = edges.map((edge)=>{
                    return edge.node.image;

                });
                _that.setState({
                    images:images,
                });
            }
        ).catch(error=>{
            console.log('出错了：' +error);
        });
    }

    componentDidMount(): void {
        this.requestReadPermission();
        this.getPhotos();

    }


    render(): React.ReactNode {
        return(
            <View style={styles.container}>
                <View style={styles.btnStyle}>
                    <TouchableOpacity onPress={()=>this.showImagePicker()}>
                        <Text style={styles.btnTextStyle}>弹出相册组件</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.row}>
                    <View style={styles.flex_1}>
                        <Image
                            resizeMode='contain'
                            style={[styles.imageLine, styles.m5]}
                            source={{uri: imageUrl}}
                        />
                    </View>

                    <View style={styles.flex_1}>
                        <Image
                            resizeMode='contain'
                            style={[styles.imageLine, styles.m5]}
                            source={{uri: imageUrl}}
                        />
                    </View>
                </View>

                <View style={styles.btnStyle}>
                    <TouchableOpacity onPress={()=>this.showImagePicker()}>
                        <Text style={styles.btnTextStyle}>保存到相册</Text>
                    </TouchableOpacity>
                </View>



                <View style={styles.imageGrid}>
                    {
                        this.state.images.map((image) =>
                            <Image
                            style={styles.image}
                            resizeMode='cover'
                            source={image}
                            key={image.uri}
                        />)
                    }
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:'#F5FCFF',
    },
    btnStyle: {
        marginTop: 40,
        alignItems: 'center',
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#e8e8e8',
        marginLeft: 40,
        marginRight: 40,
        height: 44,
        backgroundColor: '#ff7200',
        borderRadius: 10,
        justifyContent: 'center',
    },
    btnTextStyle: {
        fontSize: 20,
        color: 'white'
    },
    flex_1:{
        flex: 1,
    },
    imageLine:{
        margin:5,
        height: 200,
    },
    m5:{
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1/PixelRatio.get(),
        borderColor: '#ddd',
    },
    row:{
        flexDirection:'row',
    },
    imageGrid:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    image:{
        marginLeft:5,
        marginRight:5,
        marginTop:5,
        width: 100,
        height: 100,
    },
});