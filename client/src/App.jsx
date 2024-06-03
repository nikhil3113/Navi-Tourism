import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import City from "./pages/City/City";
import Location from "./pages/Location/Location";
import AddCity from "./pages/City/AddCity";
import UpdateCity from "./pages/City/UpdateCity";
import LocationDetail from "./pages/Location/LocationDetail";
import AdminLogin from "./pages/AdminLogin";
import UpdateLocation from "./pages/Location/UpdateLocation";
import AddLocation from "./pages/Location/AddLocation";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city" element={<City />} />
        <Route path="/city/add" element={<AddCity />} />
        <Route path="/city/update/:id" element={<UpdateCity />} />

        <Route path="/location/:id" element={<Location />} />
        <Route path="/locationDetail/:id" element={<LocationDetail />} />
        <Route path="/location/update/:id" element={<UpdateLocation />} />
        <Route path="/location/add/:id" element={<AddLocation />} />




        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </>
  );
};

export default App;
