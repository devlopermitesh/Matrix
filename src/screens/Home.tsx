import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomeSafeAreaView from '../components/atoms/CustomeSafeAreaView';
import Header from '../components/organism/Header';
import ItemContainer from '../components/organism/ItemContainer';
import { useTodos } from '../state/todos';
import { Categories, CategoryTitles, Item } from '../data/constant';
import PlusButton from '../components/atoms/PlusButton';
import { dbInstance } from '../state/newsql';
import TaskModal from '../components/moleculers/Taskmodel';
import notifee from "@notifee/react-native"
const Home = () => {
  const { todos, setData, newtodo } = useTodos();
  const [visible, setVisible] = useState(false);
useEffect(() => {
  (async () => {
    await setData()
    const data=await notifee.getTriggerNotifications()
    console.log("Data",data)
  })();
}, []); // run only once on mount

  return (
    <CustomeSafeAreaView>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.keys(todos).map((category) => (
          <ItemContainer
            title={CategoryTitles[category as keyof typeof Categories]}
            key={category}
            category={category as keyof typeof Categories}
            items={todos[category as keyof typeof Categories]}
          />
        ))}
      </ScrollView>

      {/* Floating Plus Button */}
      <PlusButton style={styles.floatingButton} onPress={() => setVisible(true)} />
      {visible && (
        <TaskModal
          visible={visible}
          model_title='Add Task'
          onClose={() => setVisible(false)}
          onSave={async(data) => {
            const item: Item = {
              id: Math.random().toString(36).substring(2, 10),
              name: data.title,
              description: data.description ?? '',
              dueDate: new Date(data.dueDate || Date.now()),
              category: data.quadrant,
              iscompleted: false,
            };
            await newtodo(item);
            setVisible(false);
          }}
        />
      )}

    </CustomeSafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    paddingBottom: 50,
  },
  floatingButton: {
    position: 'absolute',
    bottom: "15%",
    right: 30,
  },
});
