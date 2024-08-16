// Rôle : Composant pour afficher des bouttons avec différents types d'action comme la selection d'un restaurant et la gestion de la géolocalisation

// Importation du css lié au composant
import './Buttons.css'
// Importation des contextes nécessaire au fonctionnement du composant
import { useContext } from 'react'
import { SelectionContext } from '../../contexts/SelectionContext'
import { RestaurantsContext } from '../../contexts/RestaurantsContext'
import { CoordsContext } from '../../contexts/CoordsContext'
import { AskDivContext } from '../../contexts/AskDivContext'

export default function Buttons({type,children,restaurant}){

    // Récuperation de "setSelection" pour pouvoir mettre à jour le restaurant sélectionné
    const { setSelection} = useContext(SelectionContext)
    // Récupération de "setViewBox" pour mettre à jour la vue des restaurants sur la carte
    const {setViewBox} = useContext(RestaurantsContext)
    // récupération de "setCoords" pour mettre à jour les coordonnées pour le positionnement de la carte sur l'écran
    const {setCoords} = useContext(CoordsContext)
    // Récupération de "setShowDiv" pour contrôler la visibilité de la div demandant le centrage sur la position de l'utilisateur
    const {setShowDiv} = useContext(AskDivContext)

    // Fonction appelée lorsque l'utilisateur clique sur un bouton de sélection de restaurant
    function handleClick(){
        // Met à jour la sélection du restaurant dans le contexte
        setSelection(restaurant)
    }

    // Fonction appelé lorsque l'utilisateur veut partager sa position => centre la carte sur la position de l'utilisateur et affiche les restaurants autour de lui
    function handleYes() {

        // Demande la position de l'utilisateur. Si les coordonnées sont récupérées => exécute la fonction "success"
        //                                                                    sinon => exécute la fonction "error"
        navigator.geolocation.getCurrentPosition(success, error);

        // Fonction qui traite la réponse de la géolocalisation (elle prend en paramètre la position renvoyé par navigator.geolocation.getCurrentPosition())
        function success(position) {

            // Récuperation latitude et la longitude de la position
            let lat = position.coords.latitude
            let lon = position.coords.longitude

            // Appelle nominatim pour trouver les infos dont j'ai besoin via les coordonnées
            // On a besoin de la valeur "boundingbox" de la réponse de l'api pour s'en servir pour valoriser viewBox servant à afficher les restaurant
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
                .then(res => res.json())
                .then(rep => {

                    // Assignation du viewBox
                    // Agrandissement des valeurs reçues car viewBox trop petite (choix personnel)

                    // La viewBox doit être une chaine de caractère de 4 coordonnées différentes séparées par une virgule englobant une position et doit être déclaré dans cet ordre: gauche->bas->droite->haut

                    // La boundingbox de nominatim est un tableau de 4 coordonnées et sont déclarées dans cet ordre bas->haut->gauche->droite

                    // Réarangement des coordonnées dans le bon ordre :
                    // ToFixed(7) est utilisé car les calcul avec javascript peuvent retourner trop de chiffres après la virgules ce qui peut déclencher une erreur

                    let left = parseFloat((parseFloat(rep.boundingbox[2]) - 0.1).toFixed(7)) 
                    let bottom = parseFloat((parseFloat(rep.boundingbox[0]) - 0.1).toFixed(7))
                    let right = parseFloat((parseFloat(rep.boundingbox[3]) + 0.1).toFixed(7))
                    let top = parseFloat((parseFloat(rep.boundingbox[1]) + 0.1).toFixed(7))
                    
                    let zone = left + "," + bottom + "," + right + "," + top
                    
                    setViewBox(zone)
                    // Assignation des coordonnées pour que la carte se centre au bon endroit
                    setCoords([parseFloat(lat),parseFloat(lon)])
                })
                // Gestion des erreurs
                .catch(error => console.error('Erreur lors du fetch:', error));
            }
            
            // Fonction appelée si les coordonnées ne sont pas récupérée
            function error(err) {
                // Affiche l'erreur en console
                console.warn(`Erreur (${err.code}): ${err.message}`);
            }
            
        // Masque la div demandant la géolocalisation
        setShowDiv(false)
    }

    // Fonction appelée si l'utilisateur choisi de ne pas partager sa position
    function handleNo(){
        // Masque simplement la div demandant la géolocalisation
        setShowDiv(false)
    }
    
    // Rendre le boutton en fonction du type fourni
    if(type == "search"){
        // Boutton pour envoyer la recherche du formulaire
        return(
            <button className="searchButton" type='submit'>
                <div className="picto-search-box">
                    <img src="/public/icons/loupe.png" alt="Icone en forme de loupe de couleur noire" className='responsive-img'/>
                </div>
            </button>
        )
    }else if(type =="selection"){
        // Boutton pour sélectionner un restaurant
        return(
            <button className="actionButton" onClick={handleClick}>{children}</button>
        )
    }else if(type =="continue"){
        // Boutton continuer (sans effet)
        return(
            <button className="actionButton">{children}</button>
        )
    }else if(type == "yes"){
        // Boutton pour accepter la géolocalisation
        return(
            <button className="actionButton" onClick={handleYes}>{children}</button>
        )
    }else if(type == "no"){
        // Boutton pour refuser la géolocalisation
        return(
            <button className="cancelButton" onClick={handleNo}>{children}</button>
        )
    }
}