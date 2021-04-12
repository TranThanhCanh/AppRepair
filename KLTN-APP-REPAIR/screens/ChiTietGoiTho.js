import React, { useState } from "react";
import DatePicker from 'react-native-datepicker'
import CheckBox from 'react-native-check-box'
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
    ScrollView,
    Picker,
    FlatList,
    Alert,
    TouchableOpacity,
    View,
    BackHandler,
    TextInput,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input, Select, } from "../components";
import { Images, argonTheme } from "../constants";
import API from "../Services/api"
import { number } from "prop-types";
import { useRoute } from '@react-navigation/native';
import { color } from "react-native-reanimated";
const { width, height } = Dimensions.get("screen");

class ChiTietGoiTho extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ma: props.route.params.ma,
            matho: props.route.params.matho,
            loading: false,
            dataSource: [],
            goitho: [],
            PhuongXa: [],
            hoadon: '',
        };
    }
    componentDidMount() {
        try{
        API.get('GoiTho/' + this.state.ma)
            .then(res => {
                const dataSource = res.data;
                this.setState({ dataSource });
                this.setState({ goitho: res.data[0] });
                
                API.get('PhuongXa/GetAllByID/' + res.data[0].maPX)
                    .then(res1 => {
                        const PhuongXa = res1.data[0];
                        this.setState({ PhuongXa })
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error)) //to catch the errors if any
        }catch{
            
        }
console.log(this.state.goitho)
    }
    create= async()=> {
        API.post(`HoaDon`,
            {
                maKH: this.state.goitho.maKH,
                thueVAT: parseFloat(0.1),
                ngayLap: new Date(),
                trangThai: 0
            })
            .then(res => {
                for(var i=0; i<this.state.dataSource.length; i++)
                {
                    API.post(`ChiTietHoaDon`,
                    {
                        maHD: Number(res.data.maHD),
                        maDV: Number(this.state.dataSource[i].maDV),
                        maTho: Number(this.state.matho)
                    })
                    .then(res=>{
                        console.log(res.data)
                        API.delete(`GoiTho/`+this.state.ma)
                    })
                    .catch(error => console.log(error))
                }
                API.post(`DanhGia`,
                {
                    maHD: Number(res.data.maHD),
                    diemDGKhachHang: 4,
                    diemDGTho: 4,
                    nhanXetKhachHang:"Không",
                    nhanXetTho: "Không"
                })
                .then(res => {
                    this.setState({ hoadon: res.data.maHD })
                    alert("Bạn đã nhận đơn hàng thành công!!!")
                    console.log(this.state.dataSource)
                   this.props.navigation.goBack();
                })
                .catch(error => console.log(error));
               
            })

    }
    renderItem = (data) =>
        <TouchableOpacity style={styles.card}>
            <Text style={styles.text}>{data.item.tenDV}</Text>
        </TouchableOpacity>
    renderDichVu = () => {
        if (this.state.loading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.maDV.toString()}
                />

            </View>
        )
    }
    render() {
        //const { ma } = this.props.route.params;
        return (
            <Block flex middle >
                <StatusBar hidden />
                
        
                <Block flex middle >


                    <Block >
                   
                        <Block flex >
                            <Block flex={0.17} middle style={{marginTop:50}}>
                                <Text color="#000000" size={25}>
                                    Chi tiết đơn hàng
                  </Text>
                            </Block>
                            <Block flex >
                                <KeyboardAvoidingView
                                    style={{ flex: 1 }}
                                    behavior="padding"
                                    enabled
                                >
                                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                                        <Text style={styles.text}>Tên khách hàng </Text>
                                        <TextInput
                            style={styles.inputs}
                            editable={false}
                            value ={"   " + this.state.goitho.tenKH}

                        />
                                    </Block>
                                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                                    <Text style={styles.text}>Tên dịch vụ
                                    
                                    </Text>
                                        <FlatList
                                            data={this.state.dataSource}
                                            renderItem={({ item }) =>  <TextInput
                                            style={styles.inputs}
                                            editable={false}
                                            value ={"   " + item.tenDV}
                
                                        />}
                                        />
                                    </Block>
                                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                                        <Text style={styles.text}>Ngày gọi </Text>
                                        <TextInput
                                                style={styles.inputs}
                                                editable={false}
                                                value ={"   " + this.state.goitho.ngayGoi}

                                            />
                                    </Block>
                                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                                        <Text style={styles.text}>Địa chỉ</Text>
                                        <TextInput
                                                style={styles.inputs}
                                                editable={false}
                                                value ={"   " + this.state.PhuongXa.tenQH+"-"+this.state.PhuongXa.tenTinh}

                                            />
                                    </Block>
                                    <Block width={width * 0.8} style={{ marginBottom: 15, }}>
                                        <Text style={styles.text}>Ghi chú  </Text>
                                        <TextInput
                                                style={styles.input}
                                                editable={false}
                                                value ={" " + this.state.goitho.ghiChu}
                                                multiline={true}
                                                numberOfLines={7}
                                            />
                                    </Block>
                                    <Block middle>
                                        <Button color="primary" style={styles.createButton} onPress={() => this.create(this)}>
                                            <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                                Nhận  đơn hàng
                            </Text>
                                        </Button>
                                    </Block>
                                </KeyboardAvoidingView>
                            </Block>
                            
                        </Block>
                        
                    </Block>

                </Block>

               

            </Block>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        fontSize: 17,
      
    },
    inputs: {

        height: 45,
        marginLeft:5,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        color: '#000000',

    },
    input:{
        height: 150,
        marginLeft:5,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        color: '#000000',
    },
    registerContainer: {
        width: width * 0.9,
        height: height * 0.78,
        backgroundColor: '#F4F5F7',
        borderRadius: 4,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
          width: 0,
          height: 4
        },
        
        
   
    }
});

export default ChiTietGoiTho;