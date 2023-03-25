import { createSlice } from "@reduxjs/toolkit"

export const resultReducer = createSlice({
    name: 'result',
    initialState : {
        userId : null,
        result : [] ,
        types : null
    },
    reducers : {
        setUserId : (state, action) => {
            state.userId = action.payload
        },
        setTypes : (state, action) => {
            state.types = action.payload
        },
        pushResultAction : (state, action) => {
            state.result.push(action.payload)
        },
        updateResultAction : (state, action) => {
            const { trace, checked } = action.payload;
            state.result.fill(checked, trace, trace + 1)
        },
        resetResultAction : () => {
            return {
                userId : null,
                result : [] ,
                types : null
            }
        }
    }
})

export const { setUserId,setTypes, pushResultAction, resetResultAction, updateResultAction } = resultReducer.actions;

export default resultReducer.reducer;
