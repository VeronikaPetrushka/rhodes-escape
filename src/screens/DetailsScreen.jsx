import { View } from "react-native"
import Details from "../components/Details"

const DetailsScreen = ({ route }) => {
    const { event } = route.params;

    return (
        <View style={styles.container}>
            <Details event={event} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default DetailsScreen;