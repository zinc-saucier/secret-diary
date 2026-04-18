import { theme } from "@/styles/theme";
import { Note } from "@/types";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const NoteItem = ({ item, onTogglePin, onRemove }: { item: Note, onTogglePin: (id: string) => void; onRemove: (id: string) => void; }) => {

    const onEdit = () => { }

    const [pressed, setPressed] = useState(false);
    return (
        <Pressable style={[styles.notecard, pressed ? styles.ispressed : styles.notPressed]} onPress={() => { setPressed(true) }}>

            <View style={styles.card}>
                <Text style={styles.noteTitle}>{item.title}</Text>

                <View style={styles.actionContainer}>
                    <Pressable onPress={() => onTogglePin(item.id)}>
                        <Text style={styles.actionText}>pin</Text>
                    </Pressable>
                    <Pressable onPress={onEdit}>
                        <Text style={styles.actionText}>Edit</Text>
                    </Pressable>
                    <Pressable onPress={() => { onRemove(item.id) }}>
                        <Text style={styles.actionText}>Remove</Text>
                    </Pressable>
                </View>
                <Text style={styles.body} numberOfLines={4}>{item.body}</Text>
                <Text style={styles.date}>Updated: {new Date(item.updatedAt).toLocaleString()}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    noteTitle: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: 700,
        marginRight: 200,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'

    },
    actionText: {
        color: theme.colors.muted,
    },
    actionContainer: {
        flexDirection: 'row',
        gap: 8,

    },
    notecard: {
        backgroundColor: theme.colors.bg,
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        gap: 6,
        flexWrap: 'wrap'
    },
    ispressed: {
        opacity: 0.9,
    },
    notPressed: {
        opacity: 1
    },
    body: {
        color: theme.colors.muted,
        fontSize: 14,
    },
    date: {
        color: theme.colors.muted,
        fontSize: 12,
        alignContent: 'flex-end',
        justifyContent: 'flex-end'
    }
})