import { useSelector } from "react-redux";

// Pages
import Login from "./Pages/Login";
import Home from "./Pages/Home";
// import MySchool from "./Pages/MySchool";
import Tagging from "./Pages/Tagging";
// import SchoolDirectory from "./Pages/SchoolDirectory";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import SalesInvoices from "./Pages/SalesInvoice";
// import UpdateStocks from "./Pages/UpdateStocks";
// import Opportunities from "./Pages/Opportunities";
import ManageSchool from "./Pages/ManageSchool";
// import AdminLogin from "./Pages/AdminLogin";
import AdminHome from "./Pages/AdminHome";
// import AdminSignUp from "./Pages/AdminSignUp";
// import AdminAllUser from "./Pages/AdminAllUser";
// import AdminState from "./Pages/AdminState";
// import AdminCity from "./Pages/AdminCity";
// import AdminCountry from "./Pages/AdminCountry";
import AddNewCity from "./Pages/AddNewCity";
import SchoolTagging from "./Pages/SchoolTagging";
import Schools from "./Pages/Schools";
import TagSchool from "./Pages/TagSchool";
import AddSchool from "./Pages/AddSchool";
import SchoolPunchIn from "./Pages/SchoolPunchIn";
import OrderProcessing from "./Pages/OrderProcessing";
// import MyDocument from "./Components/PdfDocument";
import ManageOrder from "./Pages/ManageOrder";
import AOF from "./Pages/AOF";
import KYS from "./Pages/KYS";
import ReleaseNote from "./Pages/ReleaseNote";
import V_1_0_0 from "./Pages/ReleaseNotes/V.1.0.0";
import UpdateSchool from "./Pages/UpdateSchool";
import Products from "./Pages/KYS/Product";
import AddProduct from "./Pages/KYS/AddProduct";
import Strength from "./Pages/KYS/Strength";
import AddStrength from "./Pages/KYS/AddStrength";
import UpdateFees from "./Pages/KYS/UpdateFees";
import Competition from "./Pages/KYS/Competition";
import AddCompetition from "./Pages/KYS/AddCompetition";
import AddWorkShop from "./Pages/KYS/AddWorkShop";
import Workshop from "./Pages/KYS/Workshop";
import PageNotFound from "./Pages/PageNotFound";
import Projection from "./Pages/Projection";
import Addprojection from "./Pages/Addprojection";
import Return from "./Pages/RETURN/Return";
import ReturnRequest from "./Pages/RETURN/RequestReturn";
import Invoice from "./Pages/Invoice";
import InvoiceItem from "./Pages/InvoiceItem";
import ManageSchoolTraining from "./Pages/ManageSchoolTraining";
import AddSchoolTraining from "./Pages/AddSchoolTraining";
import UpdateSchoolTraining from "./Pages/UpdateSchoolTraining";
import InvoiceTraining from "./Pages/InvoiceTraining";
import Inv from "./Pages/PDF/Inv";
import ViewPdf from "./Pages/ViewPdf";
import AddSchoolQuantity from "./Pages/AddSchoolQuantity";
import ClassklapDashboard from "./Pages/ClassklapDashboard";
import ClassklapManageSchool from "./Pages/ClassklapManageSchool";
import AddSchoolCK from "./Pages/AddSchoolCK";
import LocationTraining from "./Pages/LocationTraining";
import PrintPDF from "./Pages/PrintPDF";
import ViewInvoiceSingle from "./Pages/ViewInvoiceSingle";
import ViewInvoiceDouble from "./Pages/ViewInvoiceDouble";
import BulkInv from "./Pages/PDF/BulkInv";
import CustLedger from "./Pages/PDF/CustLedger";
import ClassklapSchool from "./Pages/ClassklapSchool";
import UpdateSchoolTrainingEU from "./Pages/UpdateSchoolTrainingEU";
import GatePass from "./Pages/PDF/GatePass";
import GatePassDashboard from "./Pages/GatePassDashboard";
import GatePassInvoice from "./Pages/GatePassInvoice";
import OrderTraining from "./Pages/OrderTraining";
import AofPdf from "./Pages/PDF/AofPdf";
import AofPdf2 from "./Pages/PDF/AofPdf2";
import AOFcreate from "./Pages/AOFcreate";
import ViewCustomerLedger from "./Pages/ViewCustomerLedger";
import AdminManageSchool from "./Pages/AdminManageSchool";
import AdminAddSchool from "./Pages/AdminAddSchool";
import AdminTagging from "./Pages/AdminTagging";
import AdminUploadInvoice from "./Pages/AdminUploadInvoice";
import ZsmAOF from "./Pages/ZsmAof";
import AdminInvoice from "./Pages/AdminInvoice";
import AdminInvoiceItem from "./Pages/AdminInvoiceItem";
import AdminAddSchoolQuantity from "./Pages/AdminAddSchoolQuantity";
import FinanceAOF from "./Pages/FinanceAOF";
import SalesheadAOF from "./Pages/SalesheadAOF";
import AOFEdit from "./Pages/AOFEdit";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AofPdf3temp from "./Pages/PDF/AofPdf3temp";
import AofPdf4 from "./Pages/PDF/AofPdf4";
import ThankYou from "./Pages/ThankYou";

import HrHome from "./Pages/HR/HrHome";
import User from "./Pages/HR/User";
import PhoneGroup from "./Pages/HR/PhoneGroup";
import AdminCkReport from "./Pages/AdminCkReport";
import CreditNote from "./Pages/PDF/CreditNote";
import CreditSinglePdf from "./Pages/CreditSinglePdf";
import SalesToCash from "./Pages/SalesToCash";
import SendMessage from "./Pages/HR/SendMessage";
import ReactGA from "react-ga4";
// import usePageView from "./Components/customHooks/usePageView";

function App() {
  const [userCache, setUserCache] = useState(false);
  const [adminCache, setAdminCache] = useState(false);

  const isAuth = useSelector((state) => state.auth.user);
  const MsAuth = useSelector((state) => state.auth.msAuth);

  // const isAuth = true
  const Admin = useSelector((state) => state.auth.admin);
  // const Admin = true;
  const Zsm = useSelector((state) => state.auth.zsm);
  const Finance = useSelector((state) => state.auth.finance);
  const Saleshead = useSelector((state) => state.auth.saleshead);
  const Training = useSelector((state) => state.auth.training);
  const HR = useSelector((state) => state.auth.HR);
  const Gtepas = useSelector((state) => state.auth.gatepass);
  useEffect(() => {
    ReactGA.initialize("G-WWFF5R3TB6");
  }, []);

  return (
    <div>
      <div>
        {/* {console.log(Saleshead)} */}
        {/* {console.log(MsAuth)} */}
        {/* {console.log(Admin)} */}
        {/* {console.log(HR)} */}
        <div className="!font-Roboto bg-[#111322]">
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={isAuth || MsAuth ? <Home /> : <Login />}
              />
              <Route
                path="/"
                element={
                  isAuth || MsAuth || Admin || Zsm ? <Home /> : <Login />
                }
              />
              {/* <Route
            path="/mySchool"
            element={isAuth || MsAuth ? <MySchool /> : <Login />}
          /> */}
              <Route
                path="/tagging"
                element={isAuth || MsAuth || Zsm ? <Tagging /> : <Login />}
              />
              {/* <Route
            path="/schoolDirectory"
            element={isAuth || MsAuth ? <SchoolDirectory /> : <Login />}
          /> */}
              {/* <Route
            path="/salesInvoices"
            element={isAuth || MsAuth ? <SalesInvoices /> : <Login />}
          /> */}
              {/* <Route
            path="/updateStocks"
            element={isAuth || MsAuth ? <UpdateStocks /> : <Login />}
          /> */}
              {/* <Route
            path="/opportunities"
            element={isAuth || MsAuth ? <Opportunities /> : <Login />}
          /> */}
              <Route
                path="/manageSchool"
                element={isAuth || MsAuth || Zsm ? <ManageSchool /> : <Login />}
              />
              <Route
                path="/manageSchoolTraining"
                element={
                  isAuth || MsAuth || Training ? (
                    <ManageSchoolTraining />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/school/tagging"
                element={
                  isAuth || MsAuth || Zsm ? <SchoolTagging /> : <Login />
                }
              />
              <Route
                path="/school/schools"
                element={isAuth || MsAuth || Zsm ? <Schools /> : <Login />}
              />
              <Route
                path="/tagschool"
                element={isAuth || MsAuth || Zsm ? <TagSchool /> : <Login />}
              />
              <Route
                path="/addschool"
                element={isAuth || MsAuth || Zsm ? <AddSchool /> : <Login />}
              />
              <Route
                path="/addschooltraining"
                element={MsAuth || Training ? <AddSchoolTraining /> : <Login />}
              />

              <Route
                path="/update_school/:id"
                element={isAuth || MsAuth || Zsm ? <UpdateSchool /> : <Login />}
              />

              <Route
                path="/update_school_training/:id/:scode"
                element={
                  MsAuth || Training || Zsm ? (
                    <UpdateSchoolTraining />
                  ) : (
                    <Login />
                  )
                }
              />

              <Route
                path="/update_school_training_eu/:scid/:stid/:scode"
                element={
                  MsAuth || Training ? <UpdateSchoolTrainingEU /> : <Login />
                }
              />

              <Route
                path="/school/punch_in"
                element={
                  isAuth || MsAuth || Zsm ? <SchoolPunchIn /> : <Login />
                }
              />
              <Route
                path="/order_processing"
                element={
                  isAuth || MsAuth || Zsm ? <OrderProcessing /> : <Login />
                }
              />
              <Route
                path="/manage_order"
                element={isAuth || MsAuth || Zsm ? <ManageOrder /> : <Login />}
              />
              <Route
                path="/projection"
                element={isAuth || MsAuth || Zsm ? <Projection /> : <Login />}
              />
              <Route
                path="/addprojection"
                element={
                  isAuth || MsAuth || Zsm ? <Addprojection /> : <Login />
                }
              />

              {/* <Route
            path="/pdf_view"
            element={isAuth || MsAuth ? <MyDocument /> : <Login />}
          /> */}
              <Route
                path="/aof"
                element={isAuth || MsAuth || Zsm ? <AOF /> : <Login />}
              />
              {/* kys */}
              <Route
                path="/kys"
                element={isAuth || MsAuth || Zsm ? <KYS /> : <Login />}
              />
              <Route
                path="/kys/products/:id"
                element={isAuth || MsAuth || Zsm ? <Products /> : <Login />}
              />
              <Route
                path="/kys/products/add_product/:id"
                element={isAuth || MsAuth || Zsm ? <AddProduct /> : <Login />}
              />
              <Route
                path="/kys/strength/:id"
                element={isAuth || MsAuth || Zsm ? <Strength /> : <Login />}
              />
              <Route
                path="/kys/strength/add_strength/:id"
                element={isAuth || MsAuth || Zsm ? <AddStrength /> : <Login />}
              />
              <Route
                path="/kys/tution_fees/:id"
                element={isAuth || MsAuth || Zsm ? <UpdateFees /> : <Login />}
              />
              <Route
                path="/kys/add_competition/:id"
                element={
                  isAuth || MsAuth || Zsm ? <AddCompetition /> : <Login />
                }
              />
              <Route
                path="/kys/competition/:id"
                element={isAuth || MsAuth || Zsm ? <Competition /> : <Login />}
              />
              <Route
                path="/kys/workshop/:id"
                element={isAuth || MsAuth || Zsm ? <Workshop /> : <Login />}
              />
              <Route
                path="/kys/add_workshop/:id"
                element={isAuth || MsAuth || Zsm ? <AddWorkShop /> : <Login />}
              />

              <Route
                path="/web-release-notes"
                element={isAuth || MsAuth || Zsm ? <ReleaseNote /> : <Login />}
              />
              {/* release notes */}

              <Route
                path="/web-release-notes/v_1_0_0"
                element={isAuth || MsAuth || Zsm ? <V_1_0_0 /> : <Login />}
              />

              <Route
                path="/return"
                element={isAuth || MsAuth || Zsm ? <Return /> : <Login />}
              />

              <Route
                path="/return_request"
                element={
                  isAuth || MsAuth || Zsm ? <ReturnRequest /> : <Login />
                }
              />

              <Route
                path="/invoice"
                element={isAuth || MsAuth || Zsm ? <Invoice /> : <Login />}
              />

              <Route
                path="/invoice_item/:invoiceid"
                // path="/invoice_item/"
                element={isAuth || MsAuth || Zsm ? <InvoiceItem /> : <Login />}
              />
              <Route
                path="/addschoolquantity/:invoiceid"
                element={
                  isAuth || MsAuth || Zsm ? <AddSchoolQuantity /> : <Login />
                }
              />

              <Route
                path="/invoice_training"
                element={MsAuth || Training ? <InvoiceTraining /> : <Login />}
              />

              <Route
                path="/order_training"
                element={MsAuth || Training ? <OrderTraining /> : <Login />}
              />

              {/* <Route path="/invoice_pdf" element={<Inv />} /> */}

              <Route path="/view_pdf/:docnum/:docdate" element={<ViewPdf />} />
              <Route path="/salesToCash" element={<SalesToCash />} />

              <Route path="/view_aof_pdf/:aofid" element={<AofPdf3temp />} />
              <Route path="/view_aof_pdf2/:aofid" element={<AofPdf2 />} />
              <Route path="/zsm/view_aof_pdf2/:aofid" element={<AofPdf2 />} />
              <Route
                path="/credit_note_pdf/:docNum/:docdate"
                element={<CreditNote />}
              />
              <Route
                path="/saleshead/view_aof_pdf2/:aofid"
                element={<AofPdf2 />}
              />
              <Route
                path="/finance/view_aof_pdf2/:aofid"
                element={<AofPdf2 />}
              />
              <Route path="/customer/aof/verify/:aofid" element={<AofPdf4 />} />

              <Route path="/thankyou" element={<ThankYou />} />

              <Route
                path="/bulkinv_pdf/:bp/:todate/:fromdate"
                element={<BulkInv />}
              />

              <Route
                path="/ck_dashboard"
                element={isAuth || MsAuth ? <ClassklapDashboard /> : <Login />}
              />

              <Route
                path="/ck_manageSchool"
                element={
                  isAuth || MsAuth ? <ClassklapManageSchool /> : <Login />
                }
              />

              <Route
                path="/addschoolck"
                element={isAuth || MsAuth ? <AddSchoolCK /> : <Login />}
              />

              <Route
                path="/locationTraining"
                element={MsAuth || Training ? <LocationTraining /> : <Login />}
              />

              <Route
                path="/print_pdf"
                element={isAuth || MsAuth || Zsm ? <PrintPDF /> : <Login />}
              />

              <Route
                path="/invoice_pdf_single"
                element={
                  isAuth || MsAuth || Zsm ? <ViewInvoiceSingle /> : <Login />
                }
              />
              <Route
                path="/credit/invoice_pdf_single"
                element={
                  isAuth || MsAuth || Zsm ? <CreditSinglePdf /> : <Login />
                }
              />

              <Route
                path="/invoice_pdf_double"
                element={
                  isAuth || MsAuth || Zsm ? <ViewInvoiceDouble /> : <Login />
                }
              />

              <Route
                path="/customer_pdf"
                element={
                  isAuth || MsAuth || Zsm ? <ViewCustomerLedger /> : <Login />
                }
              />

              <Route
                path="/cust_ledger/:bp/:todate/:fromdate"
                element={<CustLedger />}
              />

              <Route path="/gate_pass_pdf/:id" element={<GatePass />} />

              <Route
                path="/add_new_city"
                element={MsAuth || Training ? <AddNewCity /> : <Login />}
              />

              <Route
                path="/ck_school_training"
                element={MsAuth || Training ? <ClassklapSchool /> : <Login />}
              />

              <Route
                path="/gatepass_dashboard"
                element={Gtepas || MsAuth ? <GatePassDashboard /> : <Login />}
                // element={<GatePassDashboard />}
              />

              <Route
                path="/gatepass_invoice"
                element={Gtepas || MsAuth ? <GatePassInvoice /> : <Login />}
              />

              <Route
                path="/aof_create"
                element={isAuth || MsAuth || Zsm ? <AOFcreate /> : <Login />}
              />

              <Route
                path="/aof_edit/:aofid"
                element={isAuth || MsAuth || Zsm ? <AOFEdit /> : <Login />}
              />

              {/* Admin */}

              {/* <Route path="/admin/signIn" element={<AdminLogin />} /> */}

              <Route
                path="/admin/home"
                element={Admin || MsAuth ? <AdminHome /> : <Login />}
                // element={<AdminHome />}
              />

              <Route
                path="/admin/manageschool"
                element={Admin || MsAuth ? <AdminManageSchool /> : <Login />}
                // element={<AdminManageSchool />}
              />

              <Route
                path="/admin/uploadinvoice"
                element={Admin || MsAuth ? <AdminUploadInvoice /> : <Login />}
                // element={<AdminManageSchool />}
              />

              <Route
                path="/admin/addschool"
                element={Admin || MsAuth ? <AdminAddSchool /> : <Login />}
                // element={<AdminAddSchool />}
              />
              <Route
                path="/admin/invoice"
                element={Admin || MsAuth ? <AdminInvoice /> : <Login />}
                // element={<AdminInvoice />}
              />
              <Route
                path="/admin/ckreport"
                element={Admin || MsAuth ? <AdminCkReport /> : <Login />}
                // element={<AdminInvoice />}
              />
              <Route
                path="/admin/invoice_item/:invoiceid"
                // element={Admin ? <AdminInvoiceItem /> : <Login />}
                element={<AdminInvoiceItem />}
              />

              <Route
                path="/admin/addschoolquantity/:invoiceid"
                // element={Admin ? <AdminAddSchoolQuantity /> : <Login />}
                element={<AdminAddSchoolQuantity />}
              />

              <Route
                path="/zsm/verify_aof"
                element={Zsm || MsAuth ? <ZsmAOF /> : <Login />}
                // element={<ZsmAOF />}
              />

              <Route
                path="/finance/aof"
                element={Finance || MsAuth ? <FinanceAOF /> : <Login />}
                // element={<FinanceAOF />}
              />

              <Route
                path="/saleshead/aof"
                element={Saleshead || MsAuth ? <SalesheadAOF /> : <Login />}
                // element={<SalesheadAOF />}
              />
              <Route
                path="/hr/home"
                element={HR || MsAuth ? <HrHome /> : <Login />}
              />
              <Route
                path="/hr/user"
                element={HR || MsAuth ? <User /> : <Login />}
              />

              <Route
                path="/hr/phonegroup"
                element={HR || MsAuth ? <PhoneGroup /> : <Login />}
              />

              <Route
                path="/hr/sendmessage"
                element={HR || MsAuth ? <SendMessage /> : <Login />}
              />

              {/* <Route
                path="/admin/tagging"
                element={Admin ? <AdminHome /> : <Login />}
                // element={<AdminTagging />}
              /> */}

              {/* <Route
            path="/admin/user/create/new"
            element={Admin ? <AdminSignUp /> : <Login />}
          /> */}
              {/* <Route
            path="/admin/all/user"
            element={Admin ? <AdminAllUser /> : <Login />}
          /> */}
              {/* <Route
            path="/admin/location/state"
            element={Admin ? <AdminState /> : <Login />}
          /> */}
              {/* <Route
            path="/admin/location/city"
            element={Admin ? <AdminCity /> : <Login />}
          />
          <Route
            path="/admin/location/country"
            element={Admin ? <AdminCountry /> : <Login />}
          /> */}
              <Route path="*" element={isAuth ? <PageNotFound /> : <Login />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
