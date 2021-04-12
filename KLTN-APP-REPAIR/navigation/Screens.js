import React from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";
import DangNhap from "../screens/DangNhap";
import DangKyDV from "../screens/DangKyDV";
import ChiTietGoiTho from "../screens/ChiTietGoiTho";
import DonHang from "../screens/DonHang";
import { State } from "react-native-gesture-handler";
import GioHang from "../screens/GioHang";
import ListDonHang from "../screens/ListDonHang";
import DanhGia from "../screens/DanhGia";
import Chat from "../screens/Chat";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const obj = { matho: 0 }
function ElementsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Elements"
        component={Elements}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ListDonHangStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="ListDonHang"
        component={ListDonHang}
        initialParams={{ ma: obj.matho }}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="ListDonHang" back navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
     
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function GioHangStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="GioHang"
        component={GioHang}
        initialParams={{ ma: obj.matho }}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="GioHang"
              back={true}
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  )
}
function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        initialParams={{ ma: obj.matho }}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              matho={{ ma: obj.matho }}
              search
              options
              navigation={navigation}
              scene={scene}

            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },

        }}
      />


      <Stack.Screen name="DonHang" component={DonHang}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="DonHang"
              
              back
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Drawer.Screen name="GioHang" component={GioHang} initialParams={{ ma: obj.matho }} 
      options={{
        header: ({ navigation, scene }) => (
          <Header
            title="GioHang"
            back={true}
            transparent
            navigation={navigation}
            scene={scene}
          />
        ),
        headerTransparent: true
      }} />
       <Stack.Screen name="Chat" component={Chat}/>
      <Stack.Screen name="ChiTietGoiTho" 
      component={ChiTietGoiTho} 
      initialParams={{ matho: obj.matho }}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            title="ChiTietGoiTho"
            back={true}
            transparent
            navigation={navigation}
            scene={scene}
          />
        ),
        headerTransparent: true}}
      />

      <Stack.Screen name="App" component={AppStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen name="DanhGia" component={DanhGia} />
    </Stack.Navigator>


  )
}
function ChiTietGoiThoStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="ChiTietGoiTho"
        component={ChiTietGoiTho}

      />
    </Stack.Navigator>
  );
}
export default function DangNhapStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="DangNhap"
        component={DangNhap}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="DangKyDV" component={DangKyDV} />

    </Stack.Navigator>
  );
}

// export default function OnboardingStack(props) {
//   return (
//     <Stack.Navigator mode="card" headerMode="none">
//       <Stack.Screen
//         name="Onboarding"
//         component={Onboarding}
//         option={{
//           headerTransparent: true
//         }}
//       />
//       <Stack.Screen name="DangNhap" component={DangNhapStack} />
//       <Stack.Screen name="App" component={AppStack} />
//     </Stack.Navigator>
//   );
// }

function AppStack(props) {
  obj.matho = props.route.params.matho
  return (

    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}

    //initialParams = {props.route.params.matho}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Account" component={Register} />
      <Drawer.Screen name="DangKyDV" component={DangKyDV} />

      <Drawer.Screen name="Elements" component={ElementsStack} />
      {/* <Drawer.Screen name="Articles" component={ArticlesStack} /> */}
      <Drawer.Screen name="ListDonHang" component={ListDonHangStack} />
      {/* <Drawer.Screen name="GioHang" component={GioHangStack} /> */}
    </Drawer.Navigator>
  );
}

