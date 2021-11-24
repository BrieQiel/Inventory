import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, KeyboardAvoidingView } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { auth } from './../firebase';
import { db } from './../firebase';
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';


const List = () => {

    const curremail = auth.currentUser?.email;


    const [newItems, setNewItems] = useState('')
    const [newQuantity, setNewQuantity] = useState(0)

    const [event, setEvent] = useState(0)


    const [items, setItems] = useState([]);
    const itemCollectionRef = collection(db, 'items');

    const getDatas = async () => {

        const itemData = await getDocs(itemCollectionRef);
        setItems(itemData.docs.map((doc) => ({ ...doc.data(), itemId: doc.id })))
    };

    // handle changes 
    useEffect(() => {
        getDatas();

    }, [event]);

    //handle adding item
    const creatUser = async () => {
        await addDoc(itemCollectionRef, { email: curremail, item: newItems, quantity: Number(newQuantity) });
    }
    // handle deleting item

    const deleteItem = async (id) => {
        const userDoc = doc(db, 'items', id);
        await deleteDoc(userDoc);
        setEvent(event + 1)
    }

    const confirm = (text, num) => {
        if (text.length > 0 && (num != '' && num != null && num > 0)) {
            creatUser();
            setEvent(event + 1)
        } else {
            Alert.alert('Warning!', 'item name or quantity should not be empty', [
                { text: 'click to continue.', onPress: () => console.log('alert closed') }
            ]);
        }

    }

    return (
        <KeyboardAvoidingView style={styles.styledContainer}>


            <ScrollView tyle={{ width: '100%', backgroundColor: 'transparent', flex: 1, }}>
                <Text style={styles.textTitle}> Item's List  </Text>

                {items.map((item) => {
                    return (

                        <View style={[styles.contianer, { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }]}
                            key={item.itemId}
                        >
                            <Text style={[styles.textTitle, { width: '25%', fontSize: 12, }]}>Item: {item.item} </Text>
                            <Text style={[styles.text, { width: '25%', fontSize: 12, fontWeight: 'bold' }]}>Stack: {item.quantity}</Text>
                            <View style={{ marginLeft: 50 }} >
                                <TouchableOpacity style={styles.buttonContianer}
                                    onPress={() => { deleteItem(item.itemId) }}
                                >
                                    <Text style={{ textAlign: 'center' }}> - </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    )
                })}
            </ScrollView>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: 'transparent' }}>
                <TextInput
                    placeholder='Item'
                    value={newItems}
                    onChangeText={text => setNewItems(text)}
                    style={styles.input}>
                </TextInput>
                <TextInput
                    placeholder='Quantity'
                    keyboardType='numeric'
                    value={newQuantity}
                    onChangeText={num => setNewQuantity(num)}
                    style={{
                        backgroundColor: 'white',
                        width: '25%',
                        height: 50,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderRadius: 10,
                        marginTop: 8,
                        marginRight: 10,
                    }}>
                </TextInput>
                <TouchableOpacity style={styles.buttonContianer}
                    onPress={() => { confirm(newItems, newQuantity) }}
                >
                    <Text style={{ textAlign: 'center' }}> + </Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>

    )
}

export default List

const styles = StyleSheet.create({
    styledContainer: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },


    textTitle: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#191919',
        margin: 5,
        marginLeft: 20,

    },
    text: {
        fontSize: 12,

        marginLeft: 20,
    },
    contianer: {
        justifyContent: 'center',
        width: (Dimensions.get("window").width - 40),
        height: 80,
        backgroundColor: '#fff',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 8,
        marginTop: 8,
        borderRadius: 10,
        padding: 5,
        borderColor: '#0782F9',
        shadowColor: '#000',
        shadowOffset: {
            height: 6,
            width: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 7.49,
        elevation: 20

    },
    buttonContianer: {
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        margin: 8,
        borderRadius: 90,
        marginTop: 5,
        borderColor: '#6D28D9',
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: {
            height: 6,
            width: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 7.49,
        elevation: 20,


    },
    input: {
        backgroundColor: 'white',
        width: '50%',
        height: 50,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 8,
        marginRight: 10,
    },

})
