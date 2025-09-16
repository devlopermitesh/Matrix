import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TaskDetail from '../../../src/screens/TaskDetails';
import { useTodos } from '../../../src/state/todos';
import { navigate } from '../../../src/navigation/Navigationutils';
import { Categories } from '../../../src/data/constant';
jest.mock("../../../src/state/newsql", () => {
  return {
    dbInstance: {
      insertTodo: jest.fn(() => Promise.resolve()),
      getTodos: jest.fn(() =>
        Promise.resolve([{ id: "1", name: "Test", description: "2 packets", iscompleted: 0 }])
      ),
    },
  };
});

// Mock modules
jest.mock('../../../src/state/todos');
jest.mock('../../../src/navigation/Navigationutils', () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
}));
jest.mock('../../../src/components/moleculers/Taskmodel', () => (props: any) => {
  const { Text } = require('react-native');
  return props.visible ? <Text>TaskModal</Text> : null;
});
jest.mock('../../../src/components/atoms/Icon', () => () => <></>);
jest.mock('../../../src/components/atoms/CustomeSafeAreaView', () => ({ children }: any) => children);
// Mock dependencies

describe('TaskDetail Screen', () => {
  const mockMarkStatusChange = jest.fn();
  const mockDeleteTodo = jest.fn();
  const mockUpdateTodos = jest.fn();

  const task = {
    id: '1',
    name: 'Test Task',
    description: 'Description here',
    dueDate: new Date().toString(),
    category: Categories.urgentImportant,
    iscompleted: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useTodos as any).mockReturnValue({
      markStatusChange: mockMarkStatusChange,
      deleteTodo: mockDeleteTodo,
      updateTodos: mockUpdateTodos,
    });
  });

  it('renders task details', () => {
    const { getByText } = render(<TaskDetail route={{ params: task } as any} />);
    expect(getByText(task.name)).toBeTruthy();
    expect(getByText(task.description)).toBeTruthy();
  });

  it('opens TaskModal on Edit press', () => {
    const { getByText } = render(<TaskDetail route={{ params: task } as any} />);
    fireEvent.press(getByText('Edit'));
    expect(getByText('TaskModal')).toBeTruthy();
  });

  it('marks task complete', async () => {
    const { getByText } = render(<TaskDetail route={{ params: task } as any} />);
    const completeBtn = getByText('Mark Complete');
    fireEvent.press(completeBtn);
    await waitFor(() => expect(mockMarkStatusChange).toHaveBeenCalledWith(task.id, true));
    expect(getByText('Completed')).toBeTruthy();
  });

  it('deletes task', async () => {
    const { getByText } = render(<TaskDetail route={{ params: task } as any} />);
    const deleteBtn = getByText('Delete Task');
    fireEvent.press(deleteBtn);
    await waitFor(() => expect(mockDeleteTodo).toHaveBeenCalledWith(task.id));
    expect(navigate).toHaveBeenCalledWith('Home');
  });
});
