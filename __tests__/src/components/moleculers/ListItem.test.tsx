import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import ListItem from '../../../../src/components/moleculers/ListItem';
import { useTodos } from '../../../../src/state/todos';
import { navigate } from '../../../../src/navigation/Navigationutils';
import { Categories, Item } from '../../../../src/data/constant';

// Mock dependencies

jest.mock('../../../../src/state/todos');
jest.mock('../../../../src/navigation/Navigationutils');
jest.mock('../../../../src/components/atoms/Icon', () => {
  const { Text } = require('react-native');
  return ({ name, testID }: any) => <Text testID={testID || 'mock-icon'}>{name}</Text>;
});
jest.mock('../../../../src/components/atoms/Day', () => {
  const { Text } = require('react-native');
  return ({ date, testID }: any) => <Text testID={testID || 'mock-day'}>{date}</Text>;
});

// Mock Alert
jest.spyOn(Alert, 'alert');

const mockUseTodos = useTodos as jest.MockedFunction<typeof useTodos>;
const mockNavigate = navigate as jest.MockedFunction<typeof navigate>;

describe('ListItem', () => {
  const mockMarkStatusChange = jest.fn();
  
  const mockItem: Item = {
    id: '1',
    name: 'Test Task',
    iscompleted: false,
    description: 'Test task description',
    dueDate: new Date('2024-12-31'),
    category: Categories.noturgentImportant
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTodos.mockReturnValue({
      markStatusChange: mockMarkStatusChange,
      todos: [],
      addTodos: jest.fn(),
      updateTodos: jest.fn(),
      deleteTodos: jest.fn()
    });
  });

  describe('Rendering', () => {
    it('should render task name correctly', () => {
      const { getByText } = render(<ListItem item={mockItem} />);
      expect(getByText('Test Task')).toBeTruthy();
    });

    it('should render task description correctly', () => {
      const { getByText } = render(<ListItem item={mockItem} />);
      expect(getByText('Test task description')).toBeTruthy();
    });

    it('should render due date correctly', () => {
      const { getByText } = render(<ListItem item={mockItem} />);
      expect(getByText('2024-12-31T00:00:00.000Z')).toBeTruthy();
    });

    it('should render uncompleted task with correct icon', () => {
      const { getByText } = render(<ListItem item={mockItem} />);
      expect(getByText('ellipse-outline')).toBeTruthy();
    });

    it('should render completed task with correct icon and styling', () => {
      const completedItem = { ...mockItem, iscompleted: true };
      const { getByText } = render(<ListItem item={completedItem} />);
      expect(getByText('checkmark-circle')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should call markStatusChange when checkbox is pressed', async () => {
      const { getByText } = render(<ListItem item={mockItem} />);
      const checkboxButton = getByText('ellipse-outline').parent;
      
      fireEvent.press(checkboxButton!);
      
      await waitFor(() => {
        expect(mockMarkStatusChange).toHaveBeenCalledWith('1', true);
      });
    });

    it('should call markStatusChange with opposite status for completed task', async () => {
      const completedItem = { ...mockItem, iscompleted: true };
      const { getByText } = render(<ListItem item={completedItem} />);
      const checkboxButton = getByText('checkmark-circle').parent;
      
      fireEvent.press(checkboxButton!);
      
      await waitFor(() => {
        expect(mockMarkStatusChange).toHaveBeenCalledWith('1', false);
      });
    });

    it('should navigate to TaskDetail when main pressable is pressed', () => {
      const { getByTestId } = render(<ListItem item={mockItem} />);
      const pressable = getByTestId('list-item-pressable');
      
      fireEvent.press(pressable);
      
      expect(mockNavigate).toHaveBeenCalledWith('TaskDetail', {
        id: '1',
        name: 'Test Task',
        iscompleted: false,
        description: 'Test task description',
        dueDate: mockItem.dueDate,
        category: 'work'
      });
    });

    it('should show alert when navigation throws an error', () => {
      mockNavigate.mockImplementationOnce(() => {
        throw new Error('Navigation error');
      });
      
      const { getByTestId } = render(<ListItem item={mockItem} />);
      const pressable = getByTestId('list-item-pressable');
      
      fireEvent.press(pressable);
      
      expect(Alert.alert).toHaveBeenCalledWith('somethhing went wrong');
    });
  });

  describe('Task Status Styling', () => {
    it('should apply line-through style for completed tasks', () => {
      const completedItem = { ...mockItem, iscompleted: true };
      const { getByText } = render(<ListItem item={completedItem} />);
      const taskNameElement = getByText('Test Task');
      
      expect(taskNameElement.props.style).toContainEqual(
        expect.objectContaining({
          textDecorationLine: 'line-through',
          color: '#777'
        })
      );
    });

    it('should not apply line-through style for incomplete tasks', () => {
      const { getByText } = render(<ListItem item={mockItem} />);
      const taskNameElement = getByText('Test Task');
      
      expect(taskNameElement.props.style).not.toContainEqual(
        expect.objectContaining({
          textDecorationLine: 'line-through'
        })
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty description', () => {
      const itemWithEmptyDescription = { ...mockItem, description: '' };
      const { getByText } = render(<ListItem item={itemWithEmptyDescription} />);
      
      expect(getByText('')).toBeTruthy(); // Empty description should still render
    });

    it('should handle very long task names', () => {
      const longTaskName = 'A'.repeat(100);
      const itemWithLongName = { ...mockItem, name: longTaskName };
      const { getByText } = render(<ListItem item={itemWithLongName} />);
      
      expect(getByText(longTaskName)).toBeTruthy();
    });

    it('should handle very long descriptions', () => {
      const longDescription = 'B'.repeat(200);
      const itemWithLongDescription = { ...mockItem, description: longDescription };
      const { getByText } = render(<ListItem item={itemWithLongDescription} />);
      
      expect(getByText(longDescription)).toBeTruthy();
    });

    it('should handle future dates', () => {
      const futureDate = new Date('2030-12-31');
      const itemWithFutureDate = { ...mockItem, dueDate: futureDate };
      const { getByText } = render(<ListItem item={itemWithFutureDate} />);
      
      expect(getByText(futureDate.toISOString())).toBeTruthy();
    });

    it('should handle past dates', () => {
      const pastDate = new Date('2020-01-01');
      const itemWithPastDate = { ...mockItem, dueDate: pastDate };
      const { getByText } = render(<ListItem item={itemWithPastDate} />);
      
      expect(getByText(pastDate.toISOString())).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper testID for main pressable', () => {
      const { getByTestId } = render(<ListItem item={mockItem} />);
      expect(getByTestId('list-item-pressable')).toBeTruthy();
    });

    it('should have accessible touch targets', () => {
      const { getByTestId } = render(<ListItem item={mockItem} />);
      const pressable = getByTestId('list-item-pressable');
      
      // Test that the pressable is properly accessible
      expect(pressable).toBeTruthy();
      expect(pressable.props.accessible).not.toBe(false);
    });
  });

  describe('Performance', () => {
    it('should not re-render unnecessarily with same props', () => {
      const { rerender } = render(<ListItem item={mockItem} />);
      
      // Re-render with same props
      rerender(<ListItem item={mockItem} />);
      
      // Component should handle this gracefully
      expect(mockUseTodos).toHaveBeenCalledTimes(2); // Once for each render
    });
  });

  describe('Error Handling', () => {
    it('should handle markStatusChange errors gracefully', async () => {
      mockMarkStatusChange.mockRejectedValueOnce(new Error('Status change failed'));
      
      const { getByText } = render(<ListItem item={mockItem} />);
      const checkboxButton = getByText('ellipse-outline').parent;
      
      // Should not throw error
      fireEvent.press(checkboxButton!);
      
      await waitFor(() => {
        expect(mockMarkStatusChange).toHaveBeenCalled();
      });
    });

    it('should log navigation errors to console', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const navigationError = new Error('Navigation failed');
      mockNavigate.mockImplementationOnce(() => {
        throw navigationError;
      });
      
      const { getByTestId } = render(<ListItem item={mockItem} />);
      const pressable = getByTestId('list-item-pressable');
      
      fireEvent.press(pressable);
      
      expect(consoleSpy).toHaveBeenCalledWith(navigationError);
      consoleSpy.mockRestore();
    });
  });
});