// Rôle : Composant pour afficher une carte interactive avec des marqueurs pour les restaurants et gérer la vue basée sur les coordonnées.

import './Map.css'
// Importation des composants nécessaires de react-leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// Importation des contextes nécessaires au fonctionnement du composant
import { useContext } from 'react'
import { RestaurantsContext } from '../../contexts/RestaurantsContext'
import { CoordsContext } from '../../contexts/CoordsContext'
import { AskDivContext } from '../../contexts/AskDivContext'
// importation de l'icone personalisée pour les marqueurs sur la carte
import restau from '../../../public/icons/restau.png'
// Importation des bouttons
import Buttons from '../Buttons/Buttons'

export default function Map() {

    // Récupération des restaurants proches de la recherche ou de la position de l'utilisateur + récupération de "loading" correspondant à l'état du chargement lors de l'appel à l'api pour récupérer les restaurants pour être sur que l'appel est terminé avnt de récuperer les restaurants
    const { restaurants, loading } = useContext(RestaurantsContext)
    // Récuperation des coordonnées pour que la carte se place selon ces coordonnées
    const { coords } = useContext(CoordsContext)
    // Récupération de "showDiv" afin de contrôler la visibilité et les interactions pour le composant Map
    const { showDiv } = useContext(AskDivContext)

    // Définition de l'icône personnalisée pour les marqueurs
    const IconRestau = L.icon({
        iconUrl: restau,
        iconSize: [64, 64],
        iconAnchor: [32, 64],
        popupAnchor: [0, -64]
    })

    return (
        // Retourne l'élément map avec les marqueurs pour les restaurants en se centrant les coordonnées (coords) et en utilisant les infos de la liste des restaurants (restaurants)
        // si la demande de géolocalisation a été traité ou non (Si showDiv vaut true ou false) bloque/débloque les interactions avec la map en utilisant la classe "disable-interaction")
        <div id="map" className={showDiv ? 'disable-interaction' : ''}>
            {/* L'attribut key rajouté permet que lorsque les coordonnées changent, la valeur de key change aussi permettant un déplacement en temps réel de la carte au lieu voulu lors du choix d'un nouveaux lieu*/}
            <MapContainer center={coords} zoom={13} scrollWheelZoom={true} key={coords.join(",")} style={{
                height: "100%",
                width: "100%",
            }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                />

                {restaurants.map(restaurant => {
                    // Si le chargement des restaurants est terminé, affiche les marqueurs pour ces derniers
                    if (loading == false) {
                        return (
                            <Marker key={restaurant.place_id} position={[restaurant.lat, restaurant.lon]} icon={IconRestau}>
                                <Popup>
                                    <div className='flexwrap flexcolumn g8'>
                                        {restaurant.display_name}
                                        <Buttons type="selection" restaurant={restaurant}>Sélectionner</Buttons>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    }
                })}
            </MapContainer>
        </div>
    )

}