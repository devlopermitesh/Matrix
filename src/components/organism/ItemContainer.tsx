import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ListItem from '../moleculers/ListItem';
import { Colors, Item } from '../../data/constant';

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000', // Dark black for title
  },
  emptyView: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#555',
    fontSize: 16,
  },
});
