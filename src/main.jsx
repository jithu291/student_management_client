import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from './app/store.js';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
