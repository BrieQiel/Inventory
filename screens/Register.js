import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../firebase';
import { db } from './../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Signup = () => {
    const navigation = useNavigation()

    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newName, setNewName] = useState('')

    const userCollectionRef = collection(db, 'users');
    const itemCollectionRef = collection(db, 'items');

    const creatUser = async () => {
        await addDoc(userCollectionRef, { email: newEmail, name: newName });

    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Welcome")
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, newEmail, newPassword);
            creatUser();
        } catch (error) {
            alert(error?.message)
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.styledContainer}
            behavior="height"
        >

            <Text style={styles.pageTitle}>Register</Text>

            <View style={styles.innerContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Email'
                        value={newEmail}
                        onChangeText={(text) => setNewEmail(text)}
                        style={styles.input}
                    />
                    <View style={styles.line} />
                    <TextInput
                        placeholder='Password'
                        value={newPassword}
                        onChangeText={(text) => setNewPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                    <View style={styles.line} />
                    <TextInput
                        placeholder='Name'
                        value={newName}
                        onChangeText={(text) => setNewName(text)}
                        style={styles.input}
                    />
                    <View style={styles.line} />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleSignUp}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Register </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Signup


const styles = StyleSheet.create({
    styledContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0782F9',

    },
    innerContainer: {
        width: '100%',
        alignItems: 'center'
    },

    pageTitle: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff',
        margin: 10,

    },
    inputContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        backgroundColor: 'transparent',
        width: '85%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 10,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    button: {
        backgroundColor: '#6D28D9',
        width: 310,
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        alignItems: 'center',
    },

    buttonOutline: {
        backgroundColor: '#fff',
        marginTop: 5,
        borderColor: '#6D28D9',
        borderWidth: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#6D28D9',
        fontWeight: '700',
        fontSize: 16,
    },

    line: {
        height: 1,
        width: '90%',
        backgroundColor: '#fff',
        marginVertical: 10,
    }
})
