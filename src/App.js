import React from "react";
import Container from "./components/Container";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from "./contexts/AuthContext";
import { BookingsProvider } from "./contexts/BookingsContext";
import { FloorsProvider } from "./contexts/FloorsContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <BookingsProvider>
          <FloorsProvider>
          <Container />
        </FloorsProvider>
      </BookingsProvider>
    </AuthProvider>
    </div >
  );
}

export default App;
