import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext"; 
import { theme } from "@/styles/theme";

// ── Validation schema ─────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginForm = z.infer<typeof loginSchema>;

// ── Component ─────────────────────────────────────────────────────────────────

const Login = () => {
  const { signIn } = useAuth(); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setAuthError(null);
      setIsSubmitting(true);
      await signIn(data.email, data.password);
      // No manual navigation needed — AuthGuard in _layout.tsx watches the session
      // and redirects to /(tab)/home once session becomes non-null.
    } catch (e) {
      setAuthError(
        e instanceof Error ? e.message : "Sign in failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
return (
    <KeyboardAvoidingView
      style={""}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
        <ScrollView
        style={""}
        contentContainerStyle={""}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <View style={""}>

        </View>
        {/* ── Auth error banner (from Supabase, e.g. "Invalid login credentials") ── */}
        {authError && (
          <View style={""}>
            
            <Text style={""}>{authError}</Text>
          </View>
        )}
         {/* ── Email field ── */}
        <Text style={""}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={["", errors.email && ""]}
              placeholder="you@example.com"
              placeholderTextColor={""}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          )}
        />
        {errors.email && (
          <Text style={""}>{errors.email.message}</Text>
        )}

        {/* ── Password field ── */}
        <Text style={""}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={["", errors.password && ""]}
              placeholder="••••••••"
              placeholderTextColor={""}
              value={value}
              onChangeText={onChange}
              secureTextEntry
              autoComplete="current-password"
            />
          )}
        />
        {errors.password && (
          <Text style={""}>{errors.password.message}</Text>
        )}
        {/* Submit button */}
        <Pressable onPress={handleSubmit(onSubmit)}>
            <Text>Submit</Text>
        </Pressable>
        {/* ── Link to Sign Up ── */}
        <View style={""}>
          <Text style={""}>Don't have an account? </Text>
          <Pressable onPress={() => router.replace("./signup")}>
            <Text style={""}>Sign Up</Text>
          </Pressable>
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
);

}
export default Login