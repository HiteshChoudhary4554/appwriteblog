import React, { useEffect } from "react";
import { Header, Footer, Container } from "./Index/index";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchTodo } from "./Store/todoSlice";

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.authStatus);
  useEffect(() => {
    async function fetch() {
      dispatch(fetchTodo());
    }
    fetch();
  }, [authStatus, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
