import { NotesProvider } from "@/hooks/useNotes";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <NotesProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Diary", headerShown: true }}
        />
        <Stack.Screen />
      </Stack>
    </NotesProvider>
  );
}
