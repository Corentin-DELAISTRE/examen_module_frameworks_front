// Rôle : Composant pour affichant un message ou les informations du restaurant sélectionné

// Importation du css associé au composant
import './Overlay.css'
// Importation des context nécessaires au bon fonctionnment du composant
import { useContext } from 'react'
import { SelectionContext } from '../../contexts/SelectionContext'
// Importation des boutons
import Buttons from '../Buttons/Buttons'

export default function Overlay() {

    // Récupération de sélection qui soit est vide soit contient un objet restaurant
    const { selection } = useContext(SelectionContext)

    // Si la selection est vide j'informe l'utilisateur qu'il n'a pas sélectionné de restaurant
    if (selection == null) {
        return (
            <div className="overlay p32 g8 flexwrap">
                <p className="selection">Aucun restaurant sélectionné</p>
            </div>
        )
    } else {
        // Sinon si ma selection contient un objet restaurant alors j'afiche les informations concernant ce restaurant
        return (
            <div className="overlay p32 g8 flexwrap">
                <p className="selection">Restaurant sélectionné</p>
                <p className="adresse">
                    {selection.display_name}
                </p>
                <Buttons type="continue">Continuer</Buttons>
            </div>
        )
    }
}