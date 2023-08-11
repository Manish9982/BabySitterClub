import { StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import Spaces from '../helper/Spaces'

const TextInputComponent = ({ value, onChangeText, placeholder, editable = true }) => {
  return (
    <TextInput
      editable={editable}
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      activeOutlineColor=''
      mode="outlined"
      label={placeholder}
    />
  )
}
export default TextInputComponent

const styles = StyleSheet.create({
  input:
  {
    marginVertical: Spaces.med,
    justifyContent: 'center',
  }
})