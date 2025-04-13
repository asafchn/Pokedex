import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cache = createCache({
  key: "css",
  prepend: true,
});
createRoot(document.getElementById("root")!).render(
  <CacheProvider value={cache}>
    <Provider store={store}>
      <App />
    </Provider>
  </CacheProvider>
);
