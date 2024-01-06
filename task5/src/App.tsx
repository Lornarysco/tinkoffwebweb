import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { MovieCreateForm } from "./components/MovieCreateForm/MovieCreateForm";
import { MovieDetails } from "./components/MovieDetails/MovieDetails";
import { MovieEditForm } from "./components/MovieEditForm/MovieEditForm";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/movies" element={<Main />}>
          <Route path=":id" element={<MovieDetails />} />
          <Route path=":id/edit" element={<MovieEditForm />} />
          <Route path="create" element={<MovieCreateForm />} />
        </Route>
        <Route path="*" element={<Navigate to="/movies" replace />} />
      </Routes>
    </div>
  );
}

export default App;
