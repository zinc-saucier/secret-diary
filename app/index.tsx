import { Redirect } from "expo-router";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/styles/theme";

export default function Index() {
  const { session, isLoading } = useAuth();

 
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  //redirect to home if user logged in, to login if user = null
  return <Redirect href={session ? "/(tab)/home" : "/login"} />;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    padding: theme.spacing.screen,
    justifyContent: "center",
    alignItems: "center",
  },
})