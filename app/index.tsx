import { Redirect } from "expo-router";

import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href="/tabs" />;
  }

  return <Redirect href="/auth/login" />;
}
