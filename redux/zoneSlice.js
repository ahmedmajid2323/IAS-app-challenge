import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    factory_data:[],
    factoryAdmin:{
        email:'',
        displayName:'',
        factory_name:''
    }
}

export const factorySlice = createSlice({
    name:'factory',
    initialState,
    reducers:{
        set_factoryAdmin(state , action){
            state.factoryAdmin = action.payload
        },
    }   
})

export const { set_factoryAdmin } = factorySlice.actions

export default factorySlice.reducer