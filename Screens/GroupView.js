import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function GroupView(props) {
    // const [todos, setTodos] = useState([]);
    // const userData = props.route.params.user;
    const groupRef = firebase.firestore().collection('groups');
    // const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    const [groupData, setGroupData] = useState([])  
    
  return (
    
    <View style={{flex: 1}}>
        <View style={styles.container}>
            <Text style={styles.titleText}>
                Friend Quotes
            </Text>
            <TouchableOpacity onPress={ () => {
                onSettingsPressed();
            }}>
                <FontAwesome name='cog' color={'black'} style={styles.settingsCog}/>
            </TouchableOpacity>
          
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
                <View>
                    <TouchableOpacity style={styles.item} 
                        onPress={() => {
                            onGroupButtonClicked(item.id)
                    }}>
                        {/* <FontAwesome name='trash-o' color={'red'} style={styles.trash}/>               */}
                        <Text styles={styles.itemText}>
                            {item.groupName}
                        </Text>
                    </TouchableOpacity>
                    
                </View>
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
    titleText:{
        fontSize: 30,
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