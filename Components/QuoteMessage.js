import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { storage } from '../config';
import { getDownloadURL, ref } from 'firebase/storage';

const QuoteMessage = ({dateSaid, description, imageUrl, quote, saidBy, sentAt, sentBy, sentByName, type, userData}) => {
    const [downloadImageUrl, setDownloadImageUrl] = useState()
    // const pathRef = ref(storage, `/${imageUrl}`)
    useEffect(() =>{
        // console.log(userData.uid === sentBy ? 1 : 2)
        if (imageUrl != undefined && imageUrl != '')
        {
            getDownloadURL(ref(storage, imageUrl)).then((url) => {
                setDownloadImageUrl(url)
            }).catch((error) => {
                alert(error)
            })
        }
        else
        {
            setDownloadImageUrl('')
        }
        
    }, [])

    const ownMessage = () => {
        return(
            <View style={styles.messageContainer}>
                {/* <Text style={{alignSelf: 'flex-start'}}>Test</Text>                 */}
                <Pressable style={styles.message}>
                    { downloadImageUrl != '' && <Image source={{uri: downloadImageUrl}} 
                        style={styles.image}
                        resizeMode={'contain'}/> }
                    <Text style={styles.messageText}>
                        { quote }
                    </Text>
                </Pressable>         
            </View>
        )
    }

    const otherMessage = () => {
        return(
            <View style={{flex: 1}}>
                <Text style={styles.sentByName}>{sentByName}</Text>
                <View style={styles.otherMessageContainer}>
                    <Pressable style={styles.otherMessage}>
                        { downloadImageUrl != '' && <Image source={{uri: downloadImageUrl}} 
                            style={styles.image}
                            resizeMode={'contain'}/> }
                        <Text style={styles.messageText}>
                            { quote }
                        </Text>
                    </Pressable>         
                </View>
            </View>)
        
    }

    return (
        <View>
            { type == 1 &&
                <View style={styles.container}>
                    <Text style={styles.sentByName}>{sentByName}</Text>
                    
                    <Pressable style={styles.quote}>
                        { downloadImageUrl != '' && <Image source={{uri: downloadImageUrl}} 
                            style={styles.image}
                            resizeMode={'contain'}/> }
                        <Text style={styles.quoteText}>
                        { saidBy ? `"${quote}" - ${saidBy}` : `"${quote}" - Anonymous` }
                        </Text>
                    </Pressable>         
                </View>
            }
            {
                type == 2 && (userData.uid === sentBy ? ownMessage() : otherMessage())
            }
        </View>
    )
}



export default QuoteMessage

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'column'
    },
    messageContainer: {
        flex: 1, 
        flexDirection: 'column',        
        alignItems: 'flex-end',
        // marginRight: 10,
        // maxWidth: 300,
    },
    otherMessageContainer: {
        flex: 1, 
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
        // maxWidth: 300
    },
    quote: {
        // height: 100,
        backgroundColor: '#cccccc',
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
    quoteText:{
        fontSize: 20,
    },
    message: {
        backgroundColor: '#efb9b9',
        padding: 10,
        marginRight: 10,
        borderRadius: 20,
        maxWidth: 300,
        alignItems: 'flex-start',
    },
    otherMessage: {
        backgroundColor: '#cccccc',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flexDirection: 'column',
        maxWidth: 300,
    },
    messageText: {
        textAlign: 'left',
        fontSize: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
    sentByName: {
        marginLeft: 15,
        fontSize: 17,
        alignSelf: 'flex-start'
    },
})