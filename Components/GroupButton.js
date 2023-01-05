import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

export default function GroupButton(props) {
   

  return (
    <View>
        <TouchableOpacity style={styles.container} onPress={() => props.onClick()}>
            <View style={styles.header}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.title}>{props.groupName}</Text>
                <FontAwesome name='trash-o' color={'white'} style={styles.trash}/>              
            </View>
            <Text style={styles.members}>Members: {props.members.length}</Text>
        </TouchableOpacity>
        
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 120,
        backgroundColor: "#7da6ff", 
        padding: 10,
        marginHorizontal: 8,
        marginBottom: 10,
        borderRadius: 10,
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',    
        justifyContent: 'center',
        // textAlign: 'right'
    },
    trash: {
        position:'absolute',
        right: 0
    },
    title: {
        fontSize: 20,
        alignSelf: 'stretch',
        maxWidth: 300,
        fontWeight: 'bold',
        color: 'white'
    },
    members: {
        color: 'white'
    }
})