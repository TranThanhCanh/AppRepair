import React, { useState } from "react";
import DatePicker from 'react-native-datepicker'
import CheckBox from 'react-native-check-box'
import Moment from 'moment'; 
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
    TouchableHighlight,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input, Select, } from "../components";
import { Images, argonTheme } from "../constants";
import API from "../Services/api"
import { number } from "prop-types";
import { useRoute } from '@react-navigation/native';
const { width } = Dimensions.get('screen');
const options = { month: "long", day: "numeric", year: "numeric" };
class GioHang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ma: props.route.params.ma,
            loading: false,
            dataSource: [],
            PhuongXa: [],
        };

    }
    refresh() {
      this.doSomething();
    }
    componentDidMount() {
        API.get('HoaDon/GETALLBYMATHO/'+this.state.ma)
            .then(res => {
                const dataSource = res.data;
                this.setState({ dataSource });
                console.log(this.state.dataSource)
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }
    renderItem = (data) =>
    
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>Đơn hàng</Text>
      <Text style={{ marginLeft: 50, fontSize:20 }}>Mã đơn hàng:  {data.item.maHD}</Text>
      <Text style={{ marginLeft: 50, fontSize:20 }}>Ngày gọi:  {new Date().toLocaleDateString(data.item.ngayLap,options)}</Text>
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => {
        const { navigate } = this.props.navigation;
        navigate('DonHang', { ma: data.item.maHD })
      }}>
        <Text style={styles.loginText}>Xem chi tiết</Text>
      </TouchableHighlight>
    </TouchableOpacity>

    renderGioHang = () => {
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
          keyExtractor={item => item.maHD.toString()}
        />
      
      </View>
    )
  }
    render() {
        Moment.locale('vn'); 
        //const { ma } = this.props.route.params;
        return (
            <Block flex center style={styles.home}>
            {this.renderGioHang()}
    
          </Block>
        )
    }
}
const styles = StyleSheet.create({
    home: {
        width: width,
        marginTop:100
      },
    text: {
        fontSize:17
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
        marginBottom:10
      },
      title: {
        color: '#dc143c',
        fontSize: 25,
        fontWeight: "300",
        justifyContent: 'center',
        marginLeft: 100 
      }

});

export default GioHang;