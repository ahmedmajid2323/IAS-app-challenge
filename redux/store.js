import { configureStore } from '@reduxjs/toolkit'
import factoryReducer from './zoneSlice'

const store = configureStore({
    reducer: {
        factory: factoryReducer 
    }
})

export default store
