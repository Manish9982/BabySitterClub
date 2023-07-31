import { StyleSheet} from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

const TextInputComponent = ({ value, onChangeText, placeholder }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      activeOutlineColor=''
      mode="outlined"
    />
  )
}
export default TextInputComponent

const styles = StyleSheet.create({
  input:
  {

  }
})