import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchRecipes} from '@/redux/recipeSlice.jsx';
import RecipeCard from '@/components/RecipeCard.jsx';
import SearchBar from '@/components/SearchBar.jsx';


const Home = () => {
    const dispatch = useDispatch();
    const {items, status} = useSelector((state) => state.recipes);
    const [query, setQuery] = useState('');

    const handleSearch = (query) => {
        setQuery(query);
        dispatch(fetchRecipes(query));
    };

    return (
        <div className={'home-container'}>
            <h1 className="hometitle">When life gives you lemon, make lemonade!</h1>
            <h2 className="claim">Veg recipes for everybody, from all over the world.</h2>
            <SearchBar onSearch={handleSearch}/>
            <div className={'recipes-container'}>
                {status === 'loading' && <div><p>Loading...</p>
                <Link to="/">
                <button className={'backhome'}>Home</button>
                </Link></div>
                }
                {status === 'failed' && <div><p>Error during the search.</p>
                <Link to="/">
                <button className={'backhome'}>Home</button>
                </Link></div>
                }
                {status === 'success' && items.length === 0 && query.trim() && (
                <p className="no-recipes-message">No recipe matches your search.<br/>Try with another world.</p> 
                )}
                {items.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default Home;
