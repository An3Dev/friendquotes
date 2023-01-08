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
import { sendFirebaseQuote } from '../Utilities/SendFirebaseQuote';
import CustomHeader from '../Components/CustomHeader';
import LabelToggleTextInput from '../Components/LabelToggleTextInput';
// import { takeOrPickImage } from '../Utilities/ImageTakerAndPicker';
import * as ImagePicker from 'expo-image-picker';

export function takeOrPickImage({shouldTake, requestPermission}, resolve)
{
    // console.log("Test")
    
    if (shouldTake) {
        requestPermission().then((permission) => {
            if (permission.granted.valueOf() == false)
            {
                alert("Camera permission denied")
                resolve(false)
                return
            }
            ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: false,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            }).then((result) => {
                console.log('Result:', result);       
                if (!result.canceled) {
                    resolve(result.assets[0]);
                }
            }).catch((reason) => {
                console.log("Reason: ", reason)
            })
        
                         
        }).catch((error) => {
            console.log(error)
        })
    }
    else {
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            }).then((result) => {
                // console.log(result);
    
                if (!result.canceled) {
                    resolve(result.assets[0]);
                } 
            })        
    }
} 