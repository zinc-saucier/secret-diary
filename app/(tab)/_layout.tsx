import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Stack>
        <Stack.Screen name="home" options={{ title: "Login" }} />
        <Stack.Screen name="profile" options={{
          title: "Your Profile",
          headerShown: true,
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="Diary" options={{ title: "My Diary" }} />
      </Stack>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Diary"
        options={{
          tabBarLabel: "My Diary",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "cloud" : "cloud-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
