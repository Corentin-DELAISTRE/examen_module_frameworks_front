// Rôle : Contexte pour gérer la liste des restaurants, l'état de chargement lors de l'appel des restaurants à l'api, et la vue contenant les restaurants sur la carte (viewBox).
import { useEffect, useState, createContext } from "react";


// Création du contexte
export const RestaurantsContext = createContext({});

export function RestaurantsProvider({ children }) {

    // État pour stocker la liste des restaurants, l'état de chargement, et la vue de la carte
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true);
    const [viewBox, setViewBox] = useState("")

    // Utilisation du use effect pour que le fetch ne se lance que si la viewBox est modifiée
    useEffect(() => {
        // Si j'ai bien une viewBox
        if (viewBox) {
            // Lancement du chargement
            setLoading(true);
            // Lancer la requête pour récupérer les restaurants contenus dans la viewBox
            fetch(`https://nominatim.openstreetmap.org/search?q=McDonald's+&format=json&limit=10&bounded=1&viewbox=${viewBox}`)
                .then((res) => res.json())
                .then((rep) => {
                    // Assignations des restaurants
                    setRestaurants(rep);
                    // Arrêt du chargement
                    setLoading(false);
                })
                .catch(() => {
                    // Arret du chargement si erreur
                    setLoading(false);
                });
        }
    }, [viewBox]);



    return (
        <RestaurantsContext.Provider value={{ restaurants, setRestaurants, loading, setLoading, viewBox, setViewBox }}>
            {children}
        </RestaurantsContext.Provider>
    );

}