import React, {useState} from "react";
import { StyleSheet, Text, View, ActivityIndicator, Pressable } from "react-native";
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
    <View style={""}>
      <Text style={""}>Welcome to your Secret Diary {session?.user.email}</Text>
      <Pressable onPress={handleSignOut}>
        <Text>{signOutText}</Text>
        
      </Pressable>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({

});
