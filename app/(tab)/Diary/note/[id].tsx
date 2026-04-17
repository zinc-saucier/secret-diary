import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

const NoteEditorScreen = () => {
    const { id } = useLocalSearchParams()
    const isNew = id === 'new'
    return (<View style={styles.body}>
        <Stack.Screen options={{
            title: 'Create Note'
        }} />
    </View>);
}

const styles = StyleSheet.create({
    body: {
        flex: 1,

    }
})


export default NoteEditorScreen