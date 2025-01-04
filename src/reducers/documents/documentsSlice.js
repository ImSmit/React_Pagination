import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDocuments = createAsyncThunk("fetchDocuments", async () => {    
    const response = await axios.get("http://127.0.0.1:8000/api/document/documents")
    return response.data;
})
const documentsInitialState = {
    isLoading: false,
    isError: false,
    count: 0,
    next: null,
    previous: null,
    results: [],
    errorMessage: null
}

const documentsSlice = createSlice({
    name:'documents',
    documentsInitialState,
    extraReducers: builder => {
        builder.addCase(fetchDocuments.pending, (state) => {
            state.isLoading = true
            state.isError = false
        }),
        builder.addCase(fetchDocuments.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.count = action.payload.count
            state.next = action.payload.next
            state.previous = action.payload.previous
            state.results = action.payload.results
            state.errorMessage = null
        }),
        builder.addCase(fetchDocuments.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message
        });
    }
})

export const { getDocuments } = documentsSlice.actions
export default documentsSlice.reducer