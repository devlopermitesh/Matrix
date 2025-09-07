import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomeSafeAreaView from "../components/atoms/CustomeSafeAreaView";
import { Categories, Colors, Item } from "../data/constant";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "../components/atoms/Icon";
import { RFValue } from "react-native-responsive-fontsize";
import { useTodos } from "../state/todos";
import TaskModal from "../components/moleculers/Taskmodel";
import { goBack, navigate } from "../navigation/Navigationutils";

const TaskDetail = () => {
  const route = useRoute();
  const {markStatusChange,deleteTodo,updateTodos}=useTodos()
    const [visible, setVisible] = useState(false);
  const { id, name, category, description, dueDate, iscompleted } =
    route.params as Item;
  const [isCompleted,setIsCompleted]=useState(iscompleted)

  return (
    <CustomeSafeAreaView>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon
            name="angle-left"
            color="#333"
            size={RFValue(22)}
            iconType="font-awesome"
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{name}</Text>

        {/* Category */}
<Text
  style={{
    color: Colors[category as unknown as keyof typeof Colors],
  }}
>
  {Categories[Categories[category] as any]}
</Text>


        {/* Due Date */}
        <View style={styles.dateRow}>
          <Icon name="calendar" iconType="font-awesome" size={RFValue(14)} />
          <Text style={styles.dateText}>
            Due: {new Date(dueDate).toDateString()}
          </Text>
        </View>

        {/* Description */}
        <View style={styles.descriptionBox}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        {/* Buttons */}
        <View style={{marginTop:"auto"}}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={()=>setVisible(true)}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.completeButton, iscompleted && styles.disabledBtn]}
            disabled={isCompleted}
            onPress={async()=>{
            setIsCompleted(true)
             await markStatusChange(id,true)
             navigate("Home")

            }}
          >
            <Text
              style={[
                styles.completeText,
                isCompleted && styles.disabledText,
              ]}
            >
              {isCompleted? "Completed" : "Mark Complete"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={async()=>{

      if (deleteTodo && id) {
          await deleteTodo(id);
            }
       navigate("Home")
        }}>
          <Text style={styles.deleteText}>Delete Task</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
        {visible && (
        <TaskModal
          visible={visible}
          model_title='Edit Task'
          predata={{ id, name, category, description, dueDate, iscompleted }}
          onClose={() => setVisible(false)}
          onSave={async(data) => {
            const item: Item = {
              id: Math.random().toString(36).substring(2, 10),
              name: data.title,
              description: data.description ?? '',
              dueDate: new Date(data.dueDate || Date.now()),
              category: data.quadrant,
              iscompleted: false,
            };
            //update funciton to update task
            await updateTodos(id,item)
            setVisible(false);
            navigate("Home")

          }}
        />
      )}
    </CustomeSafeAreaView>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(10),
  },
  content: {
    paddingHorizontal: RFValue(16),
    paddingBottom: RFValue(30),
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: "700",
    color: "#000",
    marginBottom: RFValue(6),
  },
  category: {
    fontSize: RFValue(12),
    fontWeight: "600",
    marginBottom: RFValue(16),
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(20),
  },
  dateText: {
    fontSize: RFValue(12),
    color: "#555",
    marginLeft: RFValue(6),
  },
  descriptionBox: {
    backgroundColor: "#fff",
    borderRadius: RFValue(10),
    padding: RFValue(12),
    marginBottom: RFValue(20),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 1,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: RFValue(13),
    marginBottom: RFValue(6),
    color: "#000",
  },
  description: {
    fontSize: RFValue(12),
    color: "#444",
    lineHeight: RFValue(18),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: RFValue(16),
  },
  editButton: {
    flex: 1,
    backgroundColor: "#eee",
    paddingVertical: RFValue(10),
    borderRadius: RFValue(8),
    alignItems: "center",
    marginRight: RFValue(10),
  },
  editText: {
    color: "#555",
    fontWeight: "600",
  },
  completeButton: {
    flex: 1,
    backgroundColor: "#1e90ff",
    paddingVertical: RFValue(10),
    borderRadius: RFValue(8),
    alignItems: "center",
  },
  completeText: {
    color: "#fff",
    fontWeight: "600",
  },
  disabledBtn: {
    backgroundColor: "#b0c4de",
  },
  disabledText: {
    color: "#eee",
  },
  deleteButton: {
    marginTop: RFValue(10),
    alignItems: "center",
  },
  deleteText: {
    color: "red",
    fontWeight: "600",
  },
});
