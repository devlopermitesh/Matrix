import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from '../atoms/Icon';
import { Item } from '../../data/constant';
import Day from '../atoms/Day';
import { useTodos } from '../../state/todos';
import { Pressable } from 'react-native';
import { navigate } from '../../navigation/Navigationutils';
import { ThemeColors } from '../../constant/theme';
import { useThemedStyles } from '../../utils/useThemedStyles';

interface ListItemProps {
  item: Item;
}

const ListItem: React.FC<ListItemProps> = ({
  item: { id, name, iscompleted, description, dueDate, category },
}) => {
  const { markStatusChange } = useTodos();

  const handlePress = async () => {
    await markStatusChange(id, !iscompleted);
  };
  const styles=useThemedStyles(stylesCreator)

  return (
    <Pressable
      testID="list-item-pressable"
      onPress={async () => {
        try {
          await navigate('TaskDetail', {
            id,
            name,
            iscompleted,
            description,
            dueDate,
            category,
          });
        } catch (error) {
          console.log(error);
          Alert.alert('somethhing went wrong');
        }
      }}
      style={styles.container}
    >
      {/* Checkbox Button */}
      <TouchableOpacity
        style={styles.checkButton}
        onPress={handlePress}
        activeOpacity={0.7} // Add visual feedback
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Increase touch area
      >
        <Icon
          name={iscompleted ? 'checkmark-circle' : 'ellipse-outline'}
          iconType="ionicons"
          size={RFValue(20)}
          color={iscompleted ? '#4CAF50' : '#999'}
        />
      </TouchableOpacity>

      {/* Task Details */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.taskName,
            iscompleted && {
              textDecorationLine: 'line-through',
              color: '#777',
            },
          ]}
        >
          {name}
        </Text>

        {/* Description + Date Badge in one row */}
        <View style={styles.bottomRow}>
          <Text numberOfLines={1} style={styles.description}>
            {description}
          </Text>
          <Day
            date={
              dueDate instanceof Date && !isNaN(dueDate.getTime())
                ? dueDate.toISOString()
                : new Date().toISOString()
            }
          />
        </View>
      </View>
    </Pressable>
  );
};

export default ListItem;

const stylesCreator=(colors:ThemeColors)=> StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: RFValue(10),
    marginVertical: RFValue(6),
    borderRadius: RFValue(12),
    backgroundColor:colors.background,

    // shadow iOS
    shadowColor: colors.border,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    // shadow Android
    elevation: 2,
  },
  checkButton: {
    marginRight: RFValue(12),
    padding: RFValue(5),
    borderRadius: RFValue(5),
  },
  textContainer: {
    flex: 1,
  },
  taskName: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color:colors.text,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(2),
  },
  description: {
    fontSize: RFValue(10),
    color:colors.label,
    flex: 1,
  },
});
