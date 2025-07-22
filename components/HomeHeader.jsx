import { useContext } from "react";
import { Image, Text, View } from "react-native";
import { UserContext } from "../context/UserContext";
import STRINGS from '../constants/strings';

export default function HomeHeader() {
  const { user } = useContext(UserContext);
  console.log("home header ,user from context", user);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Image
        source={require("./../assets/images/user.png")}
        style={{
          width: 50,
          height: 50,
          borderRadius: 99,
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 18,
          }}
        >
          {STRINGS.HOME_GREETING}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {user?.name}
        </Text>
      </View>
    </View>
  );
}
