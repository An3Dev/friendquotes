import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
const MessageInputBox = () => {
  const [message, setMessage] = useState('')
  return (
    <View style={styles.container}>   
        <TextInput
            autoFocus={true}
            style={styles.input}
            placeholder='Message'
            placeholderTextColor="#393939"
            onChangeText={(text) => setMessage(text)}
            value={message}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            multiline={true}
            numberOfLines={2}
        />
      

        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.sendButton}>
                <Text style={{color: 'white'}}>Send</Text>
            </TouchableOpacity>
        </View>
        
    </View>
  )
}

export default MessageInputBox

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#dcdcdc',      
        borderRadius: 10,
        margin: 10,
        marginBottom: 3,
        padding: 5,
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexShrink: 1,
    },
    input: {
        fontSize: 15,
        // marginVertical: 10,
        paddingLeft: 10,
        flexShrink: 1
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginRight: 10
    },
    sendButton: {
        backgroundColor: '#546ee3',
        justifyContent: 'center',
        borderRadius: 10,
        paddingHorizontal: 20,
        marginVertical: 2
    }
    
})