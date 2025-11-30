import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ListItem from '../moleculers/ListItem';
import { Colors, Item } from '../../data/constant';
import { useThemedStyles } from '../../utils/useThemedStyles';
import { ThemeColors } from '../../constant/theme';

interface ItemContainerProps {
  items: Item[];
  title: string;
  category: keyof typeof Colors;
}

const ItemContainer: React.FC<ItemContainerProps> = ({
  items,
  title,
  category,
}) => {
  const styles=useThemedStyles(stylesCreator)
  return (
    <View style={[styles.container, { borderLeftColor: Colors[category] }]}>
      <Text style={styles.header}>{title}</Text>

      {items.length === 0 && (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>No Task in this Category</Text>
        </View>
      )}

      {items.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </View>
  );
};

export default ItemContainer;

const stylesCreator =(colors:ThemeColors)=> StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    backgroundColor:colors.boxbackground,
    borderLeftWidth: 6,
    shadowColor:colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    fontSize: 16,
    fontWeight: '800',
    color:colors.text, // Dark black for title
  },
  emptyView: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    marginVertical: 8,
  },
  emptyText: {
    fontStyle: 'italic',
    color: colors.emptytext,
    fontSize: 16,
  },
});
