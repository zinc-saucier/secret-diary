import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { z } from "zod";
//app-wide theme file
import {theme} from "../../../styles/theme";
import { useAuth } from "@/context/AuthContext";

//form field validation goes here!

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
});

type ProfileForm = z.infer<typeof formSchema>;

//the large 5 field form goes here!

const form = () => {

  const user = useAuth();

  const {
    control,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<ProfileForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: ProfileForm) => {
    Alert.alert(
      "Form submitted",
      `User: ${data.name} ${data.email}`,
      [{ text: "OK", onPress: () => router.back()} 
      ]);
      console.log(data)
  };

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

export default form;

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
