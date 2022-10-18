import { useSelector } from "react-redux";

// Pages
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import MySchool from "./Pages/MySchool";
import Tagging from "./Pages/Tagging";
import SchoolDirectory from "./Pages/SchoolDirectory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalesInvoices from "./Pages/SalesInvoice";
import UpdateStocks from "./Pages/UpdateStocks";
import Opportunities from "./Pages/Opportunities";
import ManageSchool from "./Pages/ManageSchool";
import AdminLogin from "./Pages/AdminLogin";
import AdminHome from "./Pages/AdminHome";
import AdminSignUp from "./Pages/AdminSignUp";
import AdminAllUser from "./Pages/AdminAllUser";
import AdminState from "./Pages/AdminState";
import AdminCity from "./Pages/AdminCity";
import AdminCountry from "./Pages/AdminCountry";
import SchoolTagging from "./Pages/SchoolTagging";
import Schools from "./Pages/Schools";
import TagSchool from "./Pages/TagSchool";
import AddSchool from "./Pages/AddSchool";
import SchoolPunchIn from "./Pages/SchoolPunchIn";
import OrderProcessing from "./Pages/OrderProcessing";
import MyDocument from "./Components/PdfDocument";
import ManageOrder from "./Pages/ManageOrder";
import AOF from "./Pages/AOF";

function App() {
  const isAuth = useSelector((state) => state.auth.user);
  const MsAuth = useSelector((state) => state.auth.msAuth);

  // const isAuth = true
  // const Admin = useSelector((state) => state.auth.admin);
  const Admin = true;

  return (
    <div className=" font-Roboto bg-[#111322]">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={isAuth || MsAuth ? <Home /> : <Login />}
          />
          <Route path="/" element={isAuth || MsAuth ? <Home /> : <Login />} />
          <Route
            path="/mySchool"
            element={isAuth || MsAuth ? <MySchool /> : <Login />}
          />
          <Route
            path="/tagging"
            element={isAuth || MsAuth ? <Tagging /> : <Login />}
          />
          <Route
            path="/schoolDirectory"
            element={isAuth || MsAuth ? <SchoolDirectory /> : <Login />}
          />
          <Route
            path="/salesInvoices"
            element={isAuth || MsAuth ? <SalesInvoices /> : <Login />}
          />
          <Route
            path="/updateStocks"
            element={isAuth || MsAuth ? <UpdateStocks /> : <Login />}
          />
          <Route
            path="/opportunities"
            element={isAuth || MsAuth ? <Opportunities /> : <Login />}
          />
          <Route
            path="/manageSchool"
            element={isAuth || MsAuth ? <ManageSchool /> : <Login />}
          />
          <Route
            path="/school/tagging"
            element={isAuth || MsAuth ? <SchoolTagging /> : <Login />}
          />
          <Route
            path="/school/schools"
            element={isAuth || MsAuth ? <Schools /> : <Login />}
          />
          <Route
            path="/tagschool"
            element={isAuth || MsAuth ? <TagSchool /> : <Login />}
          />
          <Route
            path="/addschool"
            element={isAuth || MsAuth ? <AddSchool /> : <Login />}
          />

          <Route
            path="/school/punch_in"
            element={isAuth || MsAuth ? <SchoolPunchIn /> : <Login />}
          />
          <Route
            path="/order_processing"
            element={isAuth || MsAuth ? <OrderProcessing /> : <Login />}
          />
          <Route
            path="/manage_order"
            element={isAuth || MsAuth ? <ManageOrder /> : <Login />}
          />
          <Route
            path="/pdf_view"
            element={isAuth || MsAuth ? <MyDocument /> : <Login />}
          />
          <Route path="/aof" element={isAuth || MsAuth ? <AOF /> : <Login />} />

          {/* Admin */}

          <Route path="/admin/signIn" element={<AdminLogin />} />
          <Route
            path="/admin/home"
            element={Admin ? <AdminHome /> : <Login />}
          />
          <Route
            path="/admin/user/create/new"
            element={Admin ? <AdminSignUp /> : <Login />}
          />
          <Route
            path="/admin/all/user"
            element={Admin ? <AdminAllUser /> : <Login />}
          />
          <Route
            path="/admin/location/state"
            element={Admin ? <AdminState /> : <Login />}
          />
          <Route
            path="/admin/location/city"
            element={Admin ? <AdminCity /> : <Login />}
          />
          <Route
            path="/admin/location/country"
            element={Admin ? <AdminCountry /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
