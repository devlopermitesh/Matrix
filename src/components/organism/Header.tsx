import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { navigate } from '../../navigation/Navigationutils';
import TickIcon from '../../asset/Images/tickicon.png';
import SettingsIcon from '../../asset/Images/settingicon.png';
import { ThemeColors } from '../../constant/theme';
import { useThemedStyles } from '../../utils/useThemedStyles';
const Header = () => {
  const styles = useThemedStyles(stylesCreator);
  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        <Image
          testID="tick-icon"
          source={TickIcon}
          style={{
            height: RFValue(25),
            width: RFValue(25),
          }}
        />
        <Text style={styles.text}>FocusMatrix</Text>
      </View>

      {/* Right Section */}
      <TouchableOpacity
        testID="settings-button"
        onPress={() => navigate('Profile')}
      >
        <Image
          testID="settings-icon"
          source={SettingsIcon}
          style={styles.settingIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const stylesCreator = (colors:ThemeColors) =>{
  return  StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: RFValue(50),
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: RFValue(12),

    // shadow for iOS
    shadowColor:colors.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    // shadow for Android
    elevation: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(6),
  },
  text: {
    fontWeight: '700',
    fontSize: RFValue(18),
    color: colors.text,
  },
  settingIcon: {
    height: RFValue(26),
    width: RFValue(26),
    resizeMode: 'contain',
  },
});

}
