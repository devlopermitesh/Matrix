import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "../atoms/Icon";
import { Categories, Item } from "../../data/constant";

interface ListItemProps {
  item:Item
}

const ListItem: React.FC<ListItemProps> = ({item:{ name, category, iscompleted }}) => {
  return (
    <View style={styles.container}>
      {/* Checkbox Button */}
      <TouchableOpacity style={styles.checkButton}>
        <Icon
          name={iscompleted ? "checkmark-circle" : "ellipse-outline"}
          iconType="ionicons"
          size={RFValue(20)}
          color={iscompleted ? "#4CAF50" : "#999"}
        />
      </TouchableOpacity>

      {/* Task Details */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.taskName,
            iscompleted && { textDecorationLine: "line-through", color: "#777" },
          ]}
        >
          {name}
        </Text>
        <Text style={styles.category}>{category}</Text>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: RFValue(10),
    marginVertical: RFValue(6),
    borderRadius: RFValue(12),
    backgroundColor: "#fff",

    // shadow iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    // shadow Android
    elevation: 2,
  },
  checkButton: {
    marginRight: RFValue(12),
  },
  textContainer: {
    flex: 1,
  },
  taskName: {
    fontSize: RFValue(14),
    fontWeight: "600",
    color: "#000",
  },
  category: {
    fontSize: RFValue(12),
    color: "#666",
    marginTop: RFValue(2),
  },
});
