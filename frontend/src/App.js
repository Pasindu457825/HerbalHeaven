import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { SidebarWithBurgerMenu } from './components/navBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/DashBoard';
import { EcommerceCard } from './pages/Products';
import Cart from './pages/cart';
import CreatPost from './pages_Pasindu/CreateEmployee';
import EditPost from './pages_Pasindu/EditEmployee';
import Posts from './pages_Pasindu/Employee';
import PostDetails from './pages_Pasindu/EmployeeDetails';
import 'react-toastify/dist/ReactToastify.css';
import Payment from './pages-Kumesh/Payment';
import CreateUser from './pages_kavindu/CreateUser';
import UpdateUser from './pages_kavindu/UpdateUser';
import User from './pages_kavindu/User';
import AdminDashboard from './pages/adminDashboard';
import SalaryReport from './pages_Pasindu/SalaryReport';
import './index.css';
import ManagerLogin from './pages/Manager-Login';

function App() {
  return (
    <>
      <Routes>
        {/* Kavishka */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/signUp" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<EcommerceCard />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path="//admin-dashboard" element={<AdminDashboard />} />

        {/* Pasindu */}
        <Route path="/emp/add" element={<CreatPost />} />
        <Route path="/emp/edit/:id" element={<EditPost />} />
        <Route path="/emp/:id" element={<PostDetails />} />
        <Route path="/emp" element={<Posts />} />
        <Route path="/salaryreport" element={<SalaryReport />} />

        <Route path="/user/payment" element={<Payment />} />

        <Route path="/emp/add" element={<CreateUser />} />
        <Route path="/emp/update/:id" element={<UpdateUser />} />
        <Route path="/emp" element={<User />} />
        <Route path="/salaryreport/:id" element={<SalaryReport />} />

        <Route path="/sup/addsup" element={<CreateUser />} />
        <Route path="/sup/update/:id" element={<UpdateUser />} />
        <Route path="/sup" element={<User />} />

        
      </Routes>
    </>
  );
}

export default App;
