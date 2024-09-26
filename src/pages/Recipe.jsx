import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const apiKey = "10e867e17b024c919bf398742a9f97bc";

const Recipe = () => {
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(()=> {
        axios
            .get(`https://api.spoonacular.com/recipes/${id}/information`, {
                params: {apiKey},
            })
            .then ((res) => {
                console.log(res);
                setRecipe(res.data);
            })
            .catch((err) => {
                console.log(err.message);
                setError(true);
            });
    }, [id]);

    if (!recipe && !error){
        return <p>Loading...</p>;
    }

    return (
        <>
            {!error ? (
                <div className={'recipe-detail'}>
                    <h1>{recipe.title}</h1>
                    <div className={'recipe-main-data'}>
                    <img src={recipe.image} alt={recipe.title} />
                    <div className={'recipeingredients'}>
                            {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
                                <div className="ingredients">
                                <div><h3 className="ingredients-title">Ingredients:</h3></div>
                                <div>                                <ul>
                                    {recipe.extendedIngredients.map((ingredient) => (
                                        <li key={ingredient.id}>{ingredient.original}</li>
                                    ))}
                                </ul></div></div>
                            ) : (
                                <p></p>
                            )}
                        </div>
                    <div className="recipedirections">
                        <h3>Directions:</h3>
                        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} className={'recipedescription'}/>
                    </div>
                    </div>
                    <div className={'buttons'}>
                    <button className={'back'} onClick={() => navigate(-1)}>
                       Back
                    </button>
                    <Link to="/">
                        <button className={'backhome'}>Home</button>
                    </Link>
                    </div>
                </div>
            ) : (
                <p>Error</p>
            )}
        </>
    )
};

export default Recipe;
