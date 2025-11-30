import { Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import PlusIcon from '../../asset/Images/plusIcon.png';
import { ThemeColors } from '../../constant/theme';
import { useThemedStyles } from '../../utils/useThemedStyles';
const PlusButton = ({
  style,
  onPress,
}: {
  style: ViewStyle;
  onPress: () => void;
}) => {
  const styles=useThemedStyles(stylesCreator)
  return (
    <TouchableOpacity
      testID="plus-button"
      style={[styles.buttonContainer, style]}
      onPress={onPress}
    >
      <Image
        source={PlusIcon}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </TouchableOpacity>
  );
};

export default PlusButton;

const stylesCreator=(colors:ThemeColors) => StyleSheet.create({
  buttonContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#1591EA',
    borderRadius: 50, // circle
    borderWidth: 1,
    borderColor:colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.border,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // for Android shadow
  },
});
