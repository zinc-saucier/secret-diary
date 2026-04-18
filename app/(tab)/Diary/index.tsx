import { NoteItem } from '@/components/noteitem'
import { useNotes } from '@/hooks/useNotes'
import { remove } from '@/lib/storage'
import { theme } from '@/styles/theme'
import { router, Stack } from 'expo-router'
import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'


const index = () => {
  const { notes, deleteNote } = useNotes();

  const newNote = () => {
    router.push('/Diary/note/new')
  }
  const onRemove = (id: string) => {
    deleteNote(id);
    remove(id);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Diary</Text>
      </View>
      <Stack.Screen
        options={{
          title: 'My Secret Diary',
          headerTitleAlign: 'center',
        }} />
      <Pressable onPress={newNote}>

        <Text style={styles.buttontxt}>Add Note</Text>

      </Pressable>

      <FlatList data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <NoteItem key={index} item={item} onTogglePin={() => true} onRemove={() => onRemove(item.id)} />}
        style={styles.noteList} />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg
  },
  header: {
    alignItems: "center",
    marginBottom: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.text,
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
    marginTop: 12
  },
  noteCard: {
    color: theme.colors.text,
  },
  noteList: {
    padding: 16,
    gap: 12,

  },
  
})