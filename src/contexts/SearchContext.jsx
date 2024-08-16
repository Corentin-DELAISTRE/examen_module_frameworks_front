// Rôle : Contexte pour gérer les informations de recherche, les propositions de résultats, et l'état de chargement lors de l'appel de l'api
import { useEffect, useState, createContext } from "react";

export const SearchContext = createContext({});

export function SearchProvider({ children }) {

    // États pour gérer la recherche, les propositions, et l'état de chargement
    const [search, setSearch] = useState("")
    const [submitSearch, setSubmitSearch] = useState(null)
    const [propositions, setPropositions] = useState([])
    const [loading, setLoading] = useState(true);

    // Utilisation du useEffect pour que l'appel se lance au changement de submitSearch
    useEffect(() => {
        // Si la recherche n'est pas vide et qu'on a bien soumis la recherche
        if (submitSearch != null) {
            // Lancement du chargement
            setLoading(true);
            // Lancer la requête pour récupérer les restaurants
            fetch(`https://nominatim.openstreetmap.org/search?city=${search}&format=json&limit=3`)
                .then((res) => res.json())
                .then((rep) => {
                    if(rep != null){
                        // Assignation des propositions
                        setPropositions(rep)
                        // Arrêt du chargement
                        setLoading(false);
                    }
                })
                .catch(() => {
                    // Arret du chargement si erreur
                    setLoading(false);
                });
            }
            
        // Réinitialisation de la recherche
        setSubmitSearch(null)

    }, [submitSearch])

    return (
        <SearchContext.Provider value={{ search, setSearch, loading, setLoading, propositions, setPropositions, submitSearch, setSubmitSearch }}>
            {children}
        </SearchContext.Provider>
    )
}