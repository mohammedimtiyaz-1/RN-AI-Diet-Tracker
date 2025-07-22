import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import React, { useContext, useState, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GenerateAIRecipe, GenerateRecipeImage } from "../services/AiModel";
import Colors from "../shared/Colors";
import Prompt from "../shared/Prompt";
import { UserContext } from "./../context/UserContext";
import { api } from "./../convex/_generated/api";
import LoadingDialog from "./LoadingDialog";
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

export default function RecipeOptionList({ recipeOption }) {
  const [loading, setLoading] = useState(false);
  const CreateRecipe = useMutation(api.Recipes.CreateRecipe);
  const { user } = useContext(UserContext);
  const router = useRouter();

  const onRecipeOptionSelect = useCallback(async (recipe) => {
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
      //Generate RecipeImage
      const aiImageResp = await GenerateRecipeImage(
        parsedJSONResp?.imagePrompt
      );
      // Save to Database
      const saveRecipeResult = await CreateRecipe({
        jsonData: parsedJSONResp,
        imageUrl: aiImageResp?.data?.image,
        recipeName: parsedJSONResp?.recipeName,
        uid: user?._id,
      });
      setLoading(false);
      router.push({
        pathname: "/recipe-detail",
        params: {
          recipeId: saveRecipeResult,
        },
      });
    } catch (_e) {
      setLoading(false);
      // Optionally handle error
    }
  }, [CreateRecipe, router, user]);

  return (
    <ErrorBoundary>
      <>
        <LoadingDialog loading={loading} />
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
        {STRINGS.OPTIONS_TITLE}
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
      </View>
      </>
    </ErrorBoundary>
  );
}
