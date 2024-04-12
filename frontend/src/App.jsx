
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import AppHeader from './components/header';
import Home from './components/home';

function App() {
  return (
      <div className='App'> 
        <header id= "header">
          <AppHeader/>
        </header>
        <Home/>
        <main>
          <Router>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/certifications" element={<CertPage />} />
            <Routes/>
            <Router/>
        </main>
      </div>
  );
}

export default App;
