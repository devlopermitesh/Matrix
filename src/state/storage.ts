import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV({
  id: `matrix`,
  encryptionKey: 'hunter2'
})
export const mmkvStorage={
setItem:(key:string,value:string)=>{
  console.log("Hello world set item")
storage.set(key, value)
},
getItem:(key:string)=>{
  console.log("Hello world get item")

  const value = storage.getString(key);
  return value === undefined ? null : value;
},
removeItem:(key:string)=>{
  console.log("Hello world remove item")

  return storage.delete(key)
}
}