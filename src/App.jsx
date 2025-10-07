import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom"; //
import { Header, Footer } from "./components/index";
import  {store}  from './Store/Store'
import { Provider } from 'react-redux'



function App() {
  return (
    <Provider store={store}>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </Provider>
  )
}

export default App;
