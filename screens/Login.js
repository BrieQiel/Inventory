import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './../firebase';


const Login = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Welcome")
            }
        })

        return unsubscribe
    }, [])

    const handleLogin = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(auth.currentUser?.email);
        } catch (error) {
            alert(error?.message)
        }
    };



    return (
        <KeyboardAvoidingView
            style={styles.styledContainer}
            behavior="height"
        >
            <Image style={styles.pageLogo}
                resizeMode="cover"
                source={require('./../assets/Img/inventoryLogo.png')}
            />
            <Text style={styles.pageTitle}>Inventory</Text>

            <View style={styles.innerContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                <View style={styles.line} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleLogin}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Signup </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login

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
        alignItems: 'center',
    },

    pageLogo: {
        width: '50%',
        height: '30%',
        borderRadius: 50,
        marginBottom: 15,
        marginTop: 10,
    },
    pageTitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        margin: 10,

    },
    inputContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        backgroundColor: '#fff',
        width: '85%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    button: {
        backgroundColor: '#6D28D9',
        width: 300,
        padding: 15,
        borderRadius: 15,
        margin: 10,
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
        marginVertical: 20,

    }
})
