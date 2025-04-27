import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FlowProvider } from "@onflow/kit";
import flowJSON from "./flow.json";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FlowProvider
      config={{
        accessNodeUrl: "https://rest-testnet.onflow.org",
        flowNetwork: "emulator",
        discoveryWallet: "https://fcl-discovery.onflow.org/testnet/authn",
      }}
      flowJson={flowJSON}
    >
      <App />
    </FlowProvider>
  </StrictMode>
);
