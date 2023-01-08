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
import { sendFirebaseQuote } from '../Components/SendFirebaseQuote';
import CustomHeader from '../Components/CustomHeader';
import LabelToggleTextInput from '../Components/LabelToggleTextInput';
const CreateQuote = (props) => {
    const [userData] = useState(props.route.params.userData)
    const [groupData] = useState(props.route.params.groupData);

    const [quote, setQuote] = useState('')
    const [saidBy, setSaidBy] = useState('')
    const [dateSaid, setDateSaid] = useState('')

    const [enableSaidBy, setEnableSaidBy] = useState(true)

    const[data, setData] = useState({quote, saidBy, dateSaid, type: 2})

    // let data = 
    //     {   imageUrl: '', 
    //         quote:'The most exceptional quote.', 
    //         saidBy: '', 
    //         sentBy: userData.uid, 
    //         sentByName: userData.displayName, 
    //         type: 1
    //     }
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

      useEffect(() => {
        var tempQuote = quote
        if (quote == '')
        {
            tempQuote = 'An exceptional quote.'
        }
        
        let saidByTemp = ''
        saidByTemp = enableSaidBy == true ? saidBy : '';
        if (enableSaidBy == true && saidBy === '')
        {
            saidByTemp = 'Anonymous'
        }
        const newData = {
            imageUrl: '', 
            quote: tempQuote, 
            saidBy: saidByTemp, 
            sentBy: userData.uid, 
            sentByName: userData.displayName, 
            type: 1
        }
        console.log("New data:", newData)
        setData(newData)
      }, [quote, saidBy, dateSaid, enableSaidBy] )


    const onSendQuotePressed = () => {
        const promise = new Promise((resolve, reject) => sendFirebaseQuote({data, userData, groupData}, resolve, reject))
        .then((didSucceed) => 
        {
            console.log("Did succeed(create quote)", didSucceed)
            
        }).catch((error) => {
            console.log("Catch", error)
        })
    }
    
  return (
    <View style={styles.container}>
        <Text style={styles.previewText}>Preview:</Text>
        <View style={styles.previewContainer}>
            <QuoteMessage {...data} userData={userData} />
        </View>


        <LabelToggleTextInput
            // onCheckStateChange={(checked) => setEnableSaidBy(checked)}
            label={'Quote:'}
            disableToggle={true}
            onChangeText={(text) => setQuote(text)}          
            placeholder='An exceptional quote.'
            placeholderTextColor="#aaaaaa"
            value={quote}
            underlineColorAndroid="transparent"
            autoCapitalize="true"
        />

        <LabelToggleTextInput
            onCheckStateChange={(checked) => setEnableSaidBy(checked)}
            label={'Said by:'}
            onChangeText={(text) => setSaidBy(text)}   
            placeholder='Anonymous'
            placeholderTextColor="#aaaaaa"
            value={saidBy}
            underlineColorAndroid="transparent"
            autoCapitalize="true"
        />

        {/* <LabelToggleTextInput
            onCheckStateChange={(checked) => setEnableSaidBy(checked)}
            label={'Date said:'}
            onChangeText={(text) => setSaidBy(text)}   
            placeholder='Anonymous'
            placeholderTextColor="#aaaaaa"
            value={saidBy}
            underlineColorAndroid="transparent"
            autoCapitalize="true"
        />

        <LabelToggleTextInput
            onCheckStateChange={(checked) => setEnableSaidBy(checked)}
            label={'Upload image'}
            onChangeText={(text) => setSaidBy(text)}   
            placeholder='Anonymous'
            placeholderTextColor="#aaaaaa"
            value={saidBy}
            underlineColorAndroid="transparent"
            autoCapitalize="true"
        /> */}

        <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSendQuotePressed()}>
                    <Text style={styles.buttonText}>Send Quote</Text>
                </TouchableOpacity>
            {/* <TextInput
                style={styles.input}
                placeholder='E-mail'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            /> */}
    </View>
  )
}

export default CreateQuote

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'black',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    previewContainer: {
        flexDirection: 'row',
        paddingVertical: 30,
        // justifyContent: 'center',
        alignItems: 'flex-start',
        // minHeight: 100,    
        // flex: 1,
        // flexShrink: 1,
        // flexGrow: 1,
        borderColor: '#4b8bfa',
        borderWidth: 1,
        marginHorizontal: 5
    },
    previewText: {
        fontSize: 25,      
        padding: 10
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    }
})