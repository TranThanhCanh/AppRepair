import * as firebase from 'firebase';


class Fire {
    constructor()
    {
        this.init();
        this.checkAuth();
    }
    init=()=>{
         if(firebase.app.length)
        {
            var firebaseConfig={
                apiKey: "AIzaSyBAyGa1i5shx4musHWX9WY4DIOKYokJ39E",
                authDomain: "chatservices-6912c.firebaseapp.com",
                databaseURL: "https://chatservices-6912c.firebaseio.com",
                projectId: "chatservices-6912c",
                storageBucket: "chatservices-6912c.appspot.com",
                messagingSenderId: "265997060240",
                appId: "1:265997060240:web:c12a780305ed44474d3015",
                measurementId: "G-TCCYVNW960"
            };
            firebase.initializeApp(firebaseConfig);
           // firebase.analytics();
         }
    };
    checkAuth=()=>{
        firebase.auth().onAuthStateChanged(
            user=>{
                if(!user)
                {
                    firebase.auth().signInAnonymously();
                }
            }
        );
    };
    send=messages=>{
        messages.forEach(item => {
            const message={
                text:item.text,
                timestamp:firebase.database.ServerValue.TIMESTAMP,
                user:item.user
            }
            this.db.push(message)
        });
    };
    parse=message=>{
        const {user,text,timestamp}=message.val()
        const {key:_id}=message
        const createdAt=new Date(timestamp)

        return{
            _id,
            createdAt,
            text,
            user
        };
    };
    get = callback =>
    {
        this.db.on('child_added',snapshot=>callback(this.parse(snapshot)));
    }
    off(){
        this.db.off()
    }
    get db()
    {
        
        return firebase.database().ref("messages");
    }
    getuid()
    {
       
        return(firebase.auth.currentUser || {}).uid
    }
}
export default new Fire();