import { useCallback, useEffect } from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import { logout } from "./store/authSlice";
import { useDispatch,useSelector } from "react-redux";
function App() {

  const verifyUser = useCallback(()=>{
    const user = useSelector((state)=> state.user)
    console.log(user)
    
  },[])
  
  useEffect(()=>{
    
  },[])

  return (
    <div className="w-[100%] xl:w-[100%] mx-auto">
      <Header />
        <main className=" min-h-[calc(100vh-128px)] py-4 px-1 bg-gray-100">
          <Outlet />
        </main>
      <Footer />
    </div>
  );
}

export default App;
