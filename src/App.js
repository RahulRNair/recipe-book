
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Listing from "./Components/recipes/list";
import Details from "./Components/recipes/details";
import Category from "./Components/recipes/category";
import Header from "./Common/header";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" index element={<Category />} />
        <Route path="/category" index element={<Category />} />
        <Route path="category/:category_name" index element={<Listing />} />
        <Route path="category/:category_name/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
