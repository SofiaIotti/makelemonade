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
            <h2 className="claim">Ricette veg per tutti i gusti, da tutto il mondo.</h2>
            <SearchBar onSearch={handleSearch}/>
            <div className={'recipes-container'}>
                {status === 'loading' && <div><p>Caricamento...</p>
                <Link to="/">
                <button className={'backhome'}>Home</button>
                </Link></div>
                }
                {status === 'failed' && <div><p>Errore durante la ricerca.</p>
                <Link to="/">
                <button className={'backhome'}>Home</button>
                </Link></div>
                }
                {status === 'success' && items.length === 0 && query.trim() && (
                <p className="no-recipes-message">Nessuna ricetta corrisponde alla tua ricerca.<br/>Prova con un'altra parola.</p> 
                )}
                {items.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default Home;