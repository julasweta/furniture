import { createSlice } from '@reduxjs/toolkit';

const designerSlice = createSlice({
  name: "designer",
  initialState: {
    designer: [],
    itemDesigner: {},
  },

  
  reducers: {
    setDesigner: (state, action) => {
        state.designer = [...state.designer, action.payload] ;
    },

    setItemDesigner: (state, action) => {
        state.itemDesigner = action.payload;
        localStorage.setItem("itemLocalDesigner", JSON.stringify(action.payload));
    },
  
   
  },

});

export const {
  setItemDesigner,
} = designerSlice.actions;
export default designerSlice.reducer;