import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from '@rneui/themed/dist/Divider';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { Entypo } from '@expo/vector-icons';
import GroupCustomHeader from '../Components/GroupCustomHeader';
import GroupCustomHeaderButtons from '../Components/GroupCustomHeaderButtons';

import MenuButton from '../Components/MenuButton';
export default function GroupView(props) {
    // const [todos, setTodos] = useState([]);
    // const userData = props.route.params.user;
    const [groupData] = useState(props.route.params.groupData);
    const groupRef = firebase.firestore().collection('groups');
    // const [addData, setAddData] = useState('');
    const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
        headerTitle: 
            () => <GroupCustomHeader 
                {...groupData} 
                isHeader={true}>{groupData.groupName}</GroupCustomHeader>,
        headerRight: 
            () => <GroupCustomHeaderButtons {...groupData}></GroupCustomHeaderButtons>
        })
  }, [])  
  return (
    <View style={{flex: 1}}>
        <View style={styles.container}>
            {/* <Text style={styles.titleText}>
                {groupData.groupName}
            </Text>
            <Menu style={styles.menu}>
                <MenuTrigger
                    // text="Click for Option menu"
                    customStyles={{ vv
                    triggerWrapper: {
                        top: 0,
                        // padding: 20,
                        paddingRight: 0,
                        paddingTop: 0
                    },   
                    }}>
                    <Entypo name="dots-three-vertical" size={20} color="black"/>

                </MenuTrigger>
                <MenuOptions>
                    <MenuOption style={styles.menuOption} onSelect={() => onSharePress()} text="Share" />
                    <MenuOption style={styles.menuOption} onSelect={() => onClickCopy()} text="Copy Group Code" />
                    
                    {/* <MenuOption onSelect={() => alert(`Delete`)} text="Delete" /> */}
                {/* </MenuOptions> */}
            {/* </Menu> */}
        </View>
        {/* <Divider width={2} color={'black'}/> */}
        <FlatList 
            data={groupData}
            numColumns={1}
            renderItem = { ({item}) => (
                <View>
                    <TouchableOpacity style={styles.item} 
                        onPress={() => {
                            onGroupButtonClicked(item.id)
                    }}>
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
        paddingBottom: 0,
        // marginTop: 30,
        marginBottom: 10,
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
    menu: {
        // position: 'absolute',
        // right: 0,
        marginTop: 8,
        // padding: 40,

        paddingTop: 0,
        paddingRight: 0
    },
    menuOption: {
        // padding: 10
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