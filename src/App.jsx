import React from "react";
import { Header, Footer, Container } from "./Index/index";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return(
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App;
