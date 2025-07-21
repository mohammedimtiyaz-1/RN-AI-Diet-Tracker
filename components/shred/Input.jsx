import { TextInput, View } from "react-native";

const Input = ({
  placeholder = "type here ...",
  password = false,
  onChangeText = () => {},
}) => {
  return (
    <View style={{ width: "100%", marginVertical: 10 }}>
      <TextInput
        secureTextEntry={password}
        onChangeText={onChangeText}
        style={{
          padding: 8,
          borderWidth: 1,
          borderRadius: 10,
          width: "100%",
          fontSize: 16,
        }}
        placeholder={placeholder}
      ></TextInput>
    </View>
  );
};

export default Input;
