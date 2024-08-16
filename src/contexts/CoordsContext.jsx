// Rôle : Contexte pour gérer les coordonnées servant à situer la carte
import { useState, createContext } from "react";

export const CoordsContext = createContext()

export function CoordsProvider({children}){

    // Etat pour stocker les coordonnées
    // L'état initial correspond aux coordonnées du siège de Mc'donald's
    const [coords,setCoords] = useState([41.8781,-87.6298])

    return(
        <CoordsContext.Provider value={{coords,setCoords}}>
            {children}
        </CoordsContext.Provider>
    )
}