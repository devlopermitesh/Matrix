import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Home from '../../../src/screens/Home';
import { useTodos } from '../../../src/state/todos';
import notifee from '@notifee/react-native';
import { CategoryTitles } from '../../../src/data/constant';

// Mocks
jest.mock('../../../src/state/todos', () => ({
  useTodos: jest.fn(),
}));

jest.mock('../../../src/navigation/Navigationutils', () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
}));

jest.mock('../../../src/components/moleculers/Taskmodel', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return (props: { visible: boolean }) => props.visible ? <Text>TaskModal</Text> : null;
});


jest.mock('../../../src/components/atoms/CustomeSafeAreaView', () => ({ children }: any) => children);
jest.mock('../../../src/components/organism/Header', () => () => null);
jest.mock('../../../src/components/organism/ItemContainer', () => (props: any) => {
  const { Text } = require('react-native');
  return props.title ? <Text>{props.title}</Text> : null;
});


// Mock notifee
jest.mock('@notifee/react-native', () => ({
  getTriggerNotifications: jest.fn().mockResolvedValue([]),
}));

describe('Home Screen', () => {
  const mockSetData = jest.fn();
  const mockNewTodo = jest.fn();

  const todosMock = {
    urgentnotImportant: [
      { id: '1', name: 'Test Task', category: 'urgentnotImportant', description: 'desc', dueDate: new Date().toString(), iscompleted: false }
    ]
  };

  beforeEach(() => {
    (useTodos as any).mockReturnValue({
      todos: todosMock,
      setData: mockSetData,
      newtodo: mockNewTodo,
    });
  });

  it('renders todos correctly', async () => {
    const { getByText } = render(<Home />);
    await waitFor(() => expect(getByText(CategoryTitles['urgentnotImportant'])).toBeTruthy());
  });

  it('opens TaskModal when PlusButton is pressed', async () => {
 const { getByTestId,getByText } = render(<Home />);
    const plusButton = getByTestId('plus-button');
    fireEvent.press(plusButton);
    await waitFor(() => expect(getByText('TaskModal')).toBeTruthy());
  });

  it('calls newtodo when saving from TaskModal', async () => {
    const { getByTestId } = render(<Home />);
    const plusButton = getByTestId('plus-button');
    fireEvent.press(plusButton);

    // Simulate onSave from TaskModal
    const TaskModal = require('../../../src/components/moleculers/Taskmodel').mock.results[0].value;
    const onSave = TaskModal.props?.onSave ?? (() => {});

    await waitFor(() => onSave({ title: 'New Task', description: 'Desc', dueDate: new Date(), quadrant: 'urgentnotImportant' }));
    expect(mockNewTodo).toHaveBeenCalled();
  });
});
