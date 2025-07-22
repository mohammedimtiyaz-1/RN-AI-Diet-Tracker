import { View, Text, FlatList } from 'react-native'
import React from "react";

import Colors from '../shared/Colors';

import LoadingDialog from './LoadingDialog';

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

export default function RecipeSteps({ recipeDetail }) {
    const steps = (recipeDetail?.jsonData)?.steps;

    const [loading, setLoading] = React.useState(false);

  return (
    <ErrorBoundary>
      <>
        <LoadingDialog loading={loading} />
        <View
          style={{
            marginTop: 15
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold'
            }}>Directions</Text>

            <FlatList
                data={steps}
                renderItem={({ item, index }) => (
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10,
                        marginTop: 10,
                        padding: 10,
                        flex: 1,
                        alignItems: 'center',
                        borderWidth: 0.3,
                        borderRadius: 15
                    }}>
                        <Text style={{
                            fontSize: 15,
                            backgroundColor: Colors.PRIMARY,
                            padding: 10,
                            borderRadius: 99,
                            paddingHorizontal: 15,
                            color: Colors.WHITE,
                        }}>{index + 1}</Text>
                        <Text style={{
                            fontSize: 16,
                            flex: 1,
                            lineHeight: 25,
                            fontWeight: '300',
                            flexShrink: 1
                        }}>{item}</Text>
                    </View>

                )}
            />
        </View>
      </>
    </ErrorBoundary>
  );
}