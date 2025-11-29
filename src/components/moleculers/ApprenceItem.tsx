import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { ThemeColors } from '../../constant/theme';
import { useThemedStyles } from '../../utils/useThemedStyles';

interface ApprenceItemProps {
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

const ApprenceItem: React.FC<ApprenceItemProps> = ({
  title,
  children,
  style,
  testID,
}) => {
  const styles=useThemedStyles(stylesCreator)
  return (
    <View testID={testID} style={styles.colStyle}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.itemOption, style]} testID="item-option">
        {children}
      </View>
    </View>
  );
};

export default ApprenceItem;

const stylesCreator=(colors:ThemeColors)=> StyleSheet.create({
  colStyle: {
    flexDirection: 'column',
    gap: 12,
    marginVertical: 4,
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 10,
    // Shadow for iOS
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color:colors.cardlabel,
  },
  itemOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:colors.background,

    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    // Shadow for iOS
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 2,
  },
});
