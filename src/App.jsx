import './App.css'
import Map from './components/Map/Map'
import SearchZone from './components/SearchZone/SearchZone'
import Overlay from './components/Overlay/Overlay'
import AskCenter from './components/AskCenter/AskCenter'
import { RestaurantsProvider } from './contexts/RestaurantsContext'
import { SearchProvider } from './contexts/SearchContext'
import { SelectionProvider } from './contexts/SelectionContext'
import { CoordsProvider } from './contexts/CoordsContext'
import { AskDivProvider } from './contexts/AskDivContext'

function App() {



  return (
    <>
      <RestaurantsProvider>
        <SearchProvider>
          <SelectionProvider>
            <CoordsProvider>
              <AskDivProvider>
                <Map />
                <SearchZone />
                <Overlay />
                <AskCenter></AskCenter>
              </AskDivProvider>
            </CoordsProvider>
          </SelectionProvider>
        </SearchProvider>
      </RestaurantsProvider>
    </>
  )
}

export default App
