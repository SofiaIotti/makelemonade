import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = '10e867e17b024c919bf398742a9f97bc';

export const fetchRecipes = createAsyncThunk('recipes/fetchrecipes', async (query) => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
            query,
            diet: 'vegetarian',
            apiKey
        }
    });
    return response.data.results;
}); 

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        items: [],
        status: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchRecipes.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchRecipes.fulfilled, (state, action) =>{
            state.status = 'success';
            state.items = action.payload;
        })
        .addCase(fetchRecipes.rejected, (state) =>{
            state.status = 'failed';
        });
    },
});

const recipeReducer = recipeSlice.reducer;

export default recipeReducer;