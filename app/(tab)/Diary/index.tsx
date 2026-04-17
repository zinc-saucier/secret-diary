import { theme } from '@/styles/theme'
import { Link, Stack } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const index = () => {
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'My Secret Diary'
        }} />
      <Link href={'./note/new'} asChild>
        <Text style={styles.buttontxt}>Add Note</Text>
      </Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
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
  }
})