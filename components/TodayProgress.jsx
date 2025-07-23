import { useConvex } from "convex/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import STRINGS from "../constants/strings";
import { UserContext } from "../context/UserContext";
import Colors from "../shared/Colors";
import { api } from "./../convex/_generated/api";

export default function TodayProgress() {
  const { user } = useContext(UserContext);

  const convex = useConvex();
  const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0);

  useEffect(() => {
    user && GetTotalCaloriesConsumed();
  }, [user]);

  const GetTotalCaloriesConsumed = async () => {
    const result = await convex.query(api.MealPlan.GetTotalCaloriesConsumed, {
      date: moment().format("DD/MM/YYYY"),
      uid: user?._id,
    });

    setTotalCaloriesConsumed(result);
  };

  return (
    <View
      style={{
        marginTop: 25,
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        elevation: 5,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {STRINGS.TODAY_GOAL}
        </Text>
        <Text
          style={{
            fontSize: 18,
          }}
        >
          {moment().format("MMM DD, yyyy")}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 10,
          color: Colors.PRIMARY,
        }}
      >
        {totalCaloriesConsumed}/{user?.calories} kcal
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginTop: 2,
          fontSize: 16,
        }}
      >
        {STRINGS.DOING_GREAT}
      </Text>

      <View
        style={{
          backgroundColor: Colors.GRAY,
          height: 10,
          borderRadius: 99,
          marginTop: 15,
          opacity: 0.7,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.PRIMARY,
            width: "70%",
            height: 10,
            borderRadius: 99,
          }}
        ></View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <Text>{STRINGS.CALORIES_CONSUMED}</Text>
        <Text>{STRINGS.KEEP_IT_UP}</Text>
      </View>
    </View>
  );
}
