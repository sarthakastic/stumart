import "../styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Navbar from "../components/Navbar/Navbar";
import { store, persistor } from "../store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar />
        <Component {...pageProps} />;
      </PersistGate>
    </Provider>
  );
}
