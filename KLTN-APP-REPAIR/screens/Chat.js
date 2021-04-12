import React from 'react';
import {Platform, KeyboardAvoidingView,} from "react-native";
import {GiftedChat} from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fire from '../Services/Fire';

class Chat extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            message: [],
            //  name: props.route.params.name
            name:[{tenKH:'Ngọc',maKH:1}]

        };
    }
    // state={message:[]}
    get user()
    {
        return{
             _id:Fire.getuid,
            name: this.state.name.tenKH
        }
    }
    componentDidMount()
    {
        Fire.get(message=>this.setState(previous=>({
            message:GiftedChat.append(previous.message,message)
        })))
       
    }
    componentWillUnmount()
    {
        Fire.off();
    }
    render()
    {
        // console.log(this.state.name)
        //const chat=<GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user.name}/>;
        console.log(this.state.message)
        if(Platform.OS==='android')
        {
            return(
                
                <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={30} enabled>
                    <GiftedChat messages={this.state.message} onSend={Fire.send} user={this.state.name} />
                </KeyboardAvoidingView>
            )
        }
        return <SafeAreaView style={{ flex: 1 }}><GiftedChat messages={this.state.message} onSend={Fire.send} user={this.state.name} /></SafeAreaView>
    }
   
}
export default Chat;