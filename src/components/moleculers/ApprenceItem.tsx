import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';

interface ApprenceItemProps {
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

const ApprenceItem: React.FC<ApprenceItemProps> = ({ title, children, style }) => {
  return (
    <View style={styles.colStyle}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.itemOption, style]}>
        {children}
      </View>
    </View>
  );
};

export default ApprenceItem;

const styles = StyleSheet.create({
  colStyle: {
    flexDirection: 'column',
    gap: 12,
    marginVertical: 4,
    backgroundColor:'#ffffff',
    borderRadius:20,
    padding:10,
        // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#ffffff',

    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
     // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 2,

  },
});
