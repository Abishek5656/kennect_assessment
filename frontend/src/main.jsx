
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {store} from "./store/store.js";
import { Provider } from "react-redux";
import {fetchPost} from "./store/slice/postSlice.js";

store.dispatch(fetchPost());

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <App />
  <ToastContainer />
</Provider>
)
