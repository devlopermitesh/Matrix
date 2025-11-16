import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { IconThemeType } from '../../data/constant';
import { RFValue } from 'react-native-responsive-fontsize';
import bellImg from '../../asset/Images/bell.png';
import infoImg from '../../asset/Images/info.png';
import themeImg from '../../asset/Images/theme.png';

interface IconTitleProps {
  name: string;
  Icontype: IconThemeType;
  style?: ViewStyle;
}

const Icontitle: React.FC<IconTitleProps> = ({ Icontype, name, style }) => {
  const getImage = () => {
    switch (Icontype) {
      case 'bell':
        return bellImg;
      case 'info':
        return infoImg;
      case 'theme':
        return themeImg;
      default:
        return themeImg;
    }
  };

  return (
    <View style={[styles.iconContainer, style]}>
      <Image
        accessibilityRole="image"
        accessible={true}
        source={getImage()}
        style={styles.iconImage}
      />
      <Text style={styles.iconText}>{name}</Text>
    </View>
  );
};

export default Icontitle;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#ffffff',

    shadowColor: '#000', // subtle shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Android shadow
  },
  iconImage: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
  },
  iconText: {
    color: '#0c0c0cff',
    fontSize: RFValue(14),
    fontStyle: 'italic',
    fontWeight: '300', // thin font
    fontFamily: 'System', // default iOS/Android font, can change to custom
  },
});
