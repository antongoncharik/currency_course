import React from 'react';
import './App.css';
import MainApp from "./components/MainApp/MainApp";
import {Provider} from "react-redux";
import {store} from "./redux/store";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <MainApp/>
            </Provider>
        </div>
    );
}

export default App;
