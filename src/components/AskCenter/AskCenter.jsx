// Rôle : Composant qui affiche une demande à l'utilisateur pour centrer la carte sur sa position actuelle.
// Utilise le contexte AskDivContext pour déterminer la visibilité de la div demandant le centrage sur la position de l'utilisateur.

// Importation du css concernant ce composant
import './AskCenter.css'
// Importation du composant Buttons.jsx
import Buttons from '../Buttons/Buttons'
// Importation des contextes nécessaire au fonctionnement du composant
import { useContext } from 'react'
import { AskDivContext } from '../../contexts/AskDivContext'


export default function AskCenter() {

    // REcuperation de "showDiv" qui vaut true si le composant AskCenter est visible à l'écran et qui vaut false dans le cas contraire
    const { showDiv } = useContext(AskDivContext)

    // Affiche la demande de centrage seulement si showDiv est true
    if (showDiv == true) {
        return (
            <div className="askCenter flexwrap flexcolumn g16 p16 w80 textcenter">
                <p>Centrer la carte sur votre position?</p>
                <div className="askButtons flexwrap g8 justcenter">
                    <Buttons type="yes">Oui</Buttons>
                    <Buttons type="no">Non</Buttons>
                </div>
                <p>En cliquant sur oui la carte affichera les restaurants près de vous.</p>
                <p className='permission'>Pour que cette fonctionnalitée soit disponible l'accès à votre position par le navigateur doit être autorisée.</p>
            </div>
        )
    }

}