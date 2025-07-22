import { FlatList, Text, View } from "react-native";
import Colors from "../shared/Colors";
import STRINGS from '../constants/strings';

import React, { Component } from 'react';

// Simple Error Boundary (replace with shared if available)
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Log error if needed
  }
  render() {
    if (this.state.hasError) {
      return <Text style={{ color: 'red', textAlign: 'center', margin: 20 }}>Something went wrong.</Text>;
    }
    return this.props.children;
  }
}

export default function RecipeIngredients({ recipeDetail }) {
  let ingrdients = [];
  try {
    ingrdients = recipeDetail?.jsonData?.ingredients || [];
  } catch (_e) {
    // Optionally handle error
    ingrdients = [];
  }
  return (
    <ErrorBoundary>
      <View
        style={{
          marginTop: 15,
        }}
      >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {STRINGS.INGREDIENTS_TITLE}
        </Text>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          {ingrdients?.length} Items{" "}
        </Text>
      </View>

      <FlatList
        data={ingrdients}
        renderItem={({ item, index }) => (
          <View
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text
                style={{
                  padding: 7,
                  fontSize: 23,
                  backgroundColor: Colors.SECONDERY,
                  borderRadius: 99,
                }}
              >
                {item?.icon}
              </Text>

              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                }}
              >
                {item?.ingredient}
              </Text>
            </View>
            <Text
              style={{
                color: Colors.GRAY,
                fontSize: 16,
              }}
            >
              {item?.quantity}
            </Text>
          </View>
        )}
      />
    </View>
    </ErrorBoundary>
  );
}
