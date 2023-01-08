import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { firebase } from '../config';
import { customAlphabet } from 'nanoid';

export function sendFirebaseQuote({data, groupData, userData}, resolve) {
    const messagesRef = firebase.firestore().collection('message').doc(groupData.id).collection('messages')
    let timestamp = firebase.firestore.FieldValue.serverTimestamp()
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const nanoid = customAlphabet(alphabet, 20);
    const id = nanoid() //=> "5VTDOfg2"

    // console.log("test")
    let additionalData = {
        id,  
        sentAt: timestamp, 
        sentBy: userData.uid, 
        sentByName: userData.displayName, 
        type: 2        
    }

    additionalData = {...data}
    console.log("Send quote", additionalData)
    resolve(true)
    // messagesRef.doc(id)
    // .set(additionalData)
    // .then((response) => {
    //     resolve(true)
    // }).catch((error) => {
    //     alert("Error sending message. " + error)
    //     resolve(false)
    // })
}