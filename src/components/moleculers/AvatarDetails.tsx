import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { User } from '../../state/userState';
import Avatar from '../atoms/Avatar';
import { useThemedStyles } from '../../utils/useThemedStyles';
import { ThemeColors } from '../../constant/theme';

interface AvatarDetailsProps {
  user: User | null;
}

const AvatarDetails: React.FC<AvatarDetailsProps> = ({ user }) => {
  const styles=useThemedStyles(stylesCreator)
  return (
    <View testID={'avatar'} style={styles.rowContainer}>
      <Avatar name={user?.username ?? 'random'} size={60} />

      <View style={styles.colContainer}>
        <Text style={styles.username}>{user?.username ?? 'Guest User'}</Text>
        <Text style={styles.punchLine}>
          {user?.punchLine ?? 'No punchline yet ✨'}
        </Text>
      </View>
    </View>
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
