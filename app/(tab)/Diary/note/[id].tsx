import { useNotes } from "@/hooks/useNotes";
import { theme } from "@/styles/theme";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const NoteEditorScreen = () => {
    const { id } = useLocalSearchParams();
    const isNew = id === 'new'
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const isDisabled = title.length <= 0 || body.length <= 0;

    const { addNote } = useNotes()

    const saveNote = () => {
        if (isNew) {
            addNote(title, body);

        }
        router.push('/(tab)/Diary');
    }

    return (
        <View style={styles.body}>
            <Stack.Screen options={{
                title: isNew ? 'Create Note' : 'Edit Note'
            }} />
            <View style={styles.newNote}>
                <TextInput
                    placeholder="note Title" placeholderTextColor={theme.colors.muted}
                    value={title}
                    onChangeText={setTitle}
                    style={styles.titleInput} />

                <TextInput
                    placeholder="Write a Note..." placeholderTextColor={theme.colors.muted}
                    value={body}
                    onChangeText={setBody}
                    multiline
                    style={styles.noteBody} />

                <Pressable onPress={saveNote} disabled={isDisabled}>
                    <Text style={[styles.buttontxt, isDisabled ? styles.disabledOpacity : styles.activeOpacity]}>Save note</Text>
                </Pressable>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    titleInput: {
        backgroundColor: theme.colors.bg,
        color: theme.colors.text,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        fontWeight: '700'
    },
    newNote: {
        padding: 16,
        gap: 12,
        flex: 1,
    },
    noteBody: {
        flex: 1,
        minHeight: 180,
        backgroundColor: theme.colors.bg,
        color: theme.colors.text,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        fontWeight: '700',
        textAlignVertical: 'top'
    },
    buttontxt: {
        alignSelf: 'flex-end',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: theme.colors.button,
        color: theme.colors.text,
        fontWeight: '600',
        overflow: 'hidden',
        marginRight: 12,
        marginTop: 12,
    },
    disabledOpacity: {
        opacity: 0.5
    },
    activeOpacity: {
        opacity: 1
    },
})


export default NoteEditorScreen