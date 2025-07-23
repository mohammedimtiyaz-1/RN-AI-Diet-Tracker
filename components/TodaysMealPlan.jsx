import { CalendarAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useConvex } from "convex/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { UserContext } from "../context/UserContext";
import { api } from "../convex/_generated/api";
import Colors from "../shared/Colors";
import MealPlanCard from "./MealPlanCard";
import Button from "./shared/Button";

import { useRouter } from "expo-router";
import STRINGS from "../constants/strings";

export default function TodaysMealPlan({ selectedDate }) {
  const [mealPlan, setMealPlan] = useState([]);
  const { user } = useContext(UserContext);

  const convex = useConvex();

  const router = useRouter();
  useEffect(() => {
    user && GetTodaysMealPlan();
  }, [user, selectedDate]);

  const GetTodaysMealPlan = async () => {
    const result = await convex.query(api.MealPlan.GetTodaysMealPlan, {
      date: selectedDate ?? moment().format("DD/MM/YYYY"),
      uid: user?._id,
    });

    setMealPlan(result);
  };

  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      {!selectedDate && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {STRINGS.TODAYS_MEAL_PLAN}
        </Text>
      )}

      {mealPlan?.length == 0 ? (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            padding: 20,
            backgroundColor: Colors.WHITE,
            marginTop: 15,
            borderRadius: 15,
          }}
        >
          <HugeiconsIcon
            icon={CalendarAdd01Icon}
            size={40}
            color={Colors.PRIMARY}
          />
          <Text
            style={{
              fontSize: 18,
              color: Colors.GRAY,
              marginBottom: 20,
            }}
          >
            {STRINGS.NO_MEAL_PLAN_TODAY ||
              "You Don't have any meal plan for Today"}
          </Text>

          <Button
            title={STRINGS.CREATE_NEW_MEAL_PLAN || "Create New Meal Plan"}
            onPress={() => router.push("/(tabs)/Meals")}
          />
        </View>
      ) : (
        <View>
          <FlatList
            data={mealPlan}
            renderItem={({ item }) => <MealPlanCard mealPlanInfo={item} />}
          />
        </View>
      )}
    </View>
  );
}
