import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/themed/dist/Divider';
import { Entypo } from '@expo/vector-icons';
import GroupCustomHeader from '../Components/GroupCustomHeader';
import GroupCustomHeaderButtons from '../Components/GroupCustomHeaderButtons';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
// import { KeyboardAvoidingView,  } from 'react-native';
import MessageInputBox from '../Components/MessageInputBox';
import QuoteMessage from '../Components/QuoteMessage';
import { customAlphabet } from 'nanoid';

export function sendFirebaseMessage({message, groupData, userData}) {
    const messagesRef = firebase.firestore().collection('message').doc(groupData.id).collection('messages')
    let timestamp = firebase.firestore.FieldValue.serverTimestamp()
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const nanoid = customAlphabet(alphabet, 20);
    const id = nanoid() //=> "5VTDOfg2"

    let data = {
        id, 
        quote: message, 
        sentAt: timestamp, 
        sentBy: userData.uid, 
        sentByName: userData.displayName, 
        type: 2        
    }
    console.log("Send message", data)

    messagesRef.doc(id)
    .set(data)
    .then((response) => {
        response
    }).catch((error) => {
        alert("Error sending message. " + error)
    })
}