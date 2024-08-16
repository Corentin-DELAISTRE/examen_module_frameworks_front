// Rôle : Contexte pour gérer la sélection d'un restaurant par l'utilisateur.

import { useState, createContext } from "react";

export const SelectionContext = createContext()

export function SelectionProvider({children}){

    // État pour stocker le restaurant sélectionné
    const [selection,setSelection] = useState(null)

    return(
        <SelectionContext.Provider value={{selection,setSelection}}>
            {children}
        </SelectionContext.Provider>
    )
}