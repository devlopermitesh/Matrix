import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Sun from '../../asset/Images/sun.png';
import Moon from '../../asset/Images/moon.png';
import { useThemedStyles } from '../../utils/useThemedStyles';
import { ThemeColors } from '../../constant/theme';
interface DarkLightToggleProps {
  isDark: boolean;
  onPress: () => void;
  testId?: string;
}
const DarkLightToggle: React.FC<DarkLightToggleProps> = ({
  isDark,
  onPress,
  testId,
}) => {
  const styles=useThemedStyles(stylesCreator)

  return (
    <TouchableOpacity
      testID={testId}
      accessibilityRole="button"
      style={[styles.container]}
      onPress={onPress}
    >
      <View style={styles.iconWrapper}>
        <Image
          accessibilityLabel="Sun Icon"
          source={Sun} // Sun image
          style={[
            styles.icon,
            !isDark && styles.visibleIcon,
            {
              tintColor: '#ffffffff',
            },
          ]}
        />
        <Image
          accessibilityLabel="moon Icon"
          source={Moon} // Moon image
          style={[styles.icon, isDark && styles.visibleIcon]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DarkLightToggle;

const stylesCreator=(colors:ThemeColors)=> StyleSheet.create({
  container: {
    width: 70,
    height: 34,
    borderRadius: 20,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    backgroundColor: '#eeefefff',
    
    // Shadow for Android
    elevation: 2,
  },

  iconWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  icon: {
    width: 22,
    height: 22,
    objectFit: 'cover',
    tintColor: '#7d7070ff',
    opacity: 0, // hidden by default
  },
  visibleIcon: {
    opacity: 1,
  },
});
