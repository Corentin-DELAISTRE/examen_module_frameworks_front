// Rôle : Contexte pour gérer la visibilité de certain composant selon si la demande de géolocalisation a été traitée ou non
import { useState, createContext } from "react";

export const AskDivContext = createContext({})

export function AskDivProvider({children}){

    // Etat pour savoir si la demande de géolocalisation a été traitée ou non
    // showDiv vaut true si la demande n'a pas été traitée (si la div contenant la demande est toujours visible)
    // Sinon elle vaut false
    const [showDiv, setShowDiv] = useState(true)

    return (
        <AskDivContext.Provider value={{ showDiv, setShowDiv}}>
            {children}
        </AskDivContext.Provider>
    );
}