import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    value: 100,
    windowStyle: ["Глухе вікно", 1, "https://liniavikon.com.ua/images/smart/calc/okno_povorotnoe_otkidnoe.jpg"],
    typeOption: ["Rehau", 1],
    systemOption: ["Ecosol60", 1],
    addOption: ["Підвіконня", 400],
    fullPrice: 0,
  },

  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setWindowStyle: (state, action) => {
      state.windowStyle = action.payload;
    },
    setTypeOption: (state, action) => {
      state.typeOption = action.payload;
    },
    setSystemOption: (state, action) => {
      state.systemOption = action.payload;
    },
    setAdd: (state, action) => {
      state.addOption = action.payload;
    },
    setFullPrice: (state) => {
      //вираховуємо ціну вікна
      state.fullPrice = Math.round(state.value / 100) *
      1020 *
      state.windowStyle[1] *
      state.typeOption[1] *
      state.systemOption[1] +
    state.addOption[1];
    },
  
  
  
  },
});

export const {
  setValue,
  setWindowStyle,
  setTypeOption,
  setSystemOption,
  setAdd,
  setFullPrice,
} = modalSlice.actions;
export default modalSlice.reducer;
