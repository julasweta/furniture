import { createSlice } from '@reduxjs/toolkit';

const furnitureSlice = createSlice({
  name: "furniture",
  initialState: {
    furnitur: [],
    itemFurniture: {},
  },

  
  reducers: {
    setFurniturs: (state, action) => {
        state.furnitur = [...state.furnitur, action.payload] ;

    },
    setItemFurniture: (state, action) => {
        state.itemFurniture = action.payload ;

    },
   
  },

});

export const {
  setFurniturs,
  setItemFurniture,
  setIdBrowser
} = furnitureSlice.actions;
export default furnitureSlice.reducer;
