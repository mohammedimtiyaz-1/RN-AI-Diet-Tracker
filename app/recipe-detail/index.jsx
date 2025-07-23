import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useRef } from "react";
import { FlatList, Platform, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import AddToMealActionSheet from "../../components/AddToMealActionSheet";
import RecipeIngredients from "../../components/RecipeIngredients";
import RecipeIntro from "../../components/RecipeIntro";
import RecipeSteps from "../../components/RecipeSteps";
import { api } from "../../convex/_generated/api";
import Colors from "../../shared/Colors";
import Button from "./../../components/shared/Button";
export default function RecipeDetail() {
  const { recipeId } = useLocalSearchParams();
  const actionSheetRef = useRef(null);
  const recipeDetail = useQuery(api.Recipes.GetRecipeById, {
    id: recipeId === undefined ? "jh71x182rv0he0v44gfht3y4h17m7pch" : recipeId,
  });

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View
          style={{
            padding: 20,
            paddingTop: Platform.OS == "ios" ? 40 : 30,
            backgroundColor: Colors.WHITE,
            height: "100%",
          }}
        >
          {/* Recipe Intro  */}
          <RecipeIntro
            recipeDetail={recipeDetail}
            showActionSheet={() => actionSheetRef.current.show()}
          />
          {/* Recipe Ingrdient  */}
          <RecipeIngredients recipeDetail={recipeDetail} />
          {/* Cooking Steps  */}
          <RecipeSteps recipeDetail={recipeDetail} />

          <View
            style={{
              marginTop: 15,
            }}
          >
            <Button
              title={"Add to Meal Plan"}
              onPress={() => actionSheetRef.current.show()}
            />
          </View>

          <ActionSheet ref={actionSheetRef}>
            <AddToMealActionSheet
              recipeDetail={recipeDetail}
              hideActionSheet={() => actionSheetRef.current.hide()}
            />
          </ActionSheet>
        </View>
      }
    ></FlatList>
  );
}
