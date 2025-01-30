// favorites
import React, { useState, useCallback } from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import beaches from '../constants/beaches.js';
import Icons from './Icons.jsx';

const { height } = Dimensions.get('window');

const Beaches = () => {
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);
    const [button, setButton] = useState('general');
    const [addedBeaches, setAddedBeaches] = useState([]);
    const [map, setMap] = useState(false);

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorite');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    const toggleFavorite = async (beach) => {
        try {
            let updatedFavorites = [...favorites];
            const index = updatedFavorites.findIndex(fav => fav.name === beach.name);

            if (index !== -1) {
                updatedFavorites.splice(index, 1);
            } else {
                updatedFavorites.push(beach);
            }

            await AsyncStorage.setItem('favorite', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const isFavorite = (beach) => {
        return favorites.some(fav => fav.name === beach.name);
    };

    useFocusEffect(
        useCallback(() => {
            loadFavorites();
        }, [])
    );

    console.log(favorites)

    const filteredBeaches = button === 'general' ? beaches : addedBeaches;

    const handleMapToggle = () => {
        if(map) {
            setMap(false)
        } else {
            setMap(true)
        }
    };

    return (
        <View style={styles.container}>

            <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, paddingHorizontal: 16}}>
                <Text style={styles.title}>Rhodes Beaches</Text>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity 
                        style={{width: 44, height: 44, marginRight: 5}} 
                        onPress={handleMapToggle}
                        >
                        <Icons type={'map'} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{width: 44, height: 44}} 
                        onPress={() => navigation.navigate('AddBeachScreen')}
                        >
                        <Icons type={'plus'} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.btnsContainer}>
                <TouchableOpacity 
                    style={[styles.btn, button === 'general' && {backgroundColor: '#d8b281'}]} 
                    onPress={() => setButton('general')}
                    >
                    <Text style={[styles.btnText, button === 'general' && {color: '#fff', fontWeight: '600'}]} >General</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.btn, button === 'added' && {backgroundColor: '#d8b281'}]}
                    onPress={() => setButton('added')}
                    >
                    <Text style={[styles.btnText, button === 'added' && {color: '#fff', fontWeight: '600'}]} >Added</Text>
                </TouchableOpacity>
            </View>

            <View style={{width: '100%', height: '100%', backgroundColor: '#fff', padding: 16}}>
                {
                    filteredBeaches.length > 0 ? (
                        <ScrollView style={{width: '100%'}}>
                            {
                                filteredBeaches.map((beach, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        style={{width: '100%', marginBottom: 20}}
                                        onPress={() => navigation.navigate('BeachDetailsScreen', {beach: beach})}
                                        >
                                        <TouchableOpacity 
                                            style={styles.favBtn} 
                                            onPress={() => toggleFavorite(beach)}
                                            >
                                            <Icons type={'fav'} active={isFavorite(beach)} />
                                        </TouchableOpacity>
                                        <Image source={beach.image} style={{width: '100%', height: 177, borderRadius: 12, marginBottom: 8}} />
                                        <Text style={styles.name}>{beach.name}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                            <View style={{height: 100}} />
                        </ScrollView>
                    ) : (
                        <View style={{width: '80%', alignSelf: 'center', alignItems: 'center', marginVertical: 'auto'}}>
                            <Image source={require('../assets/decor/nothing.png')} style={{width: 140, height: 140, resizeMode: 'contain', marginBottom: 24}} />
                            <Text style={styles.nothingText}>There aren’t any beaches yet, please add something</Text>
                        </View>
                    )
                }
            </View>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: height * 0.07,
        paddingBottom: 90,
        backgroundColor: '#f6f6f6'
    },

    favBtn: {
        width: 27,
        height: 24,
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10
    },

    title: {
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 28.64,
        color: '#000',
    },

    btnsContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#ececec',
        marginBottom: 16,
        padding: 2
    },

    btn: {
        width: '49%',
        padding: 9,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnText: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        color: '#000',
    },

    name: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 16.41,
        color: '#000',
    },

    nothingText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22.4,
        color: '#000',
        textAlign: 'center'
    }

})

export default Beaches;