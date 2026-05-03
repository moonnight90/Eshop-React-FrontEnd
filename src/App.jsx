import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
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
