import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GroupButton from '../Components/GroupButton';
export default function Home(props) {
    const [todos, setTodos] = useState([]);
    const [userData, setUserData] = useState(props.route.params.user);
    const groupRef = firebase.firestore().collection('groups');
    const usersRef = firebase.firestore().collection('users');

    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    const [groupData, setGroupData] = useState([])

    const isFocused = useIsFocused();
    // const test = props.test

    // useEffect(() =>
    // {
    //     setAddData(userData.fullName)
    // }, [todos])
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
        console.log("Use effect")
        setData()
    }, [isFocused]);

    const onSettingsPressed = () => {
        navigation.navigate('Settings', userData)
    };

    const onPlusPressed = () => {
        navigation.navigate('CreateGroup', userData)
    };

    const onGroupButtonClicked = (id) => {
        alert(id)
        console.log("Group with id", id, "was clicked")
    }
  return (
    
    <View style={styles.entireContainer}>
            
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
                        
                    
                        {/* <TouchableOpacity style={styles.button} onPress={() => {
                                addTodo()
                            }
                        } /> */}
                    </View>
                }
                // styles={{backgroundColor: 'black'}}
                data={groupData}
                numColumns={1}
                renderItem = { ({item}) => (
                    <GroupButton key={item.id} 
                        {...item} 
                        onClick={() => onGroupButtonClicked(item.id)} />
                ) 
                }

                ListFooterComponent={
                    <TouchableOpacity style={styles.join} onPress={() => {}}>
                        <View style={styles.header}>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.joinText}>Join new group?</Text>
                            {/* <FontAwesome name='trash-o' color={'black'} style={styles.trash}/>               */}
                        </View>
                        {/* <Text>Members: {props.members.length}</Text> */}
                    </TouchableOpacity>
                }
            />
    </View>
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
        marginTop: 30,
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

      marginLeft: 20,
      marginRight: 20,
    //   marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center'
    },
    joinText:{
        fontSize: 16
    },
    topRightButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center' 
    },
    titleText:{
        fontSize: 30,
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