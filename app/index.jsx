import { UserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Button from "../components/shared/Button";
import STRINGS from "../constants/strings";
import Colors from "../shared/Colors";
import { auth } from "./../services/FirebaseConfig";

export default function Index() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  console.log("index app ,user from context", user);
  const convex = useConvex();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userInfo) => {
      console.log("email in  index", userInfo?.email);
      const userData = await convex.query(api.Users.GetUser, {
        email: userInfo?.email,
      });
      console.log("USER", userData);
      setUser(userData);
      if (!userData) {
        router.push("/auth/SignIn");
        return;
      }
      // setUser(userData);
      router.replace("/(tabs)/Home");
    });
    return () => unsubscribe();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require("./../assets/images/landing.jpg")}
        style={{
          width: "100%",
          height: Dimensions.get("screen").height,
        }}
      />
      <View
        style={{
          position: "absolute",
          height: Dimensions.get("screen").height,
          backgroundColor: "#0707075e",
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Image
          source={require("./../assets/images/logo.png")}
          style={{
            width: 150,
            height: 150,
            marginTop: 100,
          }}
        />

        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: Colors.WHITE,
          }}
        >
          {STRINGS.APP_TITLE}
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginHorizontal: 20,
            fontSize: 20,
            color: Colors.WHITE,
            marginTop: 15,
            opacity: 0.8,
          }}
        >
          {STRINGS.WELCOME_SUBTITLE}
        </Text>
      </View>

      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 25,
          padding: 20,
        }}
      >
        <Button
          title={STRINGS.BUTTON_GET_STARTED || "Get Started"}
          onPress={() => router.push("/auth/SignIn")}
        />
      </View>
    </View>
  );
}
