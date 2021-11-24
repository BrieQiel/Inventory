import React from 'react'
import { Image, StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { auth } from './../firebase';



function TopNav() {
    return (
        <View style={styles.topNav}>
            <Text style={styles.textTitle}>Pantry Organizer</Text>
        </View>
    );
}

const Welcome = () => {

    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.goBack("Login")
            })
            .catch(error => alert(error.message))
    }
    return (
        <View style={styles.container}>
            <TopNav />

            <ScrollView style={{ width: '100%', backgroundColor: 'transparent', flex: 1, }}>
                <View style={styles.homeTop}>
                    <Text style={[styles.text, { color: 'white' }]}>Welcome </Text>
                </View>
                <View style={styles.homePage}>

                    <Image style={styles.avatar}
                        resizeMode="cover"
                        source={require('./../assets/Img/inventoryLogo.png')}
                    />

                    <Text style={styles.subTitle}>Email: {auth.currentUser?.email} </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleSignOut}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={[styles.buttonText, { color: '#6D28D9' }]}>Sign out</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            <ImageBackground source={require('./../assets/Img/purple.jpg')} resizeMode="cover" style={styles.centerImage} />
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get("window").width, //for full screen
        height: Dimensions.get("window").height //for full screen
    },
    backgroundLogo: {
        height: '40%',
        minWidth: '90%',

    },
    topNav: {
        //marginBottom: 10,
        width: Dimensions.get("window").width, //for full screen
        backgroundColor: 'white',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
    },
    textTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 10,
        //backgroundColor: 'yellow',
        paddingHorizontal: 5,
        textAlign: 'center',
    },

    homePage: {
        width: Dimensions.get("window").width, //for full screen
        height: (Dimensions.get("window").height - 50),
        backgroundColor: 'white', //#0782F9
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        paddingTop: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,

    },

    homeTop: {
        width: Dimensions.get("window").width, //for full screen
        backgroundColor: 'transparent',
        height: Dimensions.get("window").height,
        padding: 20,
        flex: 1,
        alignItems: 'center',
    },

    centerImage: {
        width: '100%', //for full screen
        height: '100%', //for full screen
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        //opacity: .6
    },
    text: {
        fontSize: 20,
        textAlign: 'justify',
        margin: 8,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 18,
        marginTop: 15,
        margin: 10,
        letterSpacing: 1,
        fontWeight: 'normal',
        color: '#1F2937',
    },
    welcomeTitle: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#6D28D9',
        margin: 10,

    },
    avatar: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    button: {
        backgroundColor: '#6D28D9',
        width: (Dimensions.get("window").width - 40),
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,
        marginTop: 15,
    },
    buttonOutline: {
        backgroundColor: '#fff',
        borderColor: '#6D28D9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})
