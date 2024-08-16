// Rôle : Composant qui gère l'envoi de la recherche d'un lieu pour permettre l'affichage de la zone de cette recherche et des restaurants associés.

// Importation du css associé
import './SearchZone.css'
// Importation des contextes nécessaires au bon fonctionnement du composant
import { useContext } from 'react'
import { SearchContext } from '../../contexts/SearchContext'
import { RestaurantsContext } from '../../contexts/RestaurantsContext'
import { CoordsContext } from '../../contexts/CoordsContext'
import { AskDivContext } from '../../contexts/AskDivContext'
// Importation des bouttons
import Buttons from '../Buttons/Buttons'

export default function SearchZone() {

    // Récupération de "setViewBox" pour mettre à jour la vue des restaurants sur la carte
    const { setViewBox } = useContext(RestaurantsContext)
    // Récupération de plusieurs éléments du contexte concernant la recherche afin de traiter cette recherche et les propositions de lieus en découlant
    const { search, setSearch, propositions, setSubmitSearch, setPropositions } = useContext(SearchContext)
    // Récupération de "setCoords" pour mettre à jour les coordonnées pour le positionnement de la carte sur l'écran
    const { setCoords } = useContext(CoordsContext)
    // Récupération de "showDiv" afin de contrôler la visibilité et les interactions pour le composant SearchZone
    const { showDiv } = useContext(AskDivContext)

    // Fonction appelée lors du changement de la valeur de recherche
    function handleValue(e) {
        setSearch(e.target.value)
    }

    // Fonction appelée lors de la soumission du formulaire de recherche
    function handleSearch(e) {
        // J'attends avant de soumettre
        e.preventDefault()

        // Si la recherche est vide ou ne contient que des espaces
        if (search.trim() === "") {
            // J'informe l'utilisateur que le champs ne peut être vide
            alert("Votre recherche ne peut pas être vide...")
            // Je sors de la fonction (le formulaire n'est pas traité)
            return
        } else if (search.includes('<script')) {
            // sinon si mon utilisateur essaye d'injecter du code dans le formulaire
            // Je l'informe que c'est interdit / pas possible
            alert("Le fait d'introduire frauduleusement des données dans un système de traitement automatisé  est puni de cinq ans d'emprisonnement et de 150 000 € d'amende. (Article 323-3 du code pénal)")
            // Je sors de la fonction (le formulaire n'est pas traité)
            return
        }else if(search.includes('&') || search.includes('/') ||search.includes('"') ||search.includes("'") ||search.includes('<') || search.includes(">")){
            // Sinon si mon utilisateur rentre des caractères non conformes
            alert("Vous ne pouvez pas écrire des caractères spéciaux.")
            // Je sors de la fonction (le formulaire n'est pas traité)
            return
        }

        // Je soumet la recherche (SubmitSearch est utilisé pour éviter d'envoyer les infos à chaque changement de search et de faire trop d'appels vers l'api nominatim)
        setSubmitSearch(search)
    }

    // Fonction appelée lors du clic sur une proposition proposé en dessous de l'input après envoi de la recherche
    function handleClick(proposition) {

        // Assignation de la viewBox pour afficher les restaurants contenus à l'intérieur (Voir le composant Bouttons pour le détail des calculs suivant)
        let left = proposition.boundingbox[2]
        let bottom = proposition.boundingbox[0]
        let right = proposition.boundingbox[3]
        let top = proposition.boundingbox[1]
        let zone = left + "," + bottom + "," + right + "," + top
        setViewBox(zone)

        // Réinitialisation des propositions
        setPropositions([])
        // Assignation des coordonnées du lieu proposé pour centrer la carte sur cette position
        setCoords([parseFloat(proposition.lat), parseFloat(proposition.lon)])
    }

    return (
        // Retourne le composant SearchZone
        // Si la demande de géolocalisation a été traité ou non (Si showDiv vaut true ou false) bloque/débloque les interactions avec SearchZone en utilisant la classe "disable-interaction")
        <div className={showDiv ? 'disable-interaction' : ''}>
            <div className="searchZone flexwrap flexcolumn g8">
                <p>Rechercher un Restaurant</p>
                <form action="" className='flexwrap align-center g8' onSubmit={handleSearch}>
                    <input type="search" onChange={handleValue} />
                    <Buttons type="search"></Buttons>
                    <div className="proposition-container flexwrap g8">

                        {propositions.map(proposition => {
                            if (search != "") {
                                return (
                                    <div key={proposition.place_id} className="proposition" onClick={() => handleClick(proposition)}>
                                        <p>{proposition.display_name}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </form>
            </div>
        </div>
    )
}