import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import ItemContainer from '../../../../src/components/organism/ItemContainer';
import { Categories, Colors, Item } from '../../../../src/data/constant';

// Mock ListItem with just a View containing the item data as props
jest.mock('../../../../src/components/moleculers/ListItem', () => {
  return ({ item }: { item: Item }) => {
    const { View } = require('react-native');
    return (
      <View 
        testID={`list-item-${item.id}`}
        accessibilityLabel={item.name}
        // Store item data in props for testing without Text
        {...{ itemName: item.name, itemId: item.id }}
      />
    );
  };
});

describe('ItemContainer', () => {
  const sampleItems: Item[] = [
    { id: '1', name: 'Task 1', description: '', dueDate: new Date(), category: Categories.noturgentImportant, iscompleted: false },
    { id: '2', name: 'Task 2', description: '', dueDate: new Date(), category: Categories.noturgentImportant, iscompleted: true },
  ];

  it('renders title correctly', () => {
    const { getByText } = render(
      <ItemContainer items={sampleItems} title="My Tasks" category="urgentImportant" />
    );

    expect(getByText('My Tasks')).toBeTruthy();
  });

  it('renders empty view when no items', () => {
    const { getByText } = render(
      <ItemContainer items={[]} title="Empty Category" category="noturgentImportant" />
    );

    expect(getByText('No Task in this Category')).toBeTruthy();
  });

  it('renders ListItem for each item', () => {
    const { getByTestId } = render(
      <ItemContainer items={sampleItems} title="Tasks" category="urgentImportant" />
    );

    // Test using accessibilityLabel instead of text content
    expect(getByTestId('list-item-1').props.accessibilityLabel).toBe('Task 1');
    expect(getByTestId('list-item-2').props.accessibilityLabel).toBe('Task 2');
    
    // Or test using custom props
    expect(getByTestId('list-item-1').props.itemName).toBe('Task 1');
    expect(getByTestId('list-item-2').props.itemName).toBe('Task 2');
  });

  it('renders correct number of ListItems', () => {
    const { getAllByTestId } = render(
      <ItemContainer items={sampleItems} title="Tasks" category="urgentImportant" />
    );

    const listItems = getAllByTestId(/list-item-/);
    expect(listItems).toHaveLength(2);
  });

  it('applies correct border color based on category', () => {
    const { getByText } = render(
      <ItemContainer items={[]} title="Tasks" category="urgentImportant" />
    );

    const container = getByText('Tasks').parent;
    console.log("container ",container)
    expect(container?.props.style[1].borderLeftColor).toBe(Colors['urgentImportant']);
  });

  it('passes correct item data to ListItem components', () => {
    const { getByTestId } = render(
      <ItemContainer items={sampleItems} title="Tasks" category="urgentImportant" />
    );

    const firstItem = getByTestId('list-item-1');
    expect(firstItem.props.itemId).toBe('1');
    expect(firstItem.props.itemName).toBe('Task 1');

    const secondItem = getByTestId('list-item-2');
    expect(secondItem.props.itemId).toBe('2');
    expect(secondItem.props.itemName).toBe('Task 2');
  });
});
