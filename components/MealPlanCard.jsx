import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import Colors from "../shared/Colors";
import CheckBox from "@react-native-community/checkbox";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { CheckmarkSquare02Icon, SquareIcon } from "@hugeicons/core-free-icons";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

import { Link } from "expo-router";
export default function MealPlanCard({ mealPlanInfo }) {
  const updateStatus = useMutation(api.MealPlan.updateStatus);

  const onCheck = async (status) => {
    const result = await updateStatus({
      id: mealPlanInfo?.mealPlan?._id,
      status: status,
      calories: mealPlanInfo?.recipe?.jsonData?.calories,
    });

    Alert.alert("Great!", "Status Updated!");
  };

  return (
    <View
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: 10,
      }}
    >
      <Link href={"/recipe-detail?recipeId=" + mealPlanInfo?.recipe?._id}>
        <Image
          source={{ uri: mealPlanInfo?.recipe?.imageUrl }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 15,
          }}
        />
      </Link>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={styles.mealTypeText}>
            {mealPlanInfo?.mealPlan?.mealType}
          </Text>
          <Text style={styles.recipeName}>
            {mealPlanInfo?.recipe?.recipeName}
          </Text>
          <Text style={styles.calories}>
            {mealPlanInfo?.recipe?.jsonData?.calories} kcal
          </Text>
        </View>
        <View>
          {mealPlanInfo?.mealPlan?.status != true ? (
            <TouchableOpacity onPress={() => onCheck(true)}>
              <HugeiconsIcon icon={SquareIcon} color={Colors.GRAY} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => onCheck(false)}>
              <HugeiconsIcon
                icon={CheckmarkSquare02Icon}
                color={Colors.GREEN}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mealTypeText: {
    backgroundColor: Colors.SECONDERY,
    color: Colors.PRIMARY,
    padding: 1,
    paddingHorizontal: 10,
    borderRadius: 99,
    flexWrap: "wrap",
    width: 90,
    textAlign: "center",
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calories: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
    color: Colors.GREEN,
  },
});
