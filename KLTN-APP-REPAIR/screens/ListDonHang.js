import React from 'react';
import {
  StyleSheet, Dimensions,
  ScrollView,
  View, Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  BackHandler,

} from 'react-native';
import DangNhap from '../screens/DangNhap'
import { Block, theme } from 'galio-framework';
import API from "../Services/api"
import { Button, Icon, Input, Select, } from "../components";
import { NavigationEvents } from 'react-navigation';
import { Alert } from 'react-native';
import moment from 'moment'
const { width } = Dimensions.get('screen');
//var dataSource=[] 


class ListDonHang extends React.Component {
  constructor(props) {
    super(props);
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      loading: false,
      dataSource: [],
      khachHang: '',
      DichVu: '',
      maGT: '',
      apiKey: '',
      matho: props.route.params.ma,
      dichvuInfotho:[],
      dichvuInfotho1:[],
    };

    //console.log(props.route.params.ma);
  }
  componentDidMount() {
      API.get('GoiTho/GetAll/'+this.state.matho)
        .then(res => {
          const dataSource = res.data;
          this.setState({ dataSource });
        })
        .catch(error => console.log(error))
  }
  load()
  {
    
  }

 

  renderItem = (data) =>
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>Đơn hàng mới</Text>
      <Text style={{ marginLeft: 20 }}>Tên khách hàng:  {data.item.tenKH}</Text>
      <Text style={{ marginLeft: 20 }}>Ngày gọi:   {moment(data.item.ngayGoi).format('DD/MM/yyyy \n HH:mm')}</Text>
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => {
        const { navigate } = this.props.navigation;
        navigate('ChiTietGoiTho', { ma: data.item.maGT })
      }}>
        <Text style={styles.loginText}>Xem chi tiết</Text>
      </TouchableHighlight>
    </TouchableOpacity>

  renderLoaiDV = () => {
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
          keyExtractor={item => item.maGT.toString()}
        />

      </View>
    )
  }

  render() {

    return (

      <Block flex center style={styles.home}>

        {this.renderLoaiDV()}

      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  button: {

    width: width - theme.SIZES.BASE * 2
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 20
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 250,
    borderRadius: 30,
    marginBottom: 10
  },
  loginButton: {
    backgroundColor: "#f08080",
    marginHorizontal: 40,
  },
  title: {
    color: '#dc143c',
    fontSize: 20,
    fontWeight: "300",
    justifyContent: 'center',
    marginLeft: 100
  }
});

export default ListDonHang;
