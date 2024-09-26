import React from 'react';
import {Link} from 'react-router-dom'

const RecipeCard = ({recipe}) => {
    return (
        <Link to={`/recipe/${recipe.id}`}>
            <div className={'recipe-card'}>
                <img src={recipe.image} alt={recipe.title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "./assets/default-recipe-image.png";
                    }}
                ></img>
                <h3>{recipe.title}</h3>
            </div>
        </Link>
    );
};

export default RecipeCard;
