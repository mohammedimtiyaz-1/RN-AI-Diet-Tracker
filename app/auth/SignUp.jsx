import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import Button from "../../components/shred/Button";
import Input from "../../components/shred/Input";

const SignUp = () => {
  // State to manage form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    // Handle sign up logic here
    console.log("Sign Up Pressed", { fullName, email, password });
    if (!fullName || !email || !password) {
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
        Create a New Account
      </Text>
      <View style={{ width: "100%" }}>
        <Input placeholder="Full Name" onChangeText={setFullName} />
        <Input placeholder="Email" onChangeText={setEmail} />
        <Input placeholder="Password" password onChangeText={setPassword} />
        <View style={{ marginTop: 20, width: "100%", fontSize: 16 }}>
          <Button title="Create Account" onPress={() => onSignUp()} />

          <View
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 16,
              color: "#555",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <Text style={{ marginTop: 10 }}>Already have an account ? </Text>
            <Link href={"/auth/SignIn"}>
              <Text style={{ marginTop: 30, fontSize: 18, fontWeight: "bold" }}>
                Sign In
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
