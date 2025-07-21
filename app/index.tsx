import { Image } from "expo-image";
import { Dimensions, Text, View } from "react-native";
import colors from "../shared/color";
import Button from "./../components/shred/Button";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/images/landing.jpg")}
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
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <Image
          source={require("./../assets/images/logo.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text
          style={{
            color: colors.WHITE,
            fontWeight: "bold",
            fontSize: 24,
            marginTop: 10,
          }}
        >
          AI Diet Tracker
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: colors.WHITE,
            marginTop: 10,
            marginHorizontal: 20,
            fontSize: 20,
            opacity: 0.8,
            fontWeight: "500",
          }}
        >
          Craft delicious , Healthy ,mean plans tailored just for you.Achieve
          your goal with ease!
        </Text>
        <View
          style={{
            position: "absolute",
            bottom: 50,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            title={"Get Started"}
            onPress={() => console.log("## get started button pressed")}
          />
        </View>
      </View>
    </View>
  );
}
