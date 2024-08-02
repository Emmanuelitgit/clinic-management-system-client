import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./modalState";
import { authSlice } from "./auth";
import { depCountSlice } from "./depCount";
import { dataSlice } from "./data";


const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        modal:modalSlice.reducer,
        data:dataSlice.reducer,
        count:depCountSlice.reducer,
    }
})

export default store;