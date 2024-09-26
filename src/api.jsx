import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

const apiKey = '10e867e17b024c919bf398742a9f97bc';

const fetchRecipes = createAsyncThunk( 'recipe/fetchRecipes', async (query) => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
            query, 
            apiKey,
            diet: 'vegetarian'
        }
    });
    return response.data.results;
});

export default fetchRecipes;

