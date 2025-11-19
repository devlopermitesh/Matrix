import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { RFValue } from 'react-native-responsive-fontsize';

dayjs.extend(relativeTime);

interface DayProps {
  date: string;
  style?: ViewStyle;
}

const Day = ({ date, style }: DayProps) => {
  const label = dayjs(date).fromNow();

  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default Day;

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start', // shrink to text width
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Android shadow
    marginVertical: 4,
  },
  text: {
    fontSize: RFValue(10),
    color: '#333',
    fontWeight: '500',
  },
});
