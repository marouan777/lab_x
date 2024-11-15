import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

const APP_ID = "4d80bfb8"; // Votre APP_ID
const APP_KEY = "fff88fd9c6f9fdb2d35c1fb7cba00e35"; // Votre APP_KEY

const App = () => {
  const [recipes, setRecipes] = useState([]); // État pour stocker les recettes
  const [search, setSearch] = useState(""); // État pour la barre de recherche
  const [query, setQuery] = useState(""); // État pour la requête finale

  // Fonction pour récupérer les données des recettes via l'API
  const fetchRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits.map((hit) => hit.recipe));
  };

  // Utiliser useEffect pour déclencher la requête API lorsque `query` change
  useEffect(() => {
    if (query) fetchRecipes();
  }, [query]);

  // Fonction pour gérer la soumission du formulaire
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search); // Définir `query` pour déclencher useEffect
  };

  return (
    <div className="App p-4">
      {/* Formulaire de recherche */}
      <form onSubmit={handleSearch} className="mb-4 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une recette..."
          className="border-2 border-gray-300 rounded p-2 mr-2 w-64"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Rechercher
        </button>
      </form>

      {/* Affichage des recettes */}
      <div className="grid grid-cols-3 gap-4">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))
        ) : (
          <p className="col-span-3 text-center">
            {query ? "Aucune recette trouvée." : "Commencez par rechercher une recette."}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
