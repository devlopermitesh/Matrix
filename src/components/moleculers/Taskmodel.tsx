import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Icon from "../atoms/Icon";
import { Categories } from "../../data/constant";
import { Calendar } from "react-native-calendars";

export interface Item {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  category: Categories;
  iscompleted: boolean;
}

interface TaskFormData {
  title: string;
  description?: string;
  quadrant: Categories;
  dueDate?: string;
}

const TaskModal: FC<{ 
  visible: boolean; 
  model_title:string;
  onClose: () => void; 
  predata?:Item
  onSave: (data: TaskFormData) => void;
}> = ({ visible, onClose, onSave,model_title,predata }) => {
  const [activeCategory,setActiveCategory]=useState(Categories.urgentImportant)
  const [showCalendar, setShowCalendar] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: predata?.name ??'',
      description: predata?.description??'',
      quadrant: predata?.category??Categories.urgentImportant,
      dueDate: predata?.dueDate.toString() ?? '',
    },
  });

  const quadrantOptions = [
    { key: Categories.urgentImportant, label: "urgent & Important",  },
    { key: Categories.noturgentImportant, label: "not Urgent & Important", },
    { key: Categories.urgentnotImportant, label: "Urgent & not Important", },
    { key: Categories.noturgentnotImportant, label:"not Urgent & not Important", },
  ];

  const onSubmit = (data: TaskFormData) => {
    onSave(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

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
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.modalContent}>
                {/* Header with close button */}
                <View style={styles.header}>
                  <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                    <View style={styles.closeIcon} />
                  </TouchableOpacity>
                </View>

                {/* Title */}
                <Text style={styles.title}>{model_title}</Text>

                {/* Task Title Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Task Title</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: 'Task title is required',
                      minLength: {
                        value: 3,
                        message: 'Title must be at least 3 characters',
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          styles.input,
                          errors.title && styles.inputError,
                        ]}
                        placeholder="e.g., Design new onboarding flow"
                        placeholderTextColor="#999"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="title"
                  />
                  {errors.title && (
                    <Text style={styles.errorText}>{errors.title.message}</Text>
                  )}
                </View>

                {/* Description Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Description (optional)</Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.textAreaInput}
                        placeholder="Add more details about the task..."
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="description"
                  />
                </View>

                {/* Quadrant Selection */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Quadrant</Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <View style={styles.quadrantContainer}>
                          {quadrantOptions.map((option) => (
                            <TouchableOpacity
                              key={option.key}
                              style={[
                                styles.quadrantButton,
                                option.key === activeCategory && styles.quadrantButtonActive,
                           
                              ]}
                              onPress={() =>{
                                 onChange(option.key)
                                 setActiveCategory(option.key)

                              }}
                            >
                              <Text
                                style={[
                                  styles.quadrantButtonText,
                               option.key === activeCategory && styles.quadrantButtonTextActive,
                                ]}
                              >
                                {option.label}
                              </Text>
                            </TouchableOpacity>
                          ))}
                      
                      </View>
                    )}
                    name="quadrant"
                  />
                </View>

                {/* Due Date Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Due Date (optional)</Text>
<Controller
  control={control}
  name="dueDate"
  render={({ field: { onChange, value } }) => (
    <>
      {/* Input field */}
      <TouchableOpacity
        style={styles.dateInputContainer}
        onPress={() => setShowCalendar(true)}
      >
        <Text style={{ color: value ? '#000' : '#999' }}>
          {value || 'Select due date'}
        </Text>
        <Icon name="calendar" iconType="ionicons" size={20} color="#666" />
      </TouchableOpacity>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.calendarWrapper}>
              <Calendar
                onDayPress={(day) => {
                  onChange(day.dateString); // update form
                  setShowCalendar(false);   // close modal
                }}
                markedDates={{
                  [value || '']: { selected: true, selectedColor: '#4A90E2' },
                }}
                theme={{
                  todayTextColor: '#1591EA',
                  arrowColor: '#1591EA',
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )}
/>


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
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#fff',
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
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  textAreaInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 4,
  },
  quadrantContainer: {
    flexDirection:"row",
    flex:1,
    flexWrap:"wrap",
    justifyContent: 'space-between', // gap between items horizontally

  },
 
  quadrantButton: {
    marginTop:6,
    marginHorizontal:1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexWrap:"wrap",
    justifyContent:"center",
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    width: '48%',          // 2 columns
    padding: 8, 

  },
  quadrantButtonActive: {
    backgroundColor: '#4A90E2',
  },
  quadrantButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  quadrantButtonTextActive: {
    color: '#fff',
  },

  dateInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  calendarIcon: {
    paddingHorizontal: 12,
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
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
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
  modalBackground: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
calendarWrapper: {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 16,
  width: '90%',
  maxHeight: '80%',
},
dateInputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderColor: '#E0E0E0',
  borderRadius: 8,
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: '#F9F9F9',
},

});

export default TaskModal;