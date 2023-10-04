import { StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import Spaces from '../helper/Spaces'
import Colors from '../helper/Colors'

const TextInputComponent = ({ value, onChangeText, placeholder, editable = true, multiline = false, keyboardType = 'default', maxlength = null, secureTextEntry = false, onPressIcon, isRightIconNeeded = false, iconName }) => {
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
      multiline={multiline}
      keyboardType={keyboardType}
      maxlength={maxlength}
      secureTextEntry={secureTextEntry}
      right={
        isRightIconNeeded
        &&
        <TextInput.Icon icon={iconName} color={secureTextEntry ? null : Colors.Secondary} onPress={onPressIcon} />
      }
    />
  )
}
export default TextInputComponent

const styles = StyleSheet.create({
  input:
  {
    width: '90%',
    alignSelf: 'center',
    marginVertical: Spaces.med,
    justifyContent: 'center',
  }
})