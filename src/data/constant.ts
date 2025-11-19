import boarding1 from '../asset/Images/boarding1.png';
import boarding2 from '../asset/Images/boarding2.png';
import boarding3 from '../asset/Images/boarding3.png';

export interface Slide {
  id: number;
  image: number; // React Native Image source type
  title: string;
  subtitle: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    image: boarding1,
    title: 'Organize tasks with the Eisenhower Matrix',
    subtitle:
      'Prioritize your tasks based on urgency and importance to maximize productivity.',
  },
  {
    id: 2,
    image: boarding2,
    title: 'Focus on what matters most',
    subtitle:
      'Prioritize tasks based on urgency and importance to maximize productivity.',
  },
  {
    id: 3,
    image: boarding3,
    title: 'Boost productivity with clarity',
    subtitle:
      'Prioritize tasks effectively using the Eisenhower Matrix, focusing on what truly matters.',
  },
];

export enum Categories {
  urgentImportant,
  noturgentImportant,
  urgentnotImportant,
  noturgentnotImportant,
}

export const CategoryTitles: Record<keyof typeof Categories, string> = {
  urgentImportant: 'Urgent and Important Task',
  noturgentImportant: 'Not Urgent but Important',
  urgentnotImportant: 'Urgent but Not Important',
  noturgentnotImportant: 'Not Urgent & Not Important',
};
export enum Colors {
  urgentImportant = '#ff1100',
  noturgentImportant = '#00e21eff',
  urgentnotImportant = '#f78c00ff',
  noturgentnotImportant = '#6200ffff',
}

export interface Item {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  category: Categories;
  iscompleted: boolean;
}
export type IconThemeType = 'bell' | 'info' | 'theme';
export type ButtonThemeType = 'Normal' | 'theme' | 'checkOut';

export const AppranceCollectionData: {
  id: number;
  title: string;
  name: string;
  iconType: IconThemeType;
  buttonType: ButtonThemeType;
}[] = [
  {
    id: 1,
    title: 'Apprerance',
    name: 'Theme',
    iconType: 'theme',
    buttonType: 'theme',
  },
  {
    id: 2,
    title: 'Notification',
    name: 'Reminder',
    iconType: 'bell',
    buttonType: 'Normal',
  },
  {
    id: 3,
    title: 'About',
    name: ` Matrix \n version:0.0.1`,
    iconType: 'info',
    buttonType: 'checkOut',
  },
];
