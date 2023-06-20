import "./App.css";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ProfileForm from "./components/ProfileForm";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<RegisterForm />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/profile" element={<ProfileForm />} />
        
      </Routes>
    </div>
  );
}

export default App;
