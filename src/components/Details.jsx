import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Details = ({ event }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <View style={styles.toolsContainer}>
                <TouchableOpacity 
                    style={styles.toolBtn} 
                    onPress={() => navigation.goBack('')}
                    >
                    <Icons type={'back'} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.toolBtn, {paddingHorizontal: 8}]} 
                    onPress={() => navigation.navigate('FavoriteScreen')}
                    >
                    <Icons type={'fav'} />
                </TouchableOpacity>
            </View>

            <Image source={event.image} style={styles.image} />

            <ScrollView style={{width: '100%', paddingHorizontal: 16}}>
                <Text style={styles.name}>{event.name}</Text>

                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12}}>
                    <Text style={styles.date}>{event.date}</Text>
                    <Text style={styles.date}>{event.time}</Text>
                </View>

                <Text style={styles.price}>{event.price}</Text>

                {
                    event.description.map((desc, i) => (
                        <Text key={i} style={styles.description}>{desc}</Text>
                    ))
                }
            </ScrollView>

            <View style={styles.signBtnContainer}>
                <TouchableOpacity style={styles.signBtn}>
                    <Text style={styles.signBtnText}>Sign in</Text>
                </TouchableOpacity>
            </View>

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

    toolsContainer: {
        width: '100%',
        paddingHorizontal: 16,
        position: 'absolute',
        top: height * 0.07,
        right: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10
    },

    toolBtn: {
        width: 44,
        height: 44,
        backgroundColor: '#ececec',
        borderRadius: 16,
        padding: 10
    },

    image: {
        width: '100%',
        height: 370,
        marginBottom: 12,
    },

    name: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 28.64,
        color: '#000',
        marginBottom: 12
    },

    date: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.09,
        color: '#939393',
    },

    price: {
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 28.64,
        color: '#d8b281',
        marginBottom: 16
    },

    description: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19.09,
        color: '#000',
        marginBottom: 16
    },

    signBtnContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        paddingBottom: 30,
        backgroundColor: '#ececec'
    },

    signBtn: {
        width: '100%',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d8b281',
        padding: 16.5
    },

    signBtnText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.09,
        color: '#fff',
    }

});

export default Details;