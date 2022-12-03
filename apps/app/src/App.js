/* eslint-disable no-unused-vars */
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import AdminView from './pages/admin-view';
import ReporterView from './pages/reporter-view';
import { useState, useEffect, createContext } from 'react';
import ViewReport from './pages/view-report';
import LoadingOverlay from './components/loadingoverlay'
export const LoadingContext = createContext()

function App() {
  const [IsAuthenticated, setIsAuthenticated] = useState(null);
  const [LoginToken, setLoginToken] = useState()
  const [Loadingstate, setLoadingstate] = useState(false)
  useEffect(() => {
    if (localStorage.getItem("loginToken") !== null) {
      setIsAuthenticated(true);
    }
    else {
      setIsAuthenticated(false)
    }
  }, []);

  useEffect(() => {
    const currentToken = localStorage.getItem("loginToken")
    setLoginToken(currentToken);
  }, [IsAuthenticated])

  return (
    <LoadingContext.Provider value={[Loadingstate, setLoadingstate]}>
      {
        Loadingstate && <LoadingOverlay></LoadingOverlay>
      }
    <Routes>
      <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} IsAuthenticated={IsAuthenticated} />}></Route>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} IsAuthenticated={IsAuthenticated} />}></Route>
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminView LoginToken={LoginToken} setIsAuthenticated={setIsAuthenticated} IsAuthenticated={IsAuthenticated} setLoginToken={setLoginToken}/>} />
      <Route path="/report" element={<ReporterView />} />
      <Route path="/view-report/:id" element={<ViewReport LoginToken={LoginToken} IsAuthenticated={IsAuthenticated}/>} />
      <Route path="/report/:id" element={<ReporterView/>} />
    </Routes>
    </LoadingContext.Provider>
  );
}

export default App;
