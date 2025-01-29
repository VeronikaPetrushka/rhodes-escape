import { TouchableOpacity, View, Text, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import events from '../constants/events.js';

const { height } = Dimensions.get('window');

const Events = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rhodes Events</Text>

            <ScrollView style={{width: '100%', backgroundColor: '#ececec', paddingHorizontal: 16, paddingTop: 16}}>
                {
                    events.map((event, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={styles.card}
                            onPress={() => navigation.navigate('DetailsScreen', {event: event})}
                            >
                            <Image source={event.image} style={styles.image} />
                            <View style={{width: '100%', paddingHorizontal: 12, paddingVertical: 14}}>
                                <Text style={styles.name}>{event.name}</Text>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text style={styles.date}>{event.time} / {event.date}</Text>
                                    <Text style={styles.price}>{event.price}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
                <View style={{height: 50}} />
            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 100,
        backgroundColor: '#fff'
    },

    title: {
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 28.64,
        color: '#000',
        textAlign: 'center',
        marginTop: height * 0.07,
        marginBottom: 30
    },

    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden'
    },

    image: {
        width: '100%',
        height: 224,
        resizeMode: 'cover',
    },

    name: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 16.71,
        color: '#000',
        marginBottom: 6
    },

    date: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        color: '#939393',
    },

    price: {
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 20.3,
        color: '#d8b281',
    }


})

export default Events;