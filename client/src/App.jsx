import { EthProvider } from "./contexts/EthContext";
import Web3stuff from "./components/Web3stuff";
import Footer from "./components/Footer";
import Logo from "./components/Web3stuff/Logo";

import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Web3stuff />
          <Footer />
          <Logo />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;