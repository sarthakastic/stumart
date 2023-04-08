import "@/styles/globals.css";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { applyMiddleware, compose } from "redux";
import type { AppProps } from "next/app";
import thunk from "redux-thunk";

import reducers from "@/reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}
