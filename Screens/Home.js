import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GroupButton from '../Components/GroupButton';
export default function Home(props) {
    const [todos, setTodos] = useState([]);
    const userData = props.route.params.user;
    const groupRef = firebase.firestore().collection('groups');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    const [groupData, setGroupData] = useState([])
    // const test = props.test

    // useEffect(() =>
    // {
    //     setAddData(userData.fullName)
    // }, [todos])
    //fetch or read data from firebase
    useEffect(() => 
        {     
            // console.log("Data: " + userData.groups)
            if (userData.groups.length > 0)
            {
                const groupsIds = []
                // console.log(typeof(userData.groups))
                userData.groups.forEach(element => {
                    groupsIds.push(element)
                    // console.log(element)
                });
                // console.log("GROUP ID", groupsIds);
                const groupData = []
                // groupsIds.forEach(id => {
                //     console.log("ID: ", id)
                //     groupRef.doc(id).get()
                //     .then(firestoreDocument => {            
                //         groupData.push(firestoreDocument.data());
                //     }).catch((e) => {
                //         console.log("Error retrieving" + e)
                //     }).then(() => {
                //         console.log(groupData)
                //         setGroupData(groupData)
                //     })
                // })
                // alert(groupsIds)
                // groupRef.get().then((data) => {
                //     data.docs.forEach(doc => {
                //         console.log(doc.data())
                //     })   
                // })
                
                // TODO: paginate this in the future.
                groupRef.where('id', 'in', groupsIds).get()
                .then((data) => {
                    data.docs.forEach((doc) => {
                        console.log(doc.data().id)
                        groupData.push(doc.data())
                    })
                    setGroupData(groupData)
                }).catch((error) => {
                    alert(error)
                })
            }   
        }, [])

    const deleteTodo = (todos) => {
        groupRef
        .doc(todos.id)
        .delete()
        .then(() => {
            // show successful deletion
            alert("Delete Successfully")
        })
        .catch( error => {
            alert(error);
        })
    }

    //add a todo
    const addTodo =  () => {
        alert(addData.length)
        if (addData && addData.length > 0)
        {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const {description, heading, interval, use_intervals, time_to_remind, is_done} = addData;
            const data = {
                uid: userData.id,
                heading: heading,
                description: description,
                interval: interval,
                use_intervals: use_intervals,
                time_to_remind: time_to_remind, 
                is_done: is_done,
                timestamp: timestamp
            };
            

            groupRef
                .add(data)
                .then(() => {
                    setAddData('');
                    Keyboard.dismiss();
                })
                .catch((error) => 
                {
                    alert(error);
                })
        }
    }
    
    const onSettingsPressed = () => {
        navigation.navigate('Settings')
    };

    const onPlusPressed = () => {
        navigation.navigate('CreateGroup')
    };

    const onGroupButtonClicked = (id) => {
        alert(id)
        console.log("Group with id", id, "was clicked")
    }
  return (
    
    <View style={{flex: 1}}>
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
        <FlatList 
            // styles={{backgroundColor: 'black'}}
            data={groupData}
            numColumns={1}
            renderItem = { ({item}) => (
                <GroupButton key={item.id} {...item} onClick={() => onGroupButtonClicked(item.id)} />
                // <View>
                //     <TouchableOpacity style={styles.item} 
                //         onPress={() => {
                //             onGroupButtonClicked(item.id)
                //     }}>
                //         {/* <FontAwesome name='trash-o' color={'red'} style={styles.trash}/>               */}
                        
                //         <Text styles={styles.itemText}>
                //             {item.groupName}
                //         </Text>
                //         <Text styles={styles.itemText}>
                //             {item.lastQuote}
                //         </Text>
                //     </TouchableOpacity>
                    
                // </View>
            ) 
            }
        />
    </View>
  )
}

const styles = StyleSheet.create({
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