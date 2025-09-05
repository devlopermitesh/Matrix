import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomeSafeAreaView from '../components/atoms/CustomeSafeAreaView';
import Header from '../components/organism/Header';
import ItemContainer from '../components/organism/ItemContainer';
import { useTodos } from '../state/todos';
import { Categories, CategoryTitles, Item } from '../data/constant';
import PlusButton from '../components/atoms/PlusButton';
import AddTaskModal from '../components/moleculers/AddTask';

const Home = () => {
  const { todos,setData, newtodo} = useTodos();
  const [visible,setvisible]=useState(false)
  console.log("todos",todos)
useEffect(()=>{
setData()
},[])

  return (
    <CustomeSafeAreaView>
      <Header />
      <ScrollView  contentContainerStyle={styles.scrollContainer}>
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
        <PlusButton style={styles.floatingButton} onPress={()=>setvisible(true)} />
        {
    visible && <AddTaskModal visible={visible} onClose={()=>{
      setvisible(false)

    }} onSave={(data)=>{

const item:Item={
   id:Math.random().toString(36).substring(2, 10),
  name:data.title,
  description:data.description??"",
 dueDate: new Date(data.dueDate || Date.now()),
category:data.quadrant,
iscompleted:false
}
      
newtodo(item)
    }}/>
        }
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
    bottom: 0,
    right: 30,
  },
});
