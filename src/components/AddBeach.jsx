import React, { useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, TextInput, ScrollView, Image } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get('window')

const AddBeach = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('');
    const [saved, setSaved] = useState(false);
    const [images, setImages] = useState([]);

    const resetInput = (setter) => {
        setter('');
    };

    const handleImageSelect = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
            if (!response.didCancel && !response.error && response.assets) {
                const newImages = response.assets.map(asset => asset.uri);
                setImages(prevImages => [...prevImages, ...newImages]);
            }
        });
    };

    const handleImageDelete = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };  

    const handleSave = async () => {
        if (!name || !description || !phone) {
            alert('Please fill out all fields to proceed.');
            return;
        }
    
        const newBeach = {
            name,
            location,
            description,
            images,
        };
    
        try {
            const storedBeaches = await AsyncStorage.getItem('beaches');
            
            const beachesArray = storedBeaches ? JSON.parse(storedBeaches) : [];
    
            beachesArray.push(newBeach);
    
            await AsyncStorage.setItem('beaches', JSON.stringify(beachesArray));
    
            console.log('Updated beaches:', beachesArray);
            
            setSaved(true);
    
        } catch (error) {
            console.error('Error saving your beach:', error);
            alert('Failed to save the your beach. Please try again.');
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
                <Text style={styles.title}>{!saved ? 'Add new beach' : ''}</Text>
            </View>

            {
                saved ? (
                    <View style={{width: '100%', height: '90%', alignItems: 'center'}}>
                        <Text style={styles.title}>You successfully add new beach</Text>
                        <View style={{width: 180, height: 180, marginVertical: 'auto'}}>
                            <Image source={require('../assets/decor/saved.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                        </View>
                    </View>
                ) : (
                    <View style={{width: '100%', alignItems: 'flex-start'}}>
                        <ScrollView style={{width: '100%'}}>
                            <Text style={styles.label}>Beach name</Text>
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

                            <Text style={styles.label}>Address</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Where is the beach ?"
                                    placeholderTextColor="#999"
                                    value={location}
                                    onChangeText={setLocation}
                                />
                                {location ? (
                                    <TouchableOpacity style={styles.cross} onPress={() => resetInput(setLocation)}>
                                        <Icons type={'cross'} />
                                    </TouchableOpacity>
                                ) : null}
                            </View>

                            <Text style={styles.label}>Description</Text>
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

                            <Text style={styles.label}>Photos</Text>
                            {images.length > 0 ? (
                                <ScrollView horizontal>
                                    {images.map((image, index) => (
                                        <View key={index} style={styles.imageContainer}>
                                            <Image source={{ uri: image }} style={styles.uploadedImage} />
                                            <TouchableOpacity style={styles.crossImg} onPress={() => handleImageDelete(index)}>
                                                <Icons type={'cross-img'} />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                    <View style={styles.imageContainer}>
                                        <TouchableOpacity style={styles.add} onPress={handleImageSelect}>
                                            <Icons type={'plus'} />
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            ) : (
                                <View style={styles.imageContainer}>
                                    <TouchableOpacity style={styles.add} onPress={handleImageSelect}>
                                        <Icons type={'plus'} />
                                    </TouchableOpacity>
                                </View>
                            )}

                            <View style={{height: 200}} />
                        </ScrollView>

                    </View>
                )
            }

            <TouchableOpacity 
                style={[styles.saveBtn, 
                    !name || !description || !phone && {backgroundColor: '#2a2a2a'}, 
                    saved && {backgroundColor: '#b58c32'}
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
        backgroundColor: '#000',
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
        color: '#fff',
        lineHeight: 33.41,
    },

    backText: {
        fontSize: 17,
        fontWeight: '400',
        color: '#fff',
        lineHeight: 22
    },

    label: {
        fontSize: 17,
        fontWeight: '400',
        color: '#fff',
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
        color: '#fff',
        backgroundColor: '#151515',
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
        backgroundColor: '#222be6',
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

    imageContainer: {
        width: 100,
        height: 150,
        backgroundColor: '#3d3d3d',
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 12,
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },

    uploadedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 12
    },

    add: {
        width: 44,
        height: 44
    },

    crossImg: {
        width: 27,
        height: 27,
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 10,
        padding: 3,
        backgroundColor: '#ececec',
        borderRadius: 30
    },

})

export default AddBeach;