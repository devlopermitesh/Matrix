import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { User } from '../../state/userState';
import Avatar from '../atoms/Avatar';
import { useThemedStyles } from '../../utils/useThemedStyles';
import { ThemeColors } from '../../constant/theme';

interface AvatarDetailsProps {
  user: User | null;
  onPress:()=>void;
}

const AvatarDetails: React.FC<AvatarDetailsProps> = ({ user ,onPress }) => {
  const styles=useThemedStyles(stylesCreator)
  return (
    <Pressable testID={'avatar'} style={styles.rowContainer} onPress={onPress} >
      <Avatar name={user?.username ?? 'random'} size={60} />

      <View style={styles.colContainer}>
        <Text style={styles.username}>{user?.username ?? 'Guest User'}</Text>
        <Text style={styles.punchLine}>
          {user?.punchLine ?? 'No punchline yet ✨'}
        </Text>
      </View>
    </Pressable>
  );
};

export default AvatarDetails;

const stylesCreator=(colors:ThemeColors)=> StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor:colors.background,
    borderRadius: 12,
    shadowColor:colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
  },
  colContainer: {
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  punchLine: {
    fontSize: 14,
    color:colors.label,
    marginTop: 2,
  },
});
