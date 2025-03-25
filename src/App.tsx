import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";

import { queryClient } from "./api/api-query-client";
import { MapPage, NavBar as Navbar, StatisticsPage } from "./pages";
import { TodosPage } from "./pages/TodosPage";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/todos" element={<TodosPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
