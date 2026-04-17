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
} from "react-native";
import { z } from "zod";
//app-wide theme file
import {theme} from "../../../styles/theme";

//form field validation goes here!

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
});

type ProfileForm = z.infer<typeof formSchema>;

//the large 5 field form goes here!

const form = () => {
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
      <Text style={styles.h1}>Your Profile</Text>
      {/*First Name */}
      <Text style={styles.label}>First Name</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input]}
            placeholder="first name here"
            placeholderTextColor={"gray"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.name && (
        <Text style={styles.error}>{errors.name.message}</Text>
      )}

      {/*Email*/}
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input]}
            placeholder="example@example.com"
            placeholderTextColor={"gray"}
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* submit button */}
      <Pressable style={[styles.button]} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </ScrollView>
  );
};

export default form;

const styles = StyleSheet.create({
  button: {
    marginLeft: 15,
    backgroundColor: "violet",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: theme.colors.text,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    flex: 1,
    alignContent: "center",
  },
  h1: {
    fontSize: 25,
    fontWeight: "600",
    margin: 15,
    marginTop: 35,
   
  },
  label: {
    marginLeft: theme.label.margin,
    fontSize: theme.label.size,
    fontWeight: "400",
  },
  input: {
    backgroundColor: theme.colors.border,
    marginLeft: 15,
    marginRight: 15,
    margin: 5,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  error: {
    backgroundColor: "red",
    color: "white",
    padding: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
  },
});
