import React, {useState} from "react";
import { StyleSheet, Text, View, ActivityIndicator, Pressable, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useAuth } from "@/context/AuthContext";
import {theme} from "@/styles/theme";

const home = () => {

    const { signOut } = useAuth();
    const [signOutText, setSignoutText] = useState("Sign out?");

    const { session, isLoading } = useAuth();

    if (isLoading) {
    return (
      <View style={""}>
        <ActivityIndicator size="large" color={""} />
      </View>
    );
  }

  const handleSignOut = async () => {
    if (signOutText == "Sign out?") {
      setSignoutText("Are you sure??????");
      setTimeout(() => {
        setSignoutText("Sign out?");
      }, 5000);
    } else {
      await signOut();
      setSignoutText("Sign out?");
    }
  };

  return (
    <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
    <View style={styles.header}>
      <Text style={styles.h2}>Welcome to your Secret Diary {session?.user.user_metadata.display_name}</Text>
      <Pressable onPress={handleSignOut}>
        <Text>{signOutText}</Text>
        
      </Pressable>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg
  },
  headerContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 36,
  },
  h2: {
    fontSize: 16,
    fontWeight: "600",
    margin: 15,
    marginTop: 35,
    textAlign: "center",
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e8f0fd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: theme.colors.muted,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: theme.colors.inputbg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.input,
    padding: 14,
    fontSize: 16,
    color: theme.colors.text,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: theme.radius.input,
    padding: 12,
    marginBottom: 16,
  },
  error: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.error,
  },
  content: {
    padding: theme.spacing.screen,
    paddingTop: 60,
    flexGrow: 1,
  },
  button: {
    backgroundColor: theme.colors.button,
    borderRadius: theme.radius.input,
    padding: 16,
    alignItems: "center",
    marginTop: 28,
  },
  buttonText: {
    color: theme.colors.bg,
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: theme.colors.muted,
    fontSize: 15,
  },
  footerLink: {
    color: theme.colors.primary,
    fontSize: 15,
    fontWeight: "700",
  },
}) 
