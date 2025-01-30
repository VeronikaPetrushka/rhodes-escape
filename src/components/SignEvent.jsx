import React, { useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, TextInput, ScrollView, Image } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get('window')

const SignEvent = ({ event }) => {
    const navigation = useNavigation();
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [description, setDescription] = useState(null);
    const [saved, setSaved] = useState(false);

    const resetInput = (setter) => {
        setter('');
    };

    const handleSave = async () => {
        if (!name || !description || !phone) {
            alert('Please fill out all fields to proceed.');
            return;
        }
    
        const newSignedEvent = {
            event,
            name,
            description,
            phone,
        };
    
        try {
            const storedSignedEvents = await AsyncStorage.getItem('signedEvents');
            
            const signedEventsArray = storedSignedEvents ? JSON.parse(storedSignedEvents) : [];
    
            signedEventsArray.push(newSignedEvent);
    
            await AsyncStorage.setItem('signedEvents', JSON.stringify(signedEventsArray));
    
            console.log('Updated signed events:', signedEventsArray);
            
            setSaved(true);
    
        } catch (error) {
            console.error('Error saving your sign:', error);
            alert('Failed to save the your sign. Please try again.');
        }
    };
    
    return (
        <View style={styles.container}>

            <View style={{alignItems: 'center', flexDirection: 'row', marginBottom: 30, alignSelf: 'flex-start'}}>
                <TouchableOpacity 
                    style={styles.backBtn}
                    onPress={() => navigation.goBack('')}
                    >
                    <Icons type={'back'} />
                </TouchableOpacity>
                <Text style={styles.title}>{!saved ? 'Sign up event' : ''}</Text>
            </View>

            {
                saved ? (
                    <View style={{width: '100%', height: '90%', alignItems: 'center'}}>
                        <Text style={styles.title}>You successfully signed up</Text>
                        <View style={{width: 180, height: 180, marginVertical: 'auto'}}>
                            <Image source={require('../assets/decor/saved.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                        </View>
                    </View>
                ) : (
                    <View style={{width: '100%', alignItems: 'flex-start'}}>
                        <ScrollView style={{width: '100%'}}>
                            <Text style={styles.label}>Your name</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    placeholderTextColor="#999"
                                    value={name}
                                    onChangeText={setName}
                                />
                                {name ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resetInput(setName)}>
                                        <Icons type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                            </View>

                            <Text style={styles.label}>Your phone</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="+111 111 111"
                                    placeholderTextColor="#999"
                                    value={phone}
                                    onChangeText={setPhone}
                                />
                                {phone ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resetInput(setPhone)}>
                                        <Icons type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                            </View>

                            <Text style={styles.label}>Comment</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Leave some notes..."
                                    placeholderTextColor="#999"
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline
                                />
                                {description ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resetInput(setDescription)}>
                                        <Icons type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                            </View>

                            <View style={{height: 200}} />
                        </ScrollView>

                    </View>
                )
            }

            <TouchableOpacity 
                style={[styles.saveBtn, 
                    !name || !description || !phone && {backgroundColor: '#2a2a2a'}, 
                    saved && {backgroundColor: '#d8b281'}
                ]} 
                onPress={saved ? navigation.goBack : handleSave}
                disabled={!saved && !name || !description || !phone}
                >
                <Text style={styles.saveBtnText}>{saved ? 'Close' : 'Save'}</Text>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: height * 0.07,
        alignItems: 'center'
    },

    backBtn: {
        width: 44,
        height: 44,
        backgroundColor: '#ececec',
        borderRadius: 16,
        padding: 10,
        marginRight: 15
    },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#000',
        lineHeight: 33.41,
    },

    backText: {
        fontSize: 17,
        fontWeight: '400',
        color: '#000',
        lineHeight: 22
    },

    label: {
        fontSize: 17,
        fontWeight: '400',
        color: '#000',
        lineHeight: 20.3,
        marginBottom: 16
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 24
    },

    input: {
        width: '100%',
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
        backgroundColor: '#f6f6f6',
        borderColor: '#d8b281',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 16.5,
    },

    iconsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 15.5,
        right: 10,
        zIndex: 10 
    },

    cross: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 15.5,
        right: 10,
        zIndex: 10 
    },

    saveBtn: {
        width: '100%',
        padding: 13,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d8b281',
        borderRadius: 16,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 50
    },

    saveBtnText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#fff',
        lineHeight: 22
    },

    savedNormContainer: {
        position: 'absolute',
        top: 100,
        alignSelf: 'center',
        alignItems: 'center'
    },

    dateIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 15,
        left: 20,
        zIndex: 10
    },

})

export default SignEvent;