import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import {theme} from "../../../styles/theme";
import { useAuth } from "@/context/AuthContext";

const profile = () => {

  const user = useAuth();

 

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Your Profile</Text>
      {/* Name */}
      <Text style={styles.label}>User Name</Text>
      <View style={styles.input}>
        <Text style={styles.text}>{user.user?.user_metadata.display_name}</Text>
      </View>

      {/*Email*/}
      <Text style={styles.label}>Email</Text>
      <View style={styles.input}>
        <Text style={styles.text}>{user.user?.email}</Text>
      </View>
    </ScrollView>
  );
};

export default profile;

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
  content: {
    padding: theme.spacing.screen,
    paddingTop: 60,
    flexGrow: 1,
  },
  text: {
    color: theme.colors.text,
    fontSize: 15,
  }
}) 
