import React, { useState } from "react";
import DatePicker from 'react-native-datepicker'
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
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input, Select, } from "../components";
import { Images, argonTheme } from "../constants";
import API from "../Services/api"
import { number } from "prop-types";
const { width, height } = Dimensions.get("screen");







class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      matho:'',
      tenTho:'',
      email:'',
      sdt:'',
      soNha:'',
      password:'',
      tinh: '',
      quan: '',
      phuong: '',
      TinhThanh: [],
      QuanHuyen: [],
      PhuongXa: [],
      date: "1990-05-15"
    };

  }
  componentDidMount() {
    API.get('TinhThanh')
      .then(res => {
        const TinhThanh = res.data;
        this.setState({ TinhThanh });
        //console.log(this.state.TinhThanh)
      })
      .catch(error => console.log(error))
  }

  valuechangeQH(tinh) {
    API.get('QuanHuyen/' + tinh)
      .then(res => {
        const QuanHuyen = res.data;
        this.setState({ QuanHuyen });
        this.valuechangePX(res.data[0].maQH);
      })
      .catch(error => console.log(error))//to catch the errors if any

  }
  valuechangePX(quan) {
    API.get('PhuongXa/' + quan)
      .then(res => {
        const PhuongXa = res.data;
        this.setState({ PhuongXa });
      })
      .catch(error => console.log(error))//to catch the errors if any
  }
  create()
  {
    // Alert.alert( `${this.state.tenTho}+${this.state.email}+${this.state.date}+
    // ${this.state.soNha}+${this.state.password}+
    // ${this.state.tinh} + ${this.state.quan}+${this.state.phuong}`);
    // const tho =JSON.stringify( {
    //   tenTho: this.state.tenTho,
    //   email: this.state.email,
    //   ngaySinh: this.state.date,
    //   sdt: this.state.sdt,
    //   soNha: this.state.soNha,
    //   password: this.state.password,
    //   maPX:Number(this.state.phuong),
    //   anh:"hinh1.png",
    //   soTaiKhoan: this.state.sdt
    // });
    // console.log(tho);
    API.post(`ThoSua`,
    {
      tenTho: this.state.tenTho,
      email: this.state.email,
      ngaySinh: this.state.date,
      sdt: this.state.sdt,
      soNha: this.state.soNha,
      password: this.state.password,
      maPX:Number(this.state.phuong),
      anh:"hinh1.png",
      soTaiKhoan: this.state.sdt})
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.state.matho = res.data.maTho
        Alert.alert('Bạn đã đăng ký thành công. Hãy đăng ký dịch vụ sửa chữa!!!');
        console.log(res.data.maTho)
        this.props.navigation.navigate('DangKyDV',{ma: this.state.matho})
      })
  }
  render() {

    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >

          <Block flex middle>

            <Block style={styles.registerContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}>
                <Block flex>
                  <Block flex={0.17} middle>
                    <Text color="#8b0000" size={25}>
                      Đăng ký
                  </Text>
                  </Block>
                  <Block flex center>
                    <KeyboardAvoidingView
                      style={{ flex: 1 }}
                      behavior="padding"
                      enabled
                    >
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Input
                          borderless
                          placeholder="Họ và tên"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="hat-3"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                          onChangeText={(tenTho) => this.setState({ tenTho })}
                        />
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Input
                          borderless
                          placeholder="Email"
                          keyboardType="email-address"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="ic_mail_24px"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                          onChangeText={(email) => this.setState({ email })}
                        />
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <DatePicker 
                         minDate="1970-01-01"
                         maxDate="2000-01-01"
                          date={this.state.date}
                          onDateChange={(date) => {this.setState({date: date})}}
                        />
                      </Block>

                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Input
                          borderless
                          placeholder="Số điện thoại"
                          keyboardType = 'numeric'
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="phone"
                              family="fontawesome"
                              style={styles.inputIcons}
                            />
                          }
                          onChangeText={(sdt) => this.setState({ sdt })}
                        />
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>

                        <Input
                          borderless
                          placeholder="Số nhà"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="address-card"
                              family="font-awesome"
                              style={styles.inputIcons}
                            />
                          }
                          onChangeText={(soNha) => this.setState({ soNha })}
                        />
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Picker
                          style={styles.picker}
                          onValueChange={(itemValue) => { this.setState({ tinh: itemValue }), this.valuechangeQH(itemValue) }}
                          selectedValue={this.state.tinh}

                        >
                          {
                            this.state.TinhThanh.map((item, index) => (
                              <Picker.Item
                                key={item.maTinh}
                                style={styles.container}
                                label={item.tenTinh} value={item.maTinh} />
                            ))

                          }
                        </Picker>
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Picker
                          style={styles.picker}
                          onValueChange={(itemValue) => { this.setState({ quan: itemValue }), this.valuechangePX(itemValue) }}
                          selectedValue={this.state.quan}>
                          {
                            this.state.QuanHuyen.map((item, index) => (
                              <Picker.Item
                                key={item.maQH}
                                style={styles.container}
                                label={item.tenQH} value={item.maQH} />
                            ))

                          }
                        </Picker>
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                        <Picker
                          style={styles.picker}
                          onValueChange={(itemValue) => { this.setState({ phuong: itemValue }) }}
                          selectedValue={this.state.phuong}
                        >
                          {
                            this.state.PhuongXa.map((item, index) => (
                              <Picker.Item
                                key={item.maPX}
                                style={styles.container}
                                label={item.tenPX} value={item.maPX} />
                            ))

                          }
                        </Picker>
                      </Block>

                      <Block width={width * 0.8}>
                        <Input
                          password
                          borderless
                          placeholder="Password"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="key"
                              family="font-awesome"
                              style={styles.inputIcons}
                            />
                          }
                          onChangeText={(password) => this.setState({ password })}
                        />
                        <Block row style={styles.passwordCheck}>
                          <Text size={12} color={argonTheme.COLORS.MUTED}>
                            password strength:
                        </Text>
                          <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                            {" "}
                          strong
                        </Text>
                        </Block>
                      </Block>
                      <Block row width={width * 0.75}>
                        <Checkbox
                          checkboxStyle={{
                            borderWidth: 3
                          }}
                          color={argonTheme.COLORS.PRIMARY}
                          label="I agree with the"
                        />
                        <Button
                          style={{ width: 100 }}
                          color="transparent"
                          textStyle={{
                            color: argonTheme.COLORS.PRIMARY,
                            fontSize: 14
                          }}
                        >
                          Privacy Policy
                      </Button>
                      </Block>
                      <Block middle>
                        <Button color="primary" style={styles.createButton} onPress={()=>this.create(this)}>
                          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            CREATE ACCOUNT
                        </Text>
                     
                        </Button>
                      </Block>
                    </KeyboardAvoidingView>
                  </Block>
                </Block>
              </ScrollView>
            </Block>

          </Block>

        </ImageBackground>

      </Block>

    );

  }

}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
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
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 20
  },
  picker: {
    borderColor: argonTheme.COLORS.BORDER,
    height: 45,
    backgroundColor: '#FFFFFF',
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
    borderColor: argonTheme.COLORS.INPUT_ERROR,
    borderColor: argonTheme.COLORS.INPUT_SUCCESS,

  }
});

export default Register;
