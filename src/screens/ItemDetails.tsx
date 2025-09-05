import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomeSafeAreaView from "../components/atoms/CustomeSafeAreaView";
import Icon from "../components/atoms/Icon";
import { RFValue } from "react-native-responsive-fontsize";
import { Item } from "../data/constant";
import { useRoute, useNavigation } from "@react-navigation/native";

const ItemDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { task } = route.params as { task: Item };

  return (
    <CustomeSafeAreaView>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="angle-left"
            iconType="font-awesome"
            size={RFValue(16)}
            color="#000"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        <View style={{ width: RFValue(16) }} /> 
        {/* spacing placeholder for symmetry */}
      </View>

      {/* Task Title */}
      <View style={styles.card}>
        <Text style={styles.taskName}>{task.name}</Text>
        <Text style={[styles.category, { color: "#FF6347" }]}>
          {task.category}
        </Text>

        {/* Due Date */}
        <View style={styles.row}>
          <Icon
            name="calendar-o"
            size={RFValue(14)}
            iconType="font-awesome"
            color="#555"
          />
          <Text style={styles.dueDate}>
            {new Date(task.dueDate).toDateString()}
          </Text>
        </View>

        {/* Status */}
        <View style={[styles.statusBadge, task.iscompleted ? styles.completed : styles.pending]}>
          <Text style={styles.statusText}>
            {task.iscompleted ? "Completed ✅" : "Pending ⏳"}
          </Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.descriptionCard}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{task.description}</Text>
      </View>
    </CustomeSafeAreaView>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: RFValue(14),
    fontWeight: "700",
    color: "#000",
  },
  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  taskName: {
    fontSize: RFValue(16),
    fontWeight: "700",
    color: "#222",
    marginBottom: 5,
  },
  category: {
    fontSize: RFValue(12),
    fontWeight: "500",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dueDate: {
    marginLeft: 8,
    fontSize: RFValue(12),
    color: "#555",
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  completed: {
    backgroundColor: "#d4edda",
  },
  pending: {
    backgroundColor: "#f8d7da",
  },
  statusText: {
    fontSize: RFValue(11),
    fontWeight: "600",
    color: "#333",
  },
  descriptionCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 10,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: RFValue(13),
    fontWeight: "700",
    marginBottom: 8,
    color: "#222",
  },
  descriptionText: {
    fontSize: RFValue(12),
    color: "#444",
    lineHeight: 18,
  },
});
