import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../shared/Colors";
import Prompt from "../shared/Prompt";
import { GenerateAIRecipe, GenerateRecipeImage } from "../services/AiModel";
import LoadingDialog from "./LoadingDialog";
import { useMutation } from "convex/react";
import { api } from "./../convex/_generated/api";
import { UserContext } from "./../context/UserContext";
import { useRouter } from "expo-router";
export default function RecipeOptionList({ recipeOption }) {
  const [loading, setLoading] = useState(false);
  const CreateRecipe = useMutation(api.Recipes.CreateRecipe);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const onRecipeOptionSelect = async (recipe) => {
    setLoading(true);
    const PROMPT =
      "RecipeName: " +
      recipe?.recipeName +
      " Description:" +
      recipe?.description +
      Prompt.GENERATE_COMPLETE_RECIPE_PROMPT;

    try {
      const result = await GenerateAIRecipe(PROMPT);
      const extractJson = result.choices[0].message.content
        .replace("```json", "")
        .replace("```", "");
      const parsedJSONResp = JSON.parse(extractJson);
      console.log({ PROMPT }, "--results", parsedJSONResp);

      console.log("recipe list", parsedJSONResp?.imagePrompt);

      console.log("user details", user);
      // Save to Database
      const saveRecipeResult = await CreateRecipe({
        jsonData: parsedJSONResp,

        recipeName: parsedJSONResp?.recipeName,
        uid: user?._id,
      });
      console.log("save rescipe reuslt", saveRecipeResult);
      // Redirect to Recipe Details Screen

      setLoading(false);
      router.push({
        pathname: "/recipe-detail",
        params: {
          recipeId: saveRecipeResult,
        },
      });
    } catch (e) {
      console.log("Error in recipe option select", e);
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Select Recipe
      </Text>

      <View>
        {recipeOption?.map((item, index) => (
          <TouchableOpacity
            onPress={() => onRecipeOptionSelect(item)}
            key={index}
            style={{
              padding: 15,
              borderWidth: 0.2,
              borderRadius: 15,
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {item?.recipeName}
            </Text>
            <Text
              style={{
                color: Colors.GRAY,
              }}
            >
              {item?.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <LoadingDialog loading={loading} />
    </View>
  );
}
