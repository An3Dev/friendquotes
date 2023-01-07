import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/themed/dist/Divider';
import { Entypo } from '@expo/vector-icons';
import GroupCustomHeader from '../Components/GroupCustomHeader';
import GroupCustomHeaderButtons from '../Components/GroupCustomHeaderButtons';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
// import { KeyboardAvoidingView,  } from 'react-native';
import MessageInputBox from '../Components/MessageInputBox';
import QuoteMessage from '../Components/QuoteMessage';
// import KeyboardSpacer from 'react-native-keyboard-spacer';
// import { KeyboardAvoidingView } from 'react-native';
export default function GroupView(props) {
    const [userData] = useState(props.route.params.userData)
    const [groupData] = useState(props.route.params.groupData);
    const [messagesData, setMessagesData] = useState([]);
    const flatListRef = useRef(null);

    const groupRef = firebase.firestore().collection('groups');
    const messagesRef = firebase.firestore().collection('message').doc(groupData.id).collection('messages')
    // const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    const [isRefreshingList, setIsRefreshingList] = useState(false)
    

    const getMessages = (snapshot) => {
        // let data = [...messagesData]
        let data = []
        snapshot.docs.forEach(doc => {
            data.push(doc.data())
        })
        setMessagesData(data)
        console.log(data) 
    }

    const sendMessage = 

  useEffect(() => {
    messagesRef.orderBy('sentAt').limit(10).onSnapshot(snapshot => {  
        getMessages(snapshot)   
    })
    navigation.setOptions({
        headerTitle: 
            () => <GroupCustomHeader 
                {...groupData} 
                isHeader={true}>{groupData.groupName}</GroupCustomHeader>,
        headerRight: 
            () => <GroupCustomHeaderButtons {...groupData} onGroupSettingsButtonClicked={() => onGroupSettingsButtonClicked()}></GroupCustomHeaderButtons>
        })
  }, [])  



  const onGroupSettingsButtonClicked = () => 
  {
    alert("Group settings button clicked")
  }

  const onTextChange = () => 
  {
    
  }

  const onSendButtonClicked = () => 
  {
    console.log(flatListRef.current)
    flatListRef.current.scrollToEnd()   
  }

  const onScroll = (event) => {
    let scrollOffset = event.nativeEvent.contentOffset.y
    if (scrollOffset < 100 && !isRefreshingList)
    {
        console.log("Reached top")
        setIsRefreshingList(true)
        // load 10 older messages
    }
    // console.log(scrollOffset)
    // flatListRef.current?.scrollToEnd()
    // .scrollToIndex(animated=false, index=0.5)
  }

  const onEndReached = () => 
  {
    console.log("Reached end")
    setIsRefreshingList(true)
  }
  return (
    <View style={styles.container} >
        {/* <TextInput><Text>Test</Text></TextInput> */}
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
            <FlatList              
                enableAutomaticScroll={true}
                ref={flatListRef}
                enableOnAndroid={true}
                showsVerticalScrollIndicator={true}
                onEndReached={() => onEndReached()}
                onEndReachedThreshold={0.1}
                // inverted={true}
                onScroll={(event) => onScroll(event)}
                data={messagesData}
                // data={[{id: 'a', groupName: 'a'}, 
                // {id: 'b', groupName: 'b'}, 
                // {id: 'c', groupName: 'c'},
                // {id: 'd', groupName: 'd'}, 
                // {id: 'e', groupName: 'e'}, 
                // {id: 'f', groupName: 'f'},
                // {id: 'g', groupName: 'g'}, 
                // {id: 'h', groupName: 'h'}, 
                // {id: 'i', groupName: 'i'},
                // {id: 'j', groupName: 'j'}, 
                // {id: 'k', groupName: 'k'}, 
                // {id: 'l', groupName: 'l'}]}
                refreshing={isRefreshingList}
                style={styles.flatList}
                contentContainerStyle={{marginTop: 10}}
                numColumns={1}                
                renderItem = { ({item}) => (
                    <QuoteMessage key={item.id} {...item} userData={userData}/>
                )}
            />  
        </KeyboardAvoidingView>
                 
            {/* <Text>Ttest</Text> */}
        {/* <View style={styles.keyboardAvoidingView}> */}
            <MessageInputBox onSendButtonClicked={() => onSendButtonClicked()} />
        {/* </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'red',
        // justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'rgba(0, 0, 0, 0)'
        // paddingTop: 10
    },
    flatList: {
        // marginTop: 10
        // backgroundColor: 'blue',
        // flex: 1
    },
    item: {
        height: 100,
        backgroundColor: '#cccccc',
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        // justifyContent: 'space-around',
    },
    itemText:{
        fontSize: 100,
        // paddingHorizontal: 10
    },
    keyboardAvoidingView: {
        // backgroundColor: 'transparent',
        flex: 1
    }
})