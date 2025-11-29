import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomeSafeAreaView from '../components/atoms/CustomeSafeAreaView';
import Icon from '../components/atoms/Icon';
import { RFValue } from 'react-native-responsive-fontsize';
import { goBack } from '../navigation/Navigationutils';
import AvatarDetails from '../components/moleculers/AvatarDetails';
import useAccount from '../state/userState';
import AppranceCollection from '../components/organism/AppranceCollection';
import { ThemeColors } from '../constant/theme';
import { useThemedStyles } from '../utils/useThemedStyles';
import { useTheme } from '../utils/ThemeContext';

const Profile = () => {
  const { user } = useAccount();
  const {isDark}=useTheme()
  const styles=useThemedStyles(stylesCreator)
  return (
    <CustomeSafeAreaView style={styles.bgColor}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          testID="backButton"
          accessibilityRole="button"
          accessible={true}
          onPress={() => goBack()}
          style={styles.backButton}
        >
          <Icon
            name="angle-left"
            color={isDark ?"#fff":"#333"}
            size={RFValue(22)}
            iconType="font-awesome"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: RFValue(22) }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <AvatarDetails user={user} />
        <AppranceCollection />
      </ScrollView>
    </CustomeSafeAreaView>
  );
};

export default Profile;

const stylesCreator=(colors:ThemeColors)=> StyleSheet.create({
    bgColor:{
    backgroundColor:colors.spacebackground
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(12),

    backgroundColor:colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor:colors.shadow,
    shadowColor:colors.border,
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  backButton: {
    paddingHorizontal: 15,
    padding: 4,
  },
  headerTitle: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color:colors.text,
  },
  content: {
    paddingHorizontal: RFValue(16),
    paddingBottom: RFValue(30),
  },
});
