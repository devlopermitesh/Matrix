export type ThemeColors = {
  background: string;
  spacebackground:string;
  border:string;
  boxbackground:string;
  formbackground:string;
  formheading:string;
  label:string;
  closeIcon:string;
  inputbg:string;
  inputborder:string;
  emptytext:string;
  quandartBG:string;
  text: string;
  shadow?: string;
  cardlabel:string;
  overlay:string;
  card?: string;     // optional
  primary?: string;  // optional
};

const lightColors = {
  background: "#ffffff",
  spacebackground:"#F2F2F2",
  boxbackground:"#F9F9F9",
  emptytext:'#555',
  text: "#000000",
  border:"#ffffff",
  formbackground:"#ffffff",
  formheading:'#333',
  closeIcon:'#E0E0E0',
  inputbg: '#F9F9F9',
  inputborder:'#E0E0E0',
  label:"#666",
  quandartBG:'#F5F5F5',
  shadow:"#ddd",
  cardlabel:"#000",
  overlay: "#0c0c0cff"

};

const darkColors = {
  background: "#1B1B1B",
  spacebackground:"#242424",
  boxbackground:"#1F1F1F",
  emptytext:'#B7B7B7',
  text: "#ffffff",
  border:"#000000",
  formbackground:"#1B1B1B",
  formheading:'#fff',
  closeIcon:'#333333',
  inputbg: '#1F1F1F',
  inputborder:'#333333',
  label:"#A6A6A6",
  quandartBG:'#222222',
  shadow:"#333",
  cardlabel:"#ddd",
  overlay: "#fffffff4"

};

export {
  lightColors,
  darkColors
}