import { Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import PlusIcon from '../../asset/Images/plusIcon.png';
const PlusButton = ({
  style,
  onPress,
}: {
  style: ViewStyle;
  onPress: () => void;
}) => {
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

const styles = StyleSheet.create({
  buttonContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#1591EA',
    borderRadius: 50, // circle
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // for Android shadow
  },
});
