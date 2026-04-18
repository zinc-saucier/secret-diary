import { useAuth } from "@/context/AuthContext";
import { theme } from "@/styles/theme";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your Secret Diary {session?.user.user_metadata.display_name}</Text>
      <Pressable onPress={handleSignOut} style={styles.logbutton}>
        <Text style={styles.buttontext}>{signOutText}</Text>
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
  title: {
    textAlign: 'center',
    fontSize: 30,
    padding: 5,
    marginTop: 45,
    fontWeight: 700,
    textDecorationLine: 'underline',
    textDecorationColor: theme.colors.border,
    textDecorationStyle: 'solid',
  },
  logbutton: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: theme.colors.button,
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: 200,
    marginTop: 50,
  },
  buttontext: {
    textAlign: 'center',
    fontWeight: 500,

  }
});
