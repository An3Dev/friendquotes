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
import { sendFirebaseMessage } from '../Components/SendFirebaseMessage';
import CustomHeader from '../Components/CustomHeader';

const CreateQuote = (props) => {
    const [userData] = useState(props.route.params.userData)
    const [groupData] = useState(props.route.params.groupData);

    const initialData = {imageUrl: '', quote:'The most exceptional quote', saidBy: '', sentBy: userData.uid, sentByName: userData.displayName, type: 1}
    const [currentQuoteData, setCurrentQuoteData] = useState(initialData)
    const navigation = useNavigation()
    
    useEffect(() => {
        // console.log(currentQuoteData)
        navigation.setOptions({
            headerTitle: 
                () => <CustomHeader name={'Create quote'}/>,
            // headerRight: 
            //     () => <GroupCustomHeaderButtons 
            //         {...groupData} 
            //         onGroupSettingsButtonClicked={() => onGroupSettingsButtonClicked()}
            //         onClickFilter />
            })
      }, [])  

  return (
    <View style={styles.container}>
      <Text style={styles.previewText}>Preview:</Text>
      <QuoteMessage {...currentQuoteData} userData/>
    </View>
  )
}

export default CreateQuote

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'black',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1
    },
    previewText: {
        fontSize: 25,      
        padding: 10
    }
})