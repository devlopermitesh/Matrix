import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV({
  id: `matrix`,
  encryptionKey: 'hunter2'
})
export const mmkvStorage={
setItem:(key:string,value:string)=>{
storage.set(key, value)
},
getItem:(key:string)=>{
  const value = storage.getString(key);
  return value === undefined ? null : value;
},
removeItem:(key:string)=>{
  return storage.delete(key)
}
}