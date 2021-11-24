import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, KeyboardAvoidingView } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { auth } from './../firebase';
import { db } from './../firebase';
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';



const Home = () => {
    const curremail = auth.currentUser?.email
    const [newCategory, setNewCategory] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [event, setEvent] = useState(0)


    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, 'users');

    const getDatas = async () => {

        const userData = await getDocs(usersCollectionRef);
        setUsers(userData.docs.map((doc) => ({ ...doc.data(), userId: doc.id })))
    };
    //handle adding item
    const creatUser = async () => {
        await addDoc(usersCollectionRef, { email: curremail, category: newCategory, description: newDescription });
    }
    // handle changes 
    useEffect(() => {
        getDatas();

    }, [event]);

    const deleteItem = async (id) => {
        const userDoc = doc(db, 'users', id);
        await deleteDoc(userDoc);
        setEvent(event + 1)
    }

    const confirm = (text, desc) => {
        if (text.length > 0 && desc.length > 0) {
            creatUser();
            setEvent(event + 1)
        } else {
            Alert.alert('Warning!', 'item name or quantity should not be empty', [
                { text: 'click to continue.', onPress: () => console.log('alert closed') }
            ]);
        }

    }

    const navigation = useNavigation()
    return (
        <KeyboardAvoidingView style={styles.styledContainer}>

            <ScrollView tyle={{ width: '100%', backgroundColor: 'transparent', flex: 1, }}>

                <Text style={styles.textTitle}> Categories </Text>

                {users.map((user) => {
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={[styles.contianer, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
                                key={user.userId}
                                onPress={() => navigation.navigate('List')}
                            >
                                <Text style={[styles.textTitle, { width: '25%', fontSize: 12, }]}> {user.category} </Text>
                                <Text style={[styles.text, { width: '50%', fontSize: 12, fontWeight: 'bold' }]}>Description: {user.description}</Text>
                                <View style={{ marginLeft: 50 }} >

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonContianer}
                                onPress={() => { deleteItem(user.userId) }}
                            >
                                <Text style={{ textAlign: 'center' }}> - </Text>
                            </TouchableOpacity>
                        </View>

                    )
                })}

            </ScrollView >

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: 'transparent' }}>
                <TextInput
                    placeholder='Category: '
                    value={newCategory}
                    onChangeText={text => setNewCategory(text)}
                    style={styles.input}>
                </TextInput>
                <TextInput
                    placeholder='Description'
                    value={newDescription}
                    onChangeText={num => setNewDescription(num)}
                    style={{
                        backgroundColor: 'white',
                        width: '50%',
                        height: 50,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderRadius: 10,
                        marginTop: 8,
                        marginRight: 10,
                    }}>
                </TextInput>
                <TouchableOpacity style={styles.buttonContianer}
                    onPress={() => { confirm(newCategory, newDescription) }}
                >
                    <Text style={{ textAlign: 'center' }}> + </Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}

export default Home;

const styles = StyleSheet.create({
    styledContainer: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0782F9',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },


    textTitle: {
        fontSize: 15,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#191919',
        margin: 10,
        marginLeft: 10,

    },
    text: {
        fontSize: 12,

        marginLeft: 20,
    },
    contianer: {
        width: (Dimensions.get("window").width - 100),
        height: 80,
        backgroundColor: '#fff',
        marginLeft: 5,
        marginRight: 5,
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
        marginBottom: 8,
        marginTop: 8,
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
        width: '25%',
        height: 50,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 8,
        marginRight: 10,
    },

})
