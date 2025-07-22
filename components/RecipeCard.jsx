import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Clock01FreeIcons, Fire02Icon } from '@hugeicons/core-free-icons';
import Colors from '../shared/Colors';
import { Link } from 'expo-router';
import STRINGS from '../constants/strings';

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

export default function RecipeCard({ recipe }) {
    const recipeJson = recipe?.jsonData;
    const [loading, setLoading] = React.useState(false);
    return (
        <ErrorBoundary>
            <>
                <LoadingDialog loading={loading} />
                <Link href={'/recipe-detail?recipeId=' + recipe?._id}
                    style={{
                        flex: 1,
                        margin: 5
                    }}>
                    <View >
                <Image source={{ uri: recipe?.imageUrl }}
                    style={{
                        width: '100%',
                        height: 100,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15
                    }}
                />
                <View style={{
                    padding: 10,
                    backgroundColor: Colors.WHITE,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold'
                    }}>{recipe?.recipeName}</Text>

                    <View style={[styles.infoContainer, { gap: 15, marginTop: 6 }]}>
                        <View style={styles.infoContainer}>
                            <HugeiconsIcon icon={Fire02Icon} color={Colors.RED} size={18} />
                            <Text style={{
                                fontSize: 14,
                                color: Colors.GRAY
                            }}>{recipeJson?.calories} {STRINGS.UNIT_KCAL}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <HugeiconsIcon icon={Clock01FreeIcons} color={Colors.RED} size={18} />
                            <Text style={{
                                fontSize: 14,
                                color: Colors.GRAY
                            }}>{recipeJson?.cookTime} {STRINGS.UNIT_MIN}</Text>
                        </View>
                    </View>
                </View>
                    </View>
                </Link>
            </>
        </ErrorBoundary>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center'
    }
})  