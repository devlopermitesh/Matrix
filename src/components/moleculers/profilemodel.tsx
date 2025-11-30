import { FC } from "react"
import { User } from "../../state/userState"
import { Controller, useForm } from "react-hook-form"
import { Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { ThemeColors } from "../../constant/theme"
import { useThemedStyles } from "../../utils/useThemedStyles"

const ProfileModel:FC<{model_title: string,predata?:User,onClose:()=>void,visible:boolean,onSave:(data:User)=>void}>=({model_title,onClose,onSave,visible,predata})=>{

const {control,handleSubmit,reset,formState:{errors,isValid}}=useForm<User>({
    defaultValues:{
        username: predata?.username ?? "Guest",
        punchLine:predata?.punchLine?? "No punchline yet ✨"
    }
})
const onSubmit=async(data:User)=>{
const updatedData:User={
username:predata?.username ?? data.username,
punchLine:predata?.punchLine ?? data.punchLine
}
 await onSave(updatedData);
  reset();
  onClose();

}
const handleClose=()=>{
reset();
onClose();
}

   const styles=useThemedStyles(stylesCreator)


  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
          >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.modalContent}>
                {/* Header with close button */}
                <View style={styles.header}>
                  <TouchableOpacity
                    testID="close-button"
                    style={styles.closeButton}
                    onPress={handleClose}
                  >
                    <View style={styles.closeIcon} />
                  </TouchableOpacity>
                </View>

                {/* Title */}
                <Text style={styles.title}>{model_title}</Text>
                
                 {/* username Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Username </Text>
                  <Controller
                    control={control}
                    rules={{
                      required: 'username is required',
                      maxLength: {
                        value: 15,
                        message: 'name must be not longer then 15 characters',
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          styles.input,
                          errors.username && styles.inputError,
                        ]}
                        placeholder=" your awesome username..."
                        placeholderTextColor="#999"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="username"
                  />
                  {errors.username && (
                    <Text style={styles.errorText}>{errors.username.message}</Text>
                  )}
                </View>
                
                 {/* punchline Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Punchline ✨</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: 'punchline is required',
                 
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          styles.input,
                          errors.punchLine && styles.inputError,
                        ]}
                        placeholder="Share a line that motivates you…🔥"
                        placeholderTextColor="#999"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="punchLine"
                  />
                  {errors.punchLine && (
                    <Text style={styles.errorText}>{errors.punchLine.message}</Text>
                  )}
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleClose}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.saveButton,
                      !isValid && styles.saveButtonDisabled,
                    ]}
                    onPress={handleSubmit(onSubmit)}
                    disabled={!isValid}
                  >
                    <Text style={styles.saveButtonText}>Save Task</Text>
                  </TouchableOpacity>
                </View>

                </View>
                </ScrollView>
                </KeyboardAvoidingView>
                </View>
                </TouchableWithoutFeedback>
                </Modal>
)



}
export default ProfileModel



const stylesCreator=(colors:ThemeColors) => StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.formbackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
   header: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  closeButton: {
    alignSelf: 'center',
  },
  closeIcon: {
    width: 40,
    height: 4,
    backgroundColor: colors.closeIcon,
    borderRadius: 2,
  },
    title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.formheading,
    marginBottom: 24,
  },
  
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.label,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.inputborder,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color:colors.text,
    fontSize: 16,
    backgroundColor:colors.inputbg,
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 4,
  },
  
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor:colors.quandartBG,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.label,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
})