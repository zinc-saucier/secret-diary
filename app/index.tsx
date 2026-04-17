import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { session, isLoading } = useAuth();

 
  if (isLoading) {
    return (
      <View style={""}>
        <ActivityIndicator size="large" color={""} />
      </View>
    );
  }

  //redirect to home if user logged in, to login if user = null
  return <Redirect href={session ? "/(tab)/home" : "/login"} />;
}
