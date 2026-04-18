import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
        <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Ionicons
              name="lock-closed-outline"
              size={36}
              color={theme.colors.primary}
            />
          </View>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Login to unlock!</Text>
        </View>
        {/* Auth error */}
        {authError && (
          <View style={styles.errorBanner}>
            
            <Text style={styles.error}>{authError}</Text>
          </View>
        )}
         {/* Email input field */}
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.email && ""]}
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
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        {/* ── Password field ── */}
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.password && ""]}
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
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
        {/* Submit button */}
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
        {/* ── Link to Sign Up ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Pressable onPress={() => router.replace("./signup")}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </Pressable>
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
);

}
export default Login

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