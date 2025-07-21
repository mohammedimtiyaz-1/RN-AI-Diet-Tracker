import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import Button from "../../components/shred/Button";
import Input from "../../components/shred/Input";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    // Handle sign in logic here
    console.log("Sign In Pressed", { email, password });
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
  };
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ width: 150, height: 150, marginTop: 50 }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 20 }}>
        Welcome Back!
      </Text>
      <View style={{ width: "100%" }}>
        <Input placeholder="Email" onChangeText={setEmail} />
        <Input placeholder="Password" password onChangeText={setPassword} />
        <View style={{ marginTop: 20, width: "100%", fontSize: 16 }}>
          <Button title="Sign In" onPress={() => onSignIn()} />

          <View
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 16,
              color: "#555",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 20,
            }}
          >
            <Text style={{ marginTop: 10 }}>Don't have an account? </Text>
            <Link href={"/auth/SignUp"}>
              <Text style={{ marginTop: 30, fontSize: 18, fontWeight: "bold" }}>
                Create a New Account
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Signin;
