import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { firebase } from '../config';
import { customAlphabet } from 'nanoid';
import * as storage from 'firebase/storage';


export function sendFirebaseQuote({data, groupData, userData}, resolve) {
    const messagesRef = firebase.firestore().collection('message').doc(groupData.id).collection('messages')
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const nanoid = customAlphabet(alphabet, 20);
    const id = nanoid() //=> "5VTDOfg2"

    const uploadUri = Platform.OS === 'ios' ? data.localImageUrl.replace('file://', '') : data.localImageUrl;
    // console.log("test")

    let additionalData = {
        id: id,  
        sentAt: timestamp, 
        sentBy: userData.uid, 
        sentByName: userData.displayName, 
        ...data
        // type: data.type,
        // imageUrl: data.imageUrl,
        // quote: data.quote,
        // saidBy: data.saidBy,      
    }

    // storage.getStorage
    // let filename = id;
    // const task = storage()
    // .ref(filename)
    // .putFile(uploadUri)

    additionalData = {...data}
    console.log("Send quote", additionalData)
    messagesRef.doc(id)
    .set(additionalData)
    .then((response) => {
        resolve(true)
    }).catch((error) => {
        alert("Error sending message. " + error)
        resolve(false)
    })

    // resolve(true)
    
}