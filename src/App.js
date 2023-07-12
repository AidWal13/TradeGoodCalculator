import Interface from "./components/interface.component.js";
import { selectedContext } from "./data/selectedContext";
import Header from "./components/header.component";

import "./styles.css";

/*export default function App() {
  return (
      <selectedContext.Provider value={selectedContext}>
        <Interface />
      </selectedContext.Provider>
  );
}*/

export default function App() {
  return (
        <Interface />
  );
}
