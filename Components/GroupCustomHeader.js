import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const GroupCustomHeader = (props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>{props.groupName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //  backgroundColor: 'black'
    },
    title: {
        fontSize: 25
    },
    menu: {
        position: 'absolute',
        right: 0,
        // marginTop: 8,
        // padding: 40,

        paddingTop: 0,
        paddingRight: 0
    },
    menuOption: {
        // padding: 10
    },
})

export default GroupCustomHeader