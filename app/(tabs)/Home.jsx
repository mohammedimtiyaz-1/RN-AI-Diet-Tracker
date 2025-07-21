import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { UserContext } from "../../context/UserContext";
const Home = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    // This effect runs when the component mounts or when 'user' changes
    if (!user?.weight) {
      router.push("/preferance");
    }
  }, [user]);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
