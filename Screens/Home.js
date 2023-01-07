import { View, Text, Share, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GroupButton from '../Components/GroupButton';
// import { Modal } from 'react-native';
import Modal from 'react-native-modal';
import { assertionError } from '@firebase/util';
import * as Clipboard from 'expo-clipboard';

export default function Home(props) {
    const [todos, setTodos] = useState([]);
    const [userData, setUserData] = useState(props.route.params.user);
    const groupRef = firebase.firestore().collection('groups');
    const usersRef = firebase.firestore().collection('users');

    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    const [groupData, setGroupData] = useState([])
    const [modalGroupCode, setModalGroupCode] = useState('')

    const isFocused = useIsFocused();

    const [isJoinModaVisible, setIsJoinModalVisible] = React.useState(false)

    const [groupCodeError, setGroupCodeError] = useState('')
    // const test = props.test

    // useEffect(() =>
    // {
    //     setAddData(userData.fullName)
    // }, [todos])

    const onJoinGroupPressed = () => {
        groupRef.where('groupCode', '==', modalGroupCode)
        .get()
        .then((snapshot) => {
            // console.log(snapshot.docs.length)    
            if (snapshot.docs.length === 1)
            {
                // add user to group members list
                let doc = snapshot.docs[0].data()
                let id = doc.id
                let members = [...doc.members] // copy of array
                let isAlreadyPartOfGroup = false
                console.log
                if (members.includes(userData.uid))
                {
                    isAlreadyPartOfGroup = true
                    console.log("ID is already in list")
                }               

                // add group to user groups list
                let groups = [...userData.groups];
                let isAlreadyInUser = false
                if (groups.includes(doc.id))
                {
                    isAlreadyInUser = true
                    console.log("group already in user groups")
                }
                
                if (isAlreadyInUser && isAlreadyPartOfGroup)
                {
                    console.log("User already part of this group")
                    setGroupCodeError("You are already part of this group")
                }
                else
                {
                    // push data to backend
                    if (!isAlreadyPartOfGroup)
                    {
                        members.push(userData.uid)
                        groupRef.doc(id).update({members: members})
                    }
                    
                    if(!isAlreadyInUser)
                    {
                        groups.push(doc.id)
                        usersRef.doc(userData.uid)
                        .update({groups: groups})
                    }
                    alert("You joined a new group!")
                    setGroupCodeError('')
                    setIsJoinModalVisible(false)
                    setData()
                    // TODO: navigate to the group view
                }
                
            }
            else if (snapshot.docs.length < 1)
            {
                setGroupCodeError('That code is invalid. Try a different code.')
            }
            else
            {
                setGroupCodeError('Error. Please email an3developer@gmail.com with the group code you tried to use.')
                // alert("Error. Please email an3developer@gmail.com with the group code you tried to use.")
            }
        }).catch((error) => {
            setGroupCodeError(error.toString())
            console.log("Catch group code set", error)
        })
    }

    const onShare = async (groupData) => {
        try {
          const result = await Share.share({
            // title: 'Join ' + groupData.groupName + ' by using this code:',
            message:
              `Join ${groupData.groupName} by using this code: \n${groupData.groupCode}`,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    const onClickCopy = (id) => 
    {
        Clipboard.setStringAsync(id)
    }

    //fetch or read data from firebase
    const fetchGroups = (userData) => {
        // console.log(userData)
        if (userData.groups.length > 0)
        {
            const groupsIds = []
            userData.groups.forEach(element => {
                groupsIds.push(element)
                // console.log(element)
            }); 
            const groupData = []
            // alert("IDS:" + groupsIds)

            // TODO: paginate this in the future.
            groupRef.where('id', 'in', groupsIds).get()
            .then(data => {
                setGroupData([])
                data.docs.forEach((doc) => {
                    // console.log(doc.data().id)
                    const members = doc.data().members
                    // make sure that the group doc has this user in it
                    members.forEach(member => {
                        if (member === userData.uid){
                            // console.log("Member matches")
                            groupData.push(doc.data())
                        }
                    })
                    // console.log("Members for", doc.data().groupName, members)
                })
                setGroupData(groupData)  
            }).catch((error) => {
                console.log(error)
            })
        } 
    }

    const setData = () => {
        usersRef.doc(userData.uid).onSnapshot(dataSnapshot => {
            setUserData(dataSnapshot.data())
            fetchGroups(dataSnapshot.data()) 
          })
    }
    
    useEffect(() => {
        // console.log("Use effect")
        setData()
    }, [isFocused]);

    const onSettingsPressed = () => {
        navigation.navigate('Settings', userData)
    };

    const onPlusPressed = () => {
        navigation.navigate('CreateGroup', userData)
    };

    const onGroupButtonClicked = (data) => {
        // alert(id)
        // console.log("Group with id", id, "was clicked")
        navigation.navigate('GroupView', {groupData: data, userData: userData})
    }

  return (
    
    <SafeAreaView style={styles.entireContainer}>

        <Modal isVisible={isJoinModaVisible} 
            animationIn={'fadeInUp'} 
            animationOut={'fadeOut'}
            // animationOutTiming={2000}
            avoidKeyboard={true}
            onBackdropPress={() => setIsJoinModalVisible(false)}
            backdropOpacity={0.5}
            useNativeDriverForBackdrop={true} //makes animation smooth         
            onBackButtonPress={() => setIsJoinModalVisible(false)}>
            <View style={modalStyles.container}>
                <View style={modalStyles.bg}>
                    <Text style={modalStyles.title}>Join New Group</Text>
                    <TextInput 
                        style={modalStyles.textInput}
                        placeholder='Enter group code'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setModalGroupCode(text)}
                        value={modalGroupCode}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    {groupCodeError != '' && <Text style={modalStyles.error}>{groupCodeError}</Text> }
                    <TouchableOpacity style={modalStyles.button} onPress={() => onJoinGroupPressed()}>
                        <Text style={modalStyles.buttonTitle}>Join Group</Text>    
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <FlatList 
            ListHeaderComponent={
                <View style={styles.container}>
                    <Text style={styles.titleText}>
                        Friend Quotes
                    </Text>

                    <View style={styles.topRightButtons}>
                        <TouchableOpacity onPress={ () => {
                            onPlusPressed();
                        }}>
                            <FontAwesome name="plus-square-o"  style={styles.plus}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => {
                            onSettingsPressed();
                        }}>
                            <FontAwesome name='cog' color={'black'} style={styles.settingsCog}/>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            data={groupData}
            numColumns={1}
            renderItem = { ({item}) => (
                <GroupButton key={item.id} 
                    {...item} 
                    onClickShare={() => onShare(item)}
                    onClickCopy={() => onClickCopy(item.groupCode)}
                    onClick={() => onGroupButtonClicked(item)} />
            )
            }

            ListFooterComponent={
                <TouchableOpacity style={styles.join} onPress={() => {setIsJoinModalVisible(true)}}>
                    <View style={styles.header}>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.joinText}>Join new group?</Text>
                        {/* <FontAwesome name='trash-o' color={'black'} style={styles.trash}/>               */}
                    </View>
                    {/* <Text>Members: {props.members.length}</Text> */}
                </TouchableOpacity>
            }
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    entireContainer: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
        // alignContent: 'center'
    },
    container:{
        padding: 15,
        // marginTop: 30,
        flexDirection: 'row',
        // backgroundColor: 'red',
        justifyContent: 'center',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        
    },
    join: {
      backgroundColor: '#91a1e9',

      marginLeft: 8,
      marginRight: 8,
    //   marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center'
    },
    joinText:{
        fontSize: 16,
        color: 'white',
    },
    topRightButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center' 
    },
    titleText:{
        fontSize: 30,
        color:'black'
    },
    plus:
    {
        fontSize: 40,
        alignSelf: 'center',
        marginRight: 20,
    },
    settingsCog: {
        fontSize: 40,
        // alignSelf: 'center',
        // position: 'absolute',
        // textAlign: 'center',
        // right: 20
    },
    button:{
        height: 47,
        borderRadius: 5,
        backgroundColor:'blue',
        alignItems: 'center',
        justifyContent: 'center'
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
    trash: {
        fontSize: 30
    },
    itemText:{
        fontSize: 100,
        // paddingHorizontal: 10
    }
})

const modalStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'stretch',    
    },
    bg: {
        backgroundColor: '#e6e6e6ff',       
        padding: 20,
        borderRadius: 5,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    title: {
        marginBottom: 10,
        fontSize: 25,
        textAlign: 'center'
    },
    textInput: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button:{
        backgroundColor: "#788eec",
        alignItems: 'center',
        marginHorizontal: 80,
        // marginTop: 5,
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    buttonTitle:
    {
        fontSize: 20,
        color: 'white'
    },
    error: {
        color: "#f32714",
        textAlign: 'center',

    }
})