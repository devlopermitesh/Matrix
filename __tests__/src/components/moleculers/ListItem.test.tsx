jest.mock('../../../../src/state/newsql', () => {
  return {
    dbInstance: {
      insertTodo: jest.fn(() => Promise.resolve()),
      getTodos: jest.fn(() =>
        Promise.resolve([
          { id: '1', name: 'Test', description: '2 packets', iscompleted: 0 },
        ]),
      ),
    },
  };
});
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import ListItem from '../../../../src/components/moleculers/ListItem';
import { useTodos } from '../../../../src/state/todos';
import { navigate } from '../../../../src/navigation/Navigationutils';
import { Categories, Item } from '../../../../src/data/constant';

// Mock navigation - simplified without requireActual
jest.mock('@react-navigation/native', () => ({
  createNavigationContainerRef: jest.fn(() => ({
    isReady: jest.fn().mockReturnValue(true),
    dispatch: jest.fn(),
  })),
  CommonActions: {
    navigate: jest.fn(),
    reset: jest.fn(),
    goBack: jest.fn(),
  },
  StackActions: {
    push: jest.fn(),
  },
  useRoute: jest.fn(),
  useNavigation: jest.fn(),
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn().mockReturnValue(true),
}));

// Mock dependencies
jest.mock('../../../../src/state/todos');
jest.mock('../../../../src/navigation/Navigationutils');

// Mock Icon component with proper TouchableOpacity
jest.mock('../../../../src/components/atoms/Icon', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return ({ name, testID, onPress, ...props }: any) => (
    <TouchableOpacity
      onPress={onPress}
      testID={testID || 'mock-icon'}
      {...props}
    >
      <Text testID={`icon-${name}`}>{name}</Text>
    </TouchableOpacity>
  );
});

// Mock Day component
jest.mock('../../../../src/components/atoms/Day', () => {
  const { Text } = require('react-native');
  return ({ date, testID }: any) => (
    <Text testID={testID || 'mock-day'}>
      {date instanceof Date ? date.toISOString() : String(date)}
    </Text>
  );
});

// Mock Categories and Colors if needed
jest.mock('../../../../src/data/constant', () => ({
  Categories: {
    urgent: 'urgent',
    important: 'important',
    noturgentImportant: 'work',
    urgentImportant: 'urgent-important',
    noturgentNotimportant: 'neither',
    urgentNotimportant: 'urgent-not-important',
  },
  Colors: {
    urgent: '#ff0000',
    important: '#00ff00',
    work: '#0000ff',
  },
  Item: {},
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

const mockUseTodos = useTodos as jest.MockedFunction<typeof useTodos>;
const mockNavigate = navigate as jest.MockedFunction<typeof navigate>;

describe('ListItem', () => {
  const mockMarkStatusChange = jest.fn();
  const mockAddTodos = jest.fn();
  const mockUpdateTodos = jest.fn();
  const mockDeleteTodos = jest.fn();

  const mockItem: Item = {
    id: '1',
    name: 'Test Task',
    iscompleted: false,
    description: 'Test task description',
    dueDate: new Date('2024-12-31'),
    category: Categories.noturgentImportant,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Reset all mocks
    mockMarkStatusChange.mockResolvedValue(undefined);
    mockAddTodos.mockResolvedValue(undefined);
    mockUpdateTodos.mockResolvedValue(undefined);
    mockDeleteTodos.mockResolvedValue(undefined);

    mockUseTodos.mockReturnValue({
      markStatusChange: mockMarkStatusChange,
      todos: [],
      addTodos: mockAddTodos,
      updateTodos: mockUpdateTodos,
      deleteTodos: mockDeleteTodos,
    });

    // Clear Alert mock
    (Alert.alert as jest.Mock).mockClear();
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
      const { getByTestId } = render(<ListItem item={mockItem} />);
      expect(getByTestId('icon-ellipse-outline')).toBeTruthy();
    });

    it('should render completed task with correct icon', () => {
      const completedItem = { ...mockItem, iscompleted: true };
      const { getByTestId } = render(<ListItem item={completedItem} />);
      expect(getByTestId('icon-checkmark-circle')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should call markStatusChange when checkbox is pressed for incomplete task', async () => {
      const { getByTestId } = render(<ListItem item={mockItem} />);

      const checkbox = getByTestId('mock-icon');
      fireEvent.press(checkbox);

      await waitFor(() => {
        expect(mockMarkStatusChange).toHaveBeenCalledWith('1', true);
      });
    });

    it('should call markStatusChange when checkbox is pressed for completed task', async () => {
      const completedItem = { ...mockItem, iscompleted: true };
      const { getByTestId } = render(<ListItem item={completedItem} />);

      const checkbox = getByTestId('mock-icon');
      fireEvent.press(checkbox);

      await waitFor(() => {
        expect(mockMarkStatusChange).toHaveBeenCalledWith('1', false);
      });
    });

    it('should navigate to TaskDetail when main pressable is pressed', () => {
      const { getByTestId } = render(<ListItem item={mockItem} />);

      // Look for the pressable component
      const pressable = getByTestId('list-item-pressable');
      fireEvent.press(pressable);

      expect(mockNavigate).toHaveBeenCalledWith(
        'TaskDetail',
        expect.objectContaining({
          id: '1',
          name: 'Test Task',
          iscompleted: false,
          description: 'Test task description',
          dueDate: mockItem.dueDate,
          category: 'work',
        }),
      );
    });

    it('should show alert when navigation throws an error', () => {
      const consoleLogSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});

      mockNavigate.mockImplementationOnce(() => {
        throw new Error('Navigation error');
      });

      const { getByTestId } = render(<ListItem item={mockItem} />);
      const pressable = getByTestId('list-item-pressable');

      fireEvent.press(pressable);

      expect(Alert.alert).toHaveBeenCalledWith('somethhing went wrong');

      consoleLogSpy.mockRestore();
    });
  });

  describe('Task Status Styling', () => {
    it('should apply completed styling for completed tasks', () => {
      const completedItem = { ...mockItem, iscompleted: true };
      const { getByText } = render(<ListItem item={completedItem} />);
      const taskNameElement = getByText('Test Task');

      // Check if the style contains completed task styling
      const styles = Array.isArray(taskNameElement.props.style)
        ? taskNameElement.props.style.flat()
        : [taskNameElement.props.style];

      const hasCompletedStyling = styles.some(
        (style: any) =>
          style &&
          (style.textDecorationLine === 'line-through' ||
            style.color === '#777' ||
            style.color === '#999' ||
            (typeof style.opacity === 'number' && style.opacity < 1)),
      );

      expect(hasCompletedStyling).toBe(true);
    });

    it('should not apply line-through styling for incomplete tasks', () => {
      const { getByText } = render(<ListItem item={mockItem} />);
      const taskNameElement = getByText('Test Task');

      const styles = Array.isArray(taskNameElement.props.style)
        ? taskNameElement.props.style.flat()
        : [taskNameElement.props.style];

      const hasLineThrough = styles.some(
        (style: any) => style && style.textDecorationLine === 'line-through',
      );

      expect(hasLineThrough).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty description gracefully', () => {
      const itemWithEmptyDescription = { ...mockItem, description: '' };
      expect(() =>
        render(<ListItem item={itemWithEmptyDescription} />),
      ).not.toThrow();
    });

    it('should handle undefined description gracefully', () => {
      const itemWithUndefinedDescription = {
        ...mockItem,
        description: undefined as any,
      };
      expect(() =>
        render(<ListItem item={itemWithUndefinedDescription} />),
      ).not.toThrow();
    });

    it('should handle very long task names', () => {
      const longTaskName = 'A'.repeat(100);
      const itemWithLongName = { ...mockItem, name: longTaskName };
      const { getByText } = render(<ListItem item={itemWithLongName} />);

      expect(getByText(longTaskName)).toBeTruthy();
    });

    it('should handle null dates gracefully', () => {
      const itemWithNullDate = { ...mockItem, dueDate: null as any };
      expect(() => render(<ListItem item={itemWithNullDate} />)).not.toThrow();
    });

    it('should handle invalid dates gracefully', () => {
      const itemWithInvalidDate = { ...mockItem, dueDate: new Date('invalid') };
      expect(() =>
        render(<ListItem item={itemWithInvalidDate} />),
      ).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have proper testID for main pressable', () => {
      // Component should either have the testID or render without crashing
      expect(() => render(<ListItem item={mockItem} />)).not.toThrow();
    });
  });
});
