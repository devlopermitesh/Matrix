import { ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomeSafeAreaView from '../components/atoms/CustomeSafeAreaView';
import Header from '../components/organism/Header';
import ItemContainer from '../components/organism/ItemContainer';
import { useTodos } from '../state/todos';
import { Categories, CategoryTitles, Item } from '../data/constant';
import PlusButton from '../components/atoms/PlusButton';
import TaskModal from '../components/moleculers/Taskmodel';
import { useThemedStyles } from '../utils/useThemedStyles';
import { ThemeColors } from '../constant/theme';

const Home = () => {
  const { todos, setData, newtodo } = useTodos();
  const [visible, setVisible] = useState(false);

 const styles=useThemedStyles(styleCreator)
  
  useEffect(() => {
    (async () => {
      await setData();
    })();
  }, []); // run only once on mount

  return (
    <CustomeSafeAreaView style={styles.bgColor}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.keys(todos).map(category => (
          <ItemContainer
            title={CategoryTitles[category as keyof typeof Categories]}
            key={category}
            category={category as keyof typeof Categories}
            items={todos[category as keyof typeof Categories]}
          />
        ))}
      </ScrollView>

      {/* Floating Plus Button */}
      <PlusButton
        style={styles.floatingButton}
        onPress={() => setVisible(true)}
      />
      {visible && (
        <TaskModal
          visible={visible}
          model_title="Add Task"
          onClose={() => setVisible(false)}
          onSave={async data => {
            const item: Item = {
              id: Math.random().toString(36).substring(2, 10),
              name: data.title,
              description: data.description ?? '',
              dueDate: new Date(data.dueDate || Date.now()),
              category: data.quadrant,
              iscompleted: false,
            };
            console.log("NEw Todo",item)
            await newtodo(item);
            setVisible(false);
          }}
        />
      )}
    </CustomeSafeAreaView>
  );
};

export default Home;
const styleCreator=(colors:ThemeColors)=>{
return  StyleSheet.create({
  bgColor:{
    backgroundColor:colors.spacebackground
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 50,
    backgroundColor:colors.spacebackground,
  },
  floatingButton: {
    position: 'absolute',
    bottom: '15%',
    right: 30,
  },
});

}
