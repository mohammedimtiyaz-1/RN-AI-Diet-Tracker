import { Text, TouchableOpacity } from 'react-native'
import colors from "../../shared/color"

const Button = ({title="Button",onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} 
    style={{
      backgroundColor: colors.PRIMARY ,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      marginVertical:10,
      height: 60,}}>
      <Text style={{fontSize:20,color:colors.WHITE,textAlign:'center'}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button