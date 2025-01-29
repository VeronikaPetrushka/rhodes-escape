import { View } from "react-native"
import SignEvent from "../components/SignEvent"

const SignEventScreen = ({ route }) => {
    const { event } = route.params;

    return (
        <View style={styles.container}>
            <SignEvent event={event} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default SignEventScreen;