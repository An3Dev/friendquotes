import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/themed/dist/Divider';
import { Entypo } from '@expo/vector-icons';
import GroupCustomHeader from '../Components/GroupCustomHeader';
import GroupCustomHeaderButtons from '../Components/GroupCustomHeaderButtons';
// import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
// import { KeyboardAvoidingView,  } from 'react-native';
import MessageInputBox from '../Components/MessageInputBox';
export default function GroupView(props) {
    // const [todos, setTodos] = useState([]);
    // const userData = props.route.params.user;
    const [groupData] = useState(props.route.params.groupData);
    const groupRef = firebase.firestore().collection('groups');
    // const [addData, setAddData] = useState('');
    const navigation = useNavigation();
    let listRef;

  useEffect(() => {
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
    
  }
  return (
    <View style={styles.container} >
            <FlatList 
                // enableAutomaticScroll={true}
                ref={(ref) => {
                    listRef = ref
                }}
                enableOnAndroid={true}
                showsVerticalScrollIndicator={true}
                data={[{id: 'a', groupName: 'a'}, 
                {id: 'b', groupName: 'b'}, 
                {id: 'c', groupName: 'c'},
                {id: 'd', groupName: 'd'}, 
                {id: 'e', groupName: 'e'}, 
                {id: 'f', groupName: 'f'},
                {id: 'g', groupName: 'g'}, 
                {id: 'h', groupName: 'h'}, 
                {id: 'i', groupName: 'i'},
                {id: 'j', groupName: 'j'}, 
                {id: 'k', groupName: 'k'}, 
                {id: 'l', groupName: 'l'}]}
                style={styles.flatList}
                contentContainerStyle={{marginTop: 10}}
                numColumns={1}
                renderItem = { ({item}) => (
                    <View>
                        <Pressable style={styles.item}>
                            <Text styles={styles.itemText}>
                                {item.groupName}
                            </Text>
                        </Pressable>
                    </View>
                )}
            />       

        <View style={styles.keyboardAvoidingView}>
            <MessageInputBox onSendButtonClicked={onSendButtonClicked()} />
        </View>
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
        backgroundColor: 'transparent',
    }
})