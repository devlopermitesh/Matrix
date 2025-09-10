import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomeSafeAreaView from '../components/atoms/CustomeSafeAreaView';
import Icon from '../components/atoms/Icon';
import { RFValue } from 'react-native-responsive-fontsize';
import { goBack } from '../navigation/Navigationutils';
import AvatarDetails from '../components/moleculers/AvatarDetails';
import useAccount from '../state/userState';
import ApprenceItem from '../components/moleculers/ApprenceItem';
import Icontitle from '../components/atoms/Icontitle';
import AppranceCollection from '../components/organism/AppranceCollection';

const Profile = () => {
  const { user } = useAccount();

  return (
    <CustomeSafeAreaView>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity accessibilityRole='button' accessible={true} onPress={() => goBack()} style={styles.backButton}>
          <Icon
            
            name="angle-left"
            color="#333"
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
       <AppranceCollection/>
      </ScrollView>
    </CustomeSafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(12),

    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  backButton: {
    paddingHorizontal: 15,
    padding:4,
  },
  headerTitle: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: '#000',
  },
  content: {
    paddingHorizontal: RFValue(16),
    paddingBottom: RFValue(30),
  },
});
