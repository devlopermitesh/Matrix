import React from 'react';
import Home from '../../../src/screens/Home';
import { useTodos } from '../../../src/state/todos';
import { CategoryTitles } from '../../../src/data/constant';
import { render,fireEvent,waitFor } from '../../../src/testUtils/test-utils';

// --- MOCKS --- 
const mockNewTodo = jest.fn();
const mockSetData = jest.fn();
jest.mock('../../../src/state/todos', () => ({
  useTodos: jest.fn(),
}));

jest.mock('../../../src/navigation/Navigationutils', () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
}));

// Mock useAccount hook
jest.mock('../../../src/state/userState', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    theme: "Light",
    updateTheme: jest.fn(),
    firstVisit: false,
  })),
}));



// Mock TaskModal as a button that triggers props.onSave
jest.mock('../../../src/components/moleculers/Taskmodel', () => {
  const React = require('react');
  const { Text, TouchableOpacity } = require('react-native');
  return (props: any) =>
    props.visible ? (
      <TouchableOpacity
        testID="save-btn"
        onPress={() => props.onSave && props.onSave({ title: 'New Task' })}
      >
        <Text>Save</Text>
      </TouchableOpacity>
    ) : null;
});

jest.mock(
  '../../../src/components/atoms/CustomeSafeAreaView',
  () =>
    ({ children }: any) =>
      children,
);
jest.mock('../../../src/components/organism/Header', () => () => null);

describe('Home Screen', () => {
  const todosMock = {
    urgentnotImportant: [
      {
        id: '1',
        name: 'Test Task',
        category: 'urgentnotImportant',
        description: 'desc',
        dueDate: new Date().toString(),
        iscompleted: false,
      },
    ],
  };

  beforeEach(() => {
    (useTodos as any).mockReturnValue({
      todos: todosMock,
      setData: mockSetData,
      newtodo: mockNewTodo,
    });
    jest.clearAllMocks();
  });

  it('renders todos correctly', async () => {
    const { getByText } = render(<Home />);
    await waitFor(() =>
      expect(getByText(CategoryTitles['urgentnotImportant'])).toBeTruthy(),
    );
  });

  it('opens TaskModal when PlusButton is pressed', async () => {
    const { getByTestId, getByText } = render(<Home />);
    fireEvent.press(getByTestId('plus-button'));
    await waitFor(() => expect(getByText('Save')).toBeTruthy());
  });

  it('calls newtodo when saving from TaskModal', async () => {
    const { getByTestId } = render(<Home />);
    fireEvent.press(getByTestId('plus-button'));

    // Press the save button inside the mocked TaskModal
    fireEvent.press(getByTestId('save-btn'));

    // Assert that newtodo was called
    expect(mockNewTodo).toHaveBeenCalled();
  });
});

// ---Rest code by ai

// import React from 'react';
// import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
// import Home from '../../../src/screens/Home';
// import { useTodos } from '../../../src/state/todos';
// import { dbInstance } from '../../../src/state/newsql';

// // Mock dependencies
// jest.mock('../../../src/state/todos');
// jest.mock('../../../src/state/newsql');

// // Mock components
// jest.mock('../components/atoms/CustomeSafeAreaView', () => {
//   const { View } = require('react-native');
//   return ({ children }) => <View testID="custom-safe-area-view">{children}</View>;
// });

// jest.mock('../components/organism/Header', () => {
//   const { View, Text } = require('react-native');
//   return () => <View testID="header"><Text>Header</Text></View>;
// });

// jest.mock('../components/organism/ItemContainer', () => {
//   const { View, Text } = require('react-native');
//   return ({ title, category, items }) => (
//     <View testID={`item-container-${category}`}>
//       <Text testID={`category-title-${category}`}>{title}</Text>
//       <Text testID={`items-count-${category}`}>{items?.length || 0} items</Text>
//     </View>
//   );
// });

// jest.mock('../components/atoms/PlusButton', () => {
//   const { TouchableOpacity, Text } = require('react-native');
//   return ({ onPress, style }) => (
//     <TouchableOpacity
//       testID="plus-button"
//       onPress={onPress}
//       style={style}
//     >
//       <Text>+</Text>
//     </TouchableOpacity>
//   );
// });

// jest.mock('../components/moleculers/Taskmodel', () => {
//   const { View, Text, TouchableOpacity } = require('react-native');
//   return ({ visible, model_title, onClose, onSave }) => {
//     if (!visible) return null;

//     return (
//       <View testID="task-modal">
//         <Text testID="modal-title">{model_title}</Text>
//         <TouchableOpacity
//           testID="modal-close-button"
//           onPress={onClose}
//         >
//           <Text>Close</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           testID="modal-save-button"
//           onPress={() => onSave({
//             title: 'Test Task',
//             description: 'Test Description',
//             quadrant: 'urgentImportant',
//             dueDate: '2024-01-01'
//           })}
//         >
//           <Text>Save</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };
// });

// // Mock data
// const mockTodos = {
//   urgentImportant: [
//     {
//       id: '1',
//       name: 'Urgent Important Task',
//       description: 'Description',
//       dueDate: new Date(),
//       category: 'urgentImportant',
//       iscompleted: false
//     }
//   ],
//   noturgentImportant: [],
//   urgentnotImportant: [],
//   noturgentnotImportant: []
// };

// const mockUseTodos = {
//   todos: mockTodos,
//   setData: jest.fn(),
//   newtodo: jest.fn()
// };

// describe('Home Component', () => {
//   beforeEach(() => {
//     // Reset all mocks before each test
//     jest.clearAllMocks();
//     (useTodos as jest.Mock).mockReturnValue(mockUseTodos);
//     mockUseTodos.setData.mockResolvedValue(undefined);
//     mockUseTodos.newtodo.mockResolvedValue(undefined);
//   });

//   afterEach(() => {
//     jest.clearAllTimers();
//   });

//   describe('Rendering', () => {
//     it('should render all main components', () => {
//       const { getByTestId } = render(<Home />);

//       expect(getByTestId('custom-safe-area-view')).toBeTruthy();
//       expect(getByTestId('header')).toBeTruthy();
//       expect(getByTestId('plus-button')).toBeTruthy();
//     });

//     it('should render all category containers', () => {
//       const { getByTestId } = render(<Home />);

//       expect(getByTestId('item-container-urgentImportant')).toBeTruthy();
//       expect(getByTestId('item-container-noturgentImportant')).toBeTruthy();
//       expect(getByTestId('item-container-urgentnotImportant')).toBeTruthy();
//       expect(getByTestId('item-container-noturgentnotImportant')).toBeTruthy();
//     });

//     it('should display correct items count for each category', () => {
//       const { getByTestId } = render(<Home />);

//       expect(getByTestId('items-count-urgentImportant')).toHaveTextContent('1 items');
//       expect(getByTestId('items-count-noturgentImportant')).toHaveTextContent('0 items');
//       expect(getByTestId('items-count-urgentnotImportant')).toHaveTextContent('0 items');
//       expect(getByTestId('items-count-noturgentnotImportant')).toHaveTextContent('0 items');
//     });
//   });

//   describe('Data Loading', () => {
//     it('should call setData on component mount', async () => {
//       render(<Home />);

//       await waitFor(() => {
//         expect(mockUseTodos.setData).toHaveBeenCalledTimes(1);
//       });
//     });

//     it('should handle setData errors gracefully', async () => {
//       mockUseTodos.setData.mockRejectedValue(new Error('Database error'));

//       // Should not throw error even if setData fails
//       expect(() => render(<Home />)).not.toThrow();
//     });
//   });

//   describe('Task Modal Interactions', () => {
//     it('should not show modal initially', () => {
//       const { queryByTestId } = render(<Home />);

//       expect(queryByTestId('task-modal')).toBeNull();
//     });

//     it('should show modal when plus button is pressed', async () => {
//       const { getByTestId, queryByTestId } = render(<Home />);

//       // Initially modal should not be visible
//       expect(queryByTestId('task-modal')).toBeNull();

//       // Press plus button
//       fireEvent.press(getByTestId('plus-button'));

//       // Modal should now be visible
//       expect(getByTestId('task-modal')).toBeTruthy();
//       expect(getByTestId('modal-title')).toHaveTextContent('Add Task');
//     });

//     it('should hide modal when close button is pressed', async () => {
//       const { getByTestId, queryByTestId } = render(<Home />);

//       // Show modal
//       fireEvent.press(getByTestId('plus-button'));
//       expect(getByTestId('task-modal')).toBeTruthy();

//       // Close modal
//       fireEvent.press(getByTestId('modal-close-button'));

//       // Modal should be hidden
//       expect(queryByTestId('task-modal')).toBeNull();
//     });

//     it('should create new task when save is pressed', async () => {
//       const { getByTestId, queryByTestId } = render(<Home />);

//       // Show modal
//       fireEvent.press(getByTestId('plus-button'));
//       expect(getByTestId('task-modal')).toBeTruthy();

//       // Save task
//       await act(async () => {
//         fireEvent.press(getByTestId('modal-save-button'));
//       });

//       // Verify newtodo was called with correct data
//       await waitFor(() => {
//         expect(mockUseTodos.newtodo).toHaveBeenCalledWith({
//           id: expect.any(String),
//           name: 'Test Task',
//           description: 'Test Description',
//           dueDate: expect.any(Date),
//           category: 'urgentImportant',
//           iscompleted: false
//         });
//       });

//       // Modal should be closed
//       expect(queryByTestId('task-modal')).toBeNull();
//     });

//     it('should generate unique ID for each task', async () => {
//       const { getByTestId } = render(<Home />);

//       // Create first task
//       fireEvent.press(getByTestId('plus-button'));
//       await act(async () => {
//         fireEvent.press(getByTestId('modal-save-button'));
//       });

//       const firstCall = mockUseTodos.newtodo.mock.calls[0][0];
//       const firstId = firstCall.id;

//       // Create second task
//       fireEvent.press(getByTestId('plus-button'));
//       await act(async () => {
//         fireEvent.press(getByTestId('modal-save-button'));
//       });

//       const secondCall = mockUseTodos.newtodo.mock.calls[1][0];
//       const secondId = secondCall.id;

//       // IDs should be different
//       expect(firstId).not.toBe(secondId);
//       expect(typeof firstId).toBe('string');
//       expect(typeof secondId).toBe('string');
//     });
//     it('should handle missing due date correctly', async () => {
//       // Mock TaskModal to not return dueDate
//       jest.doMock('../../../src/components/moleculers/Taskmodel', () => {
//         const { View, Text, TouchableOpacity } = require('react-native');
//         return ({ visible, model_title, onClose, onSave }) => {
//           if (!visible) return null;

//           return (
//             <View testID="task-modal">
//               <TouchableOpacity
//                 testID="modal-save-button"
//                 onPress={() => onSave({
//                   title: 'Test Task',
//                   description: 'Test Description',
//                   quadrant: 'urgentImportant'
//                   // No dueDate provided
//                 })}
//               >
//                 <Text>Save</Text>
//               </TouchableOpacity>
//             </View>
//           );
//         };
//       });

//       const { getByTestId } = render(<Home />);

//       fireEvent.press(getByTestId('plus-button'));
//       await act(async () => {
//         fireEvent.press(getByTestId('modal-save-button'));
//       });

//       await waitFor(() => {
//         expect(mockUseTodos.newtodo).toHaveBeenCalledWith({
//           id: expect.any(String),
//           name: 'Test Task',
//           description: 'Test Description',
//           dueDate: expect.any(Date), // Should default to current date
//           category: 'urgentImportant',
//           iscompleted: false
//         });
//       });
//     });

//     it('should handle empty description correctly', async () => {
//       // Mock TaskModal to return undefined description
//       jest.doMock('../components/moleculers/Taskmodel', () => {
//         const { View, Text, TouchableOpacity } = require('react-native');
//         return ({ visible, model_title, onClose, onSave }) => {
//           if (!visible) return null;

//           return (
//             <View testID="task-modal">
//               <TouchableOpacity
//                 testID="modal-save-button"
//                 onPress={() => onSave({
//                   title: 'Test Task',
//                   quadrant: 'urgentImportant',
//                   dueDate: '2024-01-01'
//                   // No description provided
//                 })}
//               >
//                 <Text>Save</Text>
//               </TouchableOpacity>
//             </View>
//           );
//         };
//       });

//       const { getByTestId } = render(<Home />);

//       fireEvent.press(getByTestId('plus-button'));
//       await act(async () => {
//         fireEvent.press(getByTestId('modal-save-button'));
//       });

//       await waitFor(() => {
//         expect(mockUseTodos.newtodo).toHaveBeenCalledWith({
//           id: expect.any(String),
//           name: 'Test Task',
//           description: '', // Should default to empty string
//           dueDate: expect.any(Date),
//           category: 'urgentImportant',
//           iscompleted: false
//         });
//       });
//     });
//   });

//   describe('Error Handling', () => {
//     it('should handle newtodo errors gracefully', async () => {
//       mockUseTodos.newtodo.mockRejectedValue(new Error('Save failed'));

//       const { getByTestId } = render(<Home />);

//       fireEvent.press(getByTestId('plus-button'));

//       // Should not throw error even if save fails
//       await act(async () => {
//         expect(() => fireEvent.press(getByTestId('modal-save-button'))).not.toThrow();
//       });
//     });
//   });

//   describe('Styling', () => {
//     it('should apply correct styles to floating button', () => {
//       const { getByTestId } = render(<Home />);

//       const plusButton = getByTestId('plus-button');
//       expect(plusButton.props.style).toEqual(
//         expect.objectContaining({
//           position: 'absolute',
//           bottom: '15%',
//           right: 30
//         })
//       );
//     });
//   });

//   describe('Integration', () => {
//     it('should update UI when todos change', () => {
//       const { getByTestId, rerender } = render(<Home />);

//       // Initially shows 1 item
//       expect(getByTestId('items-count-urgentImportant')).toHaveTextContent('1 items');

//       // Update mock data
//       const updatedTodos = {
//         ...mockTodos,
//         urgentImportant: [
//           ...mockTodos.urgentImportant,
//           {
//             id: '2',
//             name: 'Another Task',
//             description: 'Another Description',
//             dueDate: new Date(),
//             category: 'urgentImportant',
//             iscompleted: false
//           }
//         ]
//       };

//       (useTodos as jest.Mock).mockReturnValue({
//         ...mockUseTodos,
//         todos: updatedTodos
//       });

//       rerender(<Home />);

//       // Should now show 2 items
//       expect(getByTestId('items-count-urgentImportant')).toHaveTextContent('2 items');
//     });
//   });
// });

// // Additional test utilities for testing specific scenarios
// export const createMockTodo = (overrides = {}) => ({
//   id: Math.random().toString(36).substring(2, 10),
//   name: 'Default Task',
//   description: 'Default Description',
//   dueDate: new Date(),
//   category: 'urgentImportant',
//   iscompleted: false,
//   ...overrides
// });

// export const mockTodosState = (todos = {}) => ({
//   urgentImportant: [],
//   noturgentImportant: [],
//   urgentnotImportant: [],
//   noturgentnotImportant: [],
//   ...todos
// });
