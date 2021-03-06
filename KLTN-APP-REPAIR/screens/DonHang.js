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
    TextInput,
    TouchableHighlight,
    BackHandler,
    handleCancel,
    handleDelete,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input, Select, } from "../components";
import { Images, argonTheme } from "../constants";
import API from "../Services/api"
import { Dialog } from 'react-native-simple-dialogs';
import Textarea from 'react-native-textarea';
import { Rating, AirbnbRating } from 'react-native-ratings';
const { width, height } = Dimensions.get("screen");
const obj = { tt: 0 }
class DonHang extends React.Component {
    constructor(props) {
        super(props);
        //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            maHD: props.route.params.ma,
            loading: false,
            dataSource: [],
            PhuongXa: [],
            KhachHang: [],
            tongtien: '',
            tien: 0,
            visible: false,
            diem: 0.0,
        };

        // console.log(this.state.maHD)
    }

    componentDidMount() {
        try {
            API.get('HoaDon/GETALLBYID/' + this.state.maHD)
                .then(res => {
                    const dataSource = res.data;
                    this.setState({ dataSource });
                    this.setState({ KhachHang: res.data[0] });

                    API.get('PhuongXa/GetAllByID/' + res.data[0].maPX)
                        .then(res1 => {
                            const PhuongXa = res1.data[0];
                            this.setState({ PhuongXa })

                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error)) //to catch the errors if any
        } catch {

        }
    }
    result = () => {
        API.put(`HoaDon`,
            {
                maHD: Number(this.state.maHD),
                trangThai: 1,
                phiDichVu: (parseFloat(this.state.tongtien)*0.1)
            })
            .then(res => {
                console.log(res.data)
                this.setState({ visible: true })
            })
    }
    tinhTongTien=(item)=> {
        const obj = { tt: null };
        for (var i = 0; i < this.state.dataSource.length; i++) {
            obj.tt = obj.tt + Number(this.state.dataSource[i].thanhTien)
        }
        this.setState({ tongtien: obj.tt + obj.tt * 0.1 - obj.tt * this.state.KhachHang.chietKhau })
    }

    create = async () => {
      for(var i=0; i<this.state.dataSource.length;i++)
       {
            await API.put(`ChiTietHoaDon`,
                {
                    maTho: 0,
                    maHD: Number(this.state.maHD),
                    maDV: Number(this.state.dataSource[i].maDV),
                    thanhTien: parseFloat(this.state.dataSource[i].thanhTien),
                    
                })
                .then(res => {
                    console.log(res.data);
                })
                .catch(error => console.log(error));

        }
        this.result();
    }
    ratingCompleted=(rating)=> {
        this.setState({diem:rating})
        //console.log(rating)
      }
    DanhGia = () => {
        API.put(`DanhGia`,
            {
                maHD: Number(this.state.maHD),
                diemDGKhachHang: parseFloat(this.state.diem),
                nhanXetKhachHang: this.state.danhgia,
            })
            .then(res => {
                Alert.alert('Th??ng b??o','B???n ???? ????nh gi?? kh??ch h??ng th??nh c??ng');
                this.props.navigation.goBack()
                this.props.navigation.goBack()
            })
            .catch(error => console.log(error));
    }
    Huy = () => {
        Alert.alert('Th??ng b??o','B???n ???? thanh to??n th??nh c??ng');
        this.props.navigation.goBack()
        this.props.navigation.goBack()
    }
    render() {
        //const { ma } = this.props.route.params;
        try {
            return (
                <ScrollView>
                    <Block flex center style={styles.home}>
                        <Block flex={0.17} middle>
                            <Text color="#8b0000" size={25}>
                                Chi ti???t ????n h??ng
                            </Text>
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 15, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, marginTop: 15, marginRight: 60 }}>
                                T??n KH</Text>
                            <TextInput
                                style={styles.inputs}
                                editable={false}
                                value={"   " + this.state.KhachHang.tenKH}
                            />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 15, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, marginTop: 15, marginRight: 50 }}>
                                Ng??y l???p</Text>
                            <TextInput
                                style={styles.inputs}
                                editable={false}
                                value={"   " + this.state.KhachHang.ngayLap}


                            />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 15, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, marginTop: 15, marginRight: 65 }}>
                                S??? nh??</Text>
                            <TextInput
                                style={styles.inputs}
                                editable={false}
                                value={"   " + this.state.KhachHang.soNha}


                            />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 15, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, marginTop: 15, marginRight: 65 }}>
                                ?????a ch???</Text>
                            <TextInput
                                style={styles.input}
                                editable={false}
                                multiline
                                value={"   \n" + this.state.PhuongXa.tenPX + ',\n '
                                 + this.state.PhuongXa.tenQH + ', '
                                  + this.state.PhuongXa.tenTinh}
                                

                            />
                        </Block>


                        <Block width={width * 0.8} style={{ marginBottom: 15, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, marginTop: 15, marginRight: 40 }}>
                                Chi???t kh???u</Text>
                            <TextInput
                                style={styles.inputs}
                                editable={false}
                                value={"      " + String(this.state.KhachHang.chietKhau)}
                            />
                        </Block>

                        <Block width={width * 0.8} style={{ marginBottom: 15, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, marginTop: 15, marginRight: 50 }}>
                                ThueVAT</Text>
                            <TextInput
                                style={styles.inputs}
                                editable={false}
                                value={"      0.1"}
                            />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 15, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, marginTop: 15, marginRight: 20 }}>
                                Ph?? di chuy???n</Text>

                            <TextInput
                                style={styles.inputs}
                                editable={false}
                                value={"      " + String(this.state.KhachHang.phiDiChuyen)}
                            />
                        </Block>

                        <Block width={width * 0.8} style={{ marginBottom: 15, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, marginTop: 15, marginRight: 100 }}>
                                T??n d???ch v???</Text>
                            <Text style={{ fontSize: 17, marginTop: 15, }}>
                                Th??nh ti???n(VN??)</Text>

                        </Block>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({ item }) =>
                                <Block width={width * 0.8} style={{ marginBottom: 15, flexDirection: 'row' }}>
                                    <TextInput
                                        style={{
                                            height: 45,
                                            width: 200,
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: 5,
                                            color: '#000000',
                                            marginRight: 10
                                        }}
                                        editable={false}
                                        value={"   " + item.tenDV}

                                    />
                                    <TextInput
                                        style={{
                                            height: 45,
                                            width: 120,
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: 5,
                                            color: '#000000',
                                            paddingLeft: 20
                                        }}
                                        keyboardType='numeric'
                                        placeholder={"" + item.thanhTien}
                                        onChangeText={(tien) => item.thanhTien = tien}
                                        //onChange={() => this.tinhTongTien({})}
                                        onEndEditing={() => { this.tinhTongTien(item.thanhTien) }}

                                    />

                                </Block>
                            }
                            keyExtractor={item => item.maDV.toString()}
                        />
                        {/* {this.renderGioHang()} */}


                    </Block>
                    <Block middle>
                        <Block width={width * 0.8} style={{ marginBottom: 15, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 17, marginTop: 15, marginRight: 50 }}>
                                T???ng ti???n</Text>

                            <TextInput
                                style={styles.inputs}
                                editable={false}
                                value={"  " + String(this.state.tongtien) + "  VN??"}
                            />
                        </Block>
                    </Block>
                    <Block middle>
                        <Button color="primary" style={styles.createButton} onPress={() => this.create(this)}>
                            <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                X??c nh???n thanh to??n
                        </Text>

                        </Button>
                    </Block>


                    <Dialog

                        visible={this.state.visible}
                        title="????NH GI??"
                        onTouchOutside={() => { this.Huy() }} >
                        <Text style={{ fontSize: 17, color: '#ff7f50' }}>B???n ???? thanh to??n th??nh c??ng, h??y ????nh gi?? kh??ch h??ng c???a b???n</Text>
                        <AirbnbRating
                            style={styles.rate}
                            onFinishRating={this.ratingCompleted}
                        />
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={(danhgia) => this.setState({ danhgia })}
                            //defaultValue={this.state.text}
                            maxLength={120}
                            placeholder={'Nh???n x??t kh??ch h??ng'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />
                        <Block style={{ flexDirection: 'row' }}>
                            <Button color="primary" style={styles.Button} onPress={() => { this.Huy() }}>
                                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                    H???y
                        </Text>

                            </Button>
                            <Button color="primary" style={styles.Button1} onPress={() => this.DanhGia()}>
                                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                    ????nh gi??
                        </Text>

                            </Button>
                        </Block>
                    </Dialog>

                </ScrollView>
            )
        } catch { }
    }

}
const styles = StyleSheet.create({
    text: {
        fontSize: 17
    },
    home: {
        width: width,
        marginTop: 100
    },
    text: {
        fontSize: 17
    },
    card: {
        backgroundColor: theme.COLORS.WHITE,
        marginVertical: theme.SIZES.BASE,
        borderWidth: 0,
        minHeight: 114,
        marginBottom: 16,
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 20,
        justifyContent: 'center',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#5f9ea0",
        marginHorizontal: 40,
        marginBottom: 10
    },
    title: {
        color: '#dc143c',
        fontSize: 25,
        fontWeight: "300",
        justifyContent: 'center',
        marginLeft: 100
    },
    socialButtons: {
        width: 120,
        height: 40,
        backgroundColor: "#fff",
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1
    },
    socialTextButtons: {
        color: argonTheme.COLORS.PRIMARY,
        fontWeight: "800",
        fontSize: 14
    },
    inputIcons: {
        marginRight: 12
    },
    inputs: {

        height: 45,
        width: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        color: '#000000',

    },
    input: {
        
        height: 60,
        width: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        color: '#000000',

    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        marginHorizontal: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#000000',
        borderWidth: 1
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    textareaContainer: {
        color: "#000000",
        borderRadius: 10,
        borderBottomWidth: 1,
        width: width - 100,
        height: 150,
        borderColor: '#555555',
        borderWidth: 0.5,

    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
        marginLeft: 10,
    },
    Button: {
        marginTop: 20,
        width: 140,
    },
    Button1: {
        marginTop: 20,
        width: 140,
        marginLeft: 10
    }
});

export default DonHang;