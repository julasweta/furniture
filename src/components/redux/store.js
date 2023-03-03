import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import furnitureReducer from "./furnitureSlice";
import designerReducer from "./designerSlice";




export const store = configureStore({
  reducer: {
    modal: modalReducer,
    furniture: furnitureReducer,
    designer: designerReducer,
  },
 

});