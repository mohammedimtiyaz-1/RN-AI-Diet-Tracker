import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import Colors from "../shared/Colors";

import { HugeiconsIcon } from "@hugeicons/react-native";
import { CheckmarkSquare02Icon, SquareIcon } from "@hugeicons/core-free-icons";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

import { Link } from "expo-router";
import STRINGS from '../constants/strings';
// Simple Error Boundary (replace with shared if available)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Optionally log error
  }
  render() {
    if (this.state.hasError) {
      return <Text style={{ color: 'red', textAlign: 'center', margin: 20 }}>Something went wrong.</Text>;
    }
    return this.props.children;
  }
}

export default function MealPlanCard({ mealPlanInfo }) {
  const updateStatus = useMutation(api.MealPlan.updateStatus);

  const onCheck = React.useCallback(async (status) => {
    try {
      await updateStatus({
        id: mealPlanInfo?.mealPlan?._id,
        status: status,
        calories: mealPlanInfo?.recipe?.jsonData?.calories,
      });
      Alert.alert(STRINGS.ALERT_SUCCESS_TITLE, STRINGS.ALERT_STATUS_UPDATED);
    } catch (_e) {
      // Optionally handle error
    }
  }, [mealPlanInfo, updateStatus]);

  return (
    <ErrorBoundary>
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
              {mealPlanInfo?.recipe?.jsonData?.calories} {STRINGS.UNIT_KCAL}
            </Text>
          </View>
          <View>
            {mealPlanInfo?.mealPlan?.status !== true ? (
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
    </ErrorBoundary>
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
