import { fireEvent, render, waitFor } from "@testing-library/react-native"
import TaskModal from "../../../../src/components/moleculers/Taskmodel"
import { Categories, Item } from "../../../../src/data/constant"
import { StyleSheet } from "react-native"


jest.mock("react-native-calendars",()=>{
  return {
    Calendar:({ onDayPress, markedDates }: any) =>{
       const { View, TouchableOpacity, Text } = require('react-native');
    return (
      <View testID="calendar">
        <TouchableOpacity
          testID="calendar-day-2024-01-15"
          onPress={() => onDayPress({ dateString: '2024-01-15' })}
        >
          <Text>15</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="calendar-day-2024-01-20"
          onPress={() => onDayPress({ dateString: '2024-01-20' })}
        >
          <Text>20</Text>
        </TouchableOpacity>
      </View>
    );
    }
  }
})



describe("Taskmodel",()=>{
  const mockSave=jest.fn(()=>{})
  const mockClose=jest.fn(()=>{})
  const defaultParams={
    visible:true,
    model_title:"Create a new Task",
    onClose:mockClose,
    predata:undefined,
    onSave:mockSave
  }
  describe("Rendering",()=>{
    it("should render modal when visible is true",()=>{
      const {getByText,getByPlaceholderText}=render(<TaskModal {...defaultParams}/>)
      expect(getByText("Create a new Task")).toBeTruthy()
      expect(getByPlaceholderText('e.g., Design new onboarding flow')).toBeTruthy();
      expect(getByText('Task Title')).toBeTruthy();
      expect(getByText('Description (optional)')).toBeTruthy();
      expect(getByText('Quadrant')).toBeTruthy();
      expect(getByText('Due Date (optional)')).toBeTruthy();
    })
    it("should not render modal when visible is false",()=>{
      const {queryByText}=render(<TaskModal {...defaultParams}  visible={false}/>)
      expect(queryByText("Create a new Task")).toBeFalsy()
    })
    it("Should render predata when provided",()=>{
      const predata: Item = {
      id: "1",
      name: "Test Task",
      description: "This is a preloaded task",
      dueDate: new Date("2025-09-20"),
      category: Categories.noturgentImportant,
      iscompleted: false,
    };

    const { getByDisplayValue, getByText } = render(
      <TaskModal {...defaultParams} predata={predata} />
    );

    // ✅ Check if task name is pre-filled
    expect(getByDisplayValue("Test Task")).toBeTruthy();

    // ✅ Check if description is pre-filled
    expect(getByDisplayValue("This is a preloaded task")).toBeTruthy();

    // ✅ Check if due date is displayed
    expect(getByText(predata.dueDate.toString())).toBeTruthy();

    })
    it("Should render all the Quadrant options",()=>{
      const {getByText}=render(<TaskModal {...defaultParams} />)
      expect(getByText('urgent & Important')).toBeTruthy();
      expect(getByText('not Urgent & Important')).toBeTruthy();
      expect(getByText('Urgent & not Important')).toBeTruthy();
      expect(getByText('not Urgent & not Important')).toBeTruthy();
    })

  })

  describe("Form interacations",()=>{
 it('should handle title input changes', ()=>{
  const {getByPlaceholderText,getByDisplayValue}=render(<TaskModal {...defaultParams}/>)
  const textinput=getByPlaceholderText("e.g., Design new onboarding flow")
  fireEvent.changeText(textinput, "new value")
  expect(getByDisplayValue("new value")).toBeTruthy();
 })
  })
    it('should handle description input changes', () => {
      const {getByPlaceholderText}=render(<TaskModal {...defaultParams} />);
      
      const descriptionInput =getByPlaceholderText('Add more details about the task...');
      fireEvent.changeText(descriptionInput, 'New task description');
      
      expect(descriptionInput).toBeTruthy();
    });
    it('should handle quadrant selection', () => {
      const {getByText}=render(<TaskModal {...defaultParams} />);
      
      const quadrantButton = getByText('not Urgent & Important');
      fireEvent.press(quadrantButton);
      
      expect(quadrantButton).toBeTruthy();
    });
 it('should open calendar when date input is pressed', async () => {
      const {getByText,getByTestId}=render(<TaskModal {...defaultParams} />);
      
      const dateInput = getByText('Select due date');
      fireEvent.press(dateInput);
      
      await waitFor(() => {
        expect(getByTestId('calendar')).toBeTruthy();
      });
    });
it('should select date and close calendar', async () => {
      const {getByText,getByTestId,queryByTestId}=render(<TaskModal {...defaultParams} />);
      
      // Open calendar
      const dateInput = getByText('Select due date');
      fireEvent.press(dateInput);
      
      await waitFor(() => {
        const calendarDay =getByTestId('calendar-day-2024-01-15');
        fireEvent.press(calendarDay);
      });
      //Calendar should close after date selection
      await waitFor(() => {
        expect(queryByTestId('calendar')).toBeFalsy();
      });
})

describe("Form submission",()=>{
it('should call onSave with form data when save button is pressed', async () => {
  const { getByPlaceholderText, getByText } = render(<TaskModal {...defaultParams} />);

  // fill required field (title)
  const titleInput = getByPlaceholderText('e.g., Design new onboarding flow');
  fireEvent.changeText(titleInput, 'Valid Title');

  // wait for validation to update isValid
  await waitFor(() => {
    expect(titleInput.props.value).toBe('Valid Title');
  });

  const saveButton = getByText('Save Task');
  fireEvent.press(saveButton);

  await waitFor(() => {
    expect(mockSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Valid Title',
        description: '', // default empty
        quadrant: 0,
        dueDate: "",
      })
    );
  });
});

it("should onClose on click after Close button",async()=>{
  const {getByText}=render(<TaskModal  {...defaultParams} />)
  const button=getByText("Cancel")
  fireEvent.press(button)
  await waitFor(()=>{
  expect(mockClose).toHaveBeenCalled()
  })
})
  it('should close calendar when background is pressed', async () => {
      const {getByText,getByTestId}=render(<TaskModal {...defaultParams} />);
      
      // Open calendar
      const dateInput = getByText('Select due date');
      fireEvent.press(dateInput);
      
      await waitFor(() => {
        const calendarBackground = getByTestId('calendarbackground');
        if (calendarBackground) {
          fireEvent.press(calendarBackground);
        }
      });
    });
})

 describe('Accessibility', () => {
    it('should have proper accessibility labels', () => {
     const {getByText}= render(<TaskModal {...defaultParams} />);
      
      expect(getByText('Task Title')).toBeTruthy();
      expect(getByText('Description (optional)')).toBeTruthy();
      expect(getByText('Quadrant')).toBeTruthy();
      expect(getByText('Due Date (optional)')).toBeTruthy();
    });
  });
  
  describe('Categories State Management', () => {
    it('should update active category when quadrant is selected', async() => {
      const {getByText,getByTestId}=render(<TaskModal {...defaultParams} />);
      
      const urgentImportantButton =  getByTestId(`quadrant-${Categories.urgentImportant}`);
    const notUrgentImportantButton = getByTestId(`quadrant-${Categories.noturgentImportant}`);
      // Initially urgent & Important should be active (default)
      expect(urgentImportantButton).toBeTruthy();
      
      // Click on different quadrant
      await waitFor(()=>{
      fireEvent.press(notUrgentImportantButton);
      })
      
      // The state should update (though visual verification depends on styling)
      expect(notUrgentImportantButton).toBeTruthy();
      const style = StyleSheet.flatten(notUrgentImportantButton.props.style);
     // Sirf color check karo (baaki ignore ho jaye)
     expect(style.backgroundColor).toBe("#4A90E2");
    });
  });
  describe('Edge Cases', () => {
    it('should handle undefined predata gracefully', () => {
      const {getByText}=render(<TaskModal {...defaultParams} predata={undefined} />);
      
      expect(getByText('Create a new Task')).toBeTruthy();
    });

    it('should handle keyboard dismiss', () => {
      const {getByText}=render(<TaskModal {...defaultParams} />);
      
      const modalContainer = getByText('Create a new Task').parent;
      if (modalContainer) {
        fireEvent.press(modalContainer);
      }
      
      // This test verifies that the keyboard dismiss functionality doesn't crash
      expect(getByText('Create a new Task')).toBeTruthy();
    });
  });
})























// import React from 'react';
// import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
// import { Alert } from 'react-native';
// import TaskModal,{Item} from '../../../../src/components/moleculers/Taskmodel';
// import { Categories } from '../../../../src/data/constant';
// // Mock dependencies
// jest.mock('../../../../src/components/atoms/Icon', () => {
//   const { Text } = require('react-native');
//   return ({ name, iconType, size, color }: any) => (
//     <Text testID={`icon-${name}`}>Icon</Text>
//   );
// });

// jest.mock('react-native-calendars', () => ({
//   Calendar: ({ onDayPress, markedDates }: any) => {
//     const { View, TouchableOpacity, Text } = require('react-native');
//     return (
//       <View testID="calendar">
//         <TouchableOpacity
//           testID="calendar-day-2024-01-15"
//           onPress={() => onDayPress({ dateString: '2024-01-15' })}
//         >
//           <Text>15</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           testID="calendar-day-2024-01-20"
//           onPress={() => onDayPress({ dateString: '2024-01-20' })}
//         >
//           <Text>20</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   },
// }));

// // Mock react-hook-form
// jest.mock('react-hook-form', () => jest.fn(()=>({
//   useForm: () => ({
//     control: {},

//     handleSubmit: (fn: Function) => fn,
//     reset: jest.fn(),
//     formState: { errors: {}, isValid: true },
//   }),
//   Controller: ({ render, name }: any) => {
//     const { useState } = require('react');
//     const [value, setValue] = useState('');
//     return render({
//       field: {
//         onChange: setValue,
//         onBlur: jest.fn(),
//         value: value,
//       },
//     });
//   },
// })));

// describe('TaskModal', () => {
//   const mockOnClose = jest.fn();
//   const mockOnSave = jest.fn();
  
//   const defaultProps = {
//     visible: true,
//     model_title: 'Create New Task',
//     onClose: mockOnClose,
//     onSave: mockOnSave,
//   };

//   const samplePredata: Item = {
//     id: '1',
//     name: 'Sample Task',
//     description: 'Sample Description',
//     dueDate: new Date('2024-01-15'),
//     category: Categories.urgentImportant,
//     iscompleted: false,
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('Rendering', () => {
//     it('should render modal when visible is true', () => {
//       render(<TaskModal {...defaultProps} />);
      
//       expect(screen.getByText('Create New Task')).toBeTruthy();
//       expect(screen.getByPlaceholderText('e.g., Design new onboarding flow')).toBeTruthy();
//       expect(screen.getByText('Task Title')).toBeTruthy();
//       expect(screen.getByText('Description (optional)')).toBeTruthy();
//       expect(screen.getByText('Quadrant')).toBeTruthy();
//       expect(screen.getByText('Due Date (optional)')).toBeTruthy();
//     });

//     it('should not render modal content when visible is false', () => {
//       render(<TaskModal {...defaultProps} visible={false} />);
      
//       expect(screen.queryByText('Create New Task')).toBeFalsy();
//     });

//     it('should render with predata when provided', () => {
//       render(<TaskModal {...defaultProps} predata={samplePredata} />);
      
//       // Note: This test assumes the form is populated with predata
//       // The actual implementation might need adjustment based on how defaultValues work
//       expect(screen.getByText('Create New Task')).toBeTruthy();
//     });

//     it('should render all quadrant options', () => {
//       render(<TaskModal {...defaultProps} />);
      
//       expect(screen.getByText('urgent & Important')).toBeTruthy();
//       expect(screen.getByText('not Urgent & Important')).toBeTruthy();
//       expect(screen.getByText('Urgent & not Important')).toBeTruthy();
//       expect(screen.getByText('not Urgent & not Important')).toBeTruthy();
//     });
//   });

//   describe('Form Interactions', () => {
//     it('should handle title input changes', () => {
//       render(<TaskModal {...defaultProps} />);
      
//       const titleInput = screen.getByPlaceholderText('e.g., Design new onboarding flow');
//       fireEvent.changeText(titleInput, 'New Task Title');
      
//       expect(titleInput).toBeTruthy();
//     });

//     it('should handle description input changes', () => {
//       render(<TaskModal {...defaultProps} />);
      
//       const descriptionInput = screen.getByPlaceholderText('Add more details about the task...');
//       fireEvent.changeText(descriptionInput, 'New task description');
      
//       expect(descriptionInput).toBeTruthy();
//     });

//     it('should handle quadrant selection', () => {
//       render(<TaskModal {...defaultProps} />);
      
//       const quadrantButton = screen.getByText('not Urgent & Important');
//       fireEvent.press(quadrantButton);
      
//       expect(quadrantButton).toBeTruthy();
//     });

//     it('should open calendar when date input is pressed', async () => {
//       render(<TaskModal {...defaultProps} />);
      
//       const dateInput = screen.getByText('Select due date');
//       fireEvent.press(dateInput);
      
//       await waitFor(() => {
//         expect(screen.getByTestId('calendar')).toBeTruthy();
//       });
//     });

//     it('should select date and close calendar', async () => {
//       render(<TaskModal {...defaultProps} />);
      
//       // Open calendar
//       const dateInput = screen.getByText('Select due date');
//       fireEvent.press(dateInput);
      
//       await waitFor(() => {
//         const calendarDay = screen.getByTestId('calendar-day-2024-01-15');
//         fireEvent.press(calendarDay);
//       });
      
//       // Calendar should close after date selection
//       await waitFor(() => {
//         expect(screen.queryByTestId('calendar')).toBeFalsy();
//       });
//     });
//   });

//   describe('Form Submission', () => {
//     it('should call onSave with form data when save button is pressed', async () => {
//       render(<TaskModal {...defaultProps} />);
      
//       const saveButton = screen.getByText('Save Task');
//       fireEvent.press(saveButton);
      
//       expect(mockOnSave).toHaveBeenCalled();
//     });

//     it('should call onClose after successful save', async () => {
//       render(<TaskModal {...defaultProps} />);
      
//       const saveButton = screen.getByText('Save Task');
//       fireEvent.press(saveButton);
      
//       await waitFor(() => {
//         expect(mockOnClose).toHaveBeenCalled();
//       });
//     });
//   });

//   describe('Modal Actions', () => {
//     it('should close modal when close button is pressed', () => {
//       render(<TaskModal {...defaultProps} />);
      
//       const closeButton = screen.getByTestId('close-button') || screen.getByText('×');
//       fireEvent.press(closeButton);
      
//       expect(mockOnClose).toHaveBeenCalled();
//     });

//     it('should close modal when cancel button is pressed', () => {
//       render(<TaskModal {...defaultProps} />);
      
//       const cancelButton = screen.getByText('Cancel');
//       fireEvent.press(cancelButton);
      
//       expect(mockOnClose).toHaveBeenCalled();
//     });

//     it('should close calendar when background is pressed', async () => {
//       render(<TaskModal {...defaultProps} />);
      
//       // Open calendar
//       const dateInput = screen.getByText('Select due date');
//       fireEvent.press(dateInput);
      
//       await waitFor(() => {
//         const calendarBackground = screen.getByTestId('calendar').parent;
//         if (calendarBackground) {
//           fireEvent.press(calendarBackground);
//         }
//       });
//     });
//   });

//   describe('Form Validation', () => {
//     it('should show error message for empty title', async () => {
//       // Mock form with validation errors
//       const mockUseForm = require('react-hook-form').useForm;
//       mockUseForm.mockReturnValueOnce({
//         control: {},
//         handleSubmit: jest.fn(),
//         reset: jest.fn(),
//         formState: { 
//           errors: { 
//             title: { message: 'Task title is required' } 
//           }, 
//           isValid: false 
//         },
//       });

//       render(<TaskModal {...defaultProps} />);
      
//       expect(screen.getByText('Task title is required')).toBeTruthy();
//     });

//     it('should show error message for short title', async () => {
//       const mockUseForm = require('react-hook-form').useForm;
//       mockUseForm.mockReturnValueOnce({
//         control: {},
//         handleSubmit: jest.fn(),
//         reset: jest.fn(),
//         formState: { 
//           errors: { 
//             title: { message: 'Title must be at least 3 characters' } 
//           }, 
//           isValid: false 
//         },
//       });

//       render(<TaskModal {...defaultProps} />);
      
//       expect(screen.getByText('Title must be at least 3 characters')).toBeTruthy();
//     });

//     it('should disable save button when form is invalid', () => {
//       const mockUseForm = require('react-hook-form').useForm;
//       mockUseForm.mockReturnValueOnce({
//         control: {},
//         handleSubmit: jest.fn(),
//         reset: jest.fn(),
//         formState: { 
//           errors: { title: { message: 'Task title is required' } }, 
//           isValid: false 
//         },
//       });

//       render(<TaskModal {...defaultProps} />);
      
//       const saveButton = screen.getByText('Save Task');
//       expect(saveButton).toBeTruthy();
//       // Note: You might need to check for disabled styling or testID
//     });
//   });

//   describe('Categories State Management', () => {
//     it('should update active category when quadrant is selected', () => {
//       render(<TaskModal {...defaultProps} />);
      
//       const urgentImportantButton = screen.getByText('urgent & Important');
//       const notUrgentImportantButton = screen.getByText('not Urgent & Important');
      
//       // Initially urgent & Important should be active (default)
//       expect(urgentImportantButton).toBeTruthy();
      
//       // Click on different quadrant
//       fireEvent.press(notUrgentImportantButton);
      
//       // The state should update (though visual verification depends on styling)
//       expect(notUrgentImportantButton).toBeTruthy();
//     });
//   });

//   describe('Accessibility', () => {
//     it('should have proper accessibility labels', () => {
//       render(<TaskModal {...defaultProps} />);
      
//       expect(screen.getByText('Task Title')).toBeTruthy();
//       expect(screen.getByText('Description (optional)')).toBeTruthy();
//       expect(screen.getByText('Quadrant')).toBeTruthy();
//       expect(screen.getByText('Due Date (optional)')).toBeTruthy();
//     });
//   });

//   describe('Edge Cases', () => {
//     it('should handle undefined predata gracefully', () => {
//       render(<TaskModal {...defaultProps} predata={undefined} />);
      
//       expect(screen.getByText('Create New Task')).toBeTruthy();
//     });

//     it('should handle keyboard dismiss', () => {
//       render(<TaskModal {...defaultProps} />);
      
//       const modalContainer = screen.getByText('Create New Task').parent;
//       if (modalContainer) {
//         fireEvent.press(modalContainer);
//       }
      
//       // This test verifies that the keyboard dismiss functionality doesn't crash
//       expect(screen.getByText('Create New Task')).toBeTruthy();
//     });
//   });

//   describe('Integration Tests', () => {
//     it('should complete full form submission flow', async () => {
//       render(<TaskModal {...defaultProps} />);
      
//       // Fill in form
//       const titleInput = screen.getByPlaceholderText('e.g., Design new onboarding flow');
//       fireEvent.changeText(titleInput, 'Test Task');
      
//       const descriptionInput = screen.getByPlaceholderText('Add more details about the task...');
//       fireEvent.changeText(descriptionInput, 'Test Description');
      
//       // Select quadrant
//       const quadrantButton = screen.getByText('not Urgent & Important');
//       fireEvent.press(quadrantButton);
      
//       // Select date
//       const dateInput = screen.getByText('Select due date');
//       fireEvent.press(dateInput);
      
//       await waitFor(() => {
//         const calendarDay = screen.getByTestId('calendar-day-2024-01-20');
//         fireEvent.press(calendarDay);
//       });
      
//       // Submit form
//       const saveButton = screen.getByText('Save Task');
//       fireEvent.press(saveButton);
      
//       expect(mockOnSave).toHaveBeenCalled();
//       expect(mockOnClose).toHaveBeenCalled();
//     });
//   });
// });

// // Additional test utilities and custom matchers
// export const createMockItem = (overrides: Partial<Item> = {}): Item => ({
//   id: '1',
//   name: 'Default Task',
//   description: 'Default Description',
//   dueDate: new Date(),
//   category: Categories.urgentImportant,
//   iscompleted: false,
//   ...overrides,
// });

// // Test data factories
// export const testData = {
//   validTaskData: {
//     title: 'Valid Task Title',
//     description: 'Valid task description',
//     quadrant: Categories.noturgentImportant,
//     dueDate: '2024-01-15',
//   },
  
//   invalidTaskData: {
//     title: 'A', // Too short
//     description: '',
//     quadrant: Categories.urgentImportant,
//     dueDate: '',
//   },
  
//   sampleItems: [
//     createMockItem({ id: '1', name: 'Task 1' }),
//     createMockItem({ id: '2', name: 'Task 2', category: Categories.noturgentImportant }),
//     createMockItem({ id: '3', name: 'Task 3', category: Categories.urgentnotImportant }),
//   ],
// };