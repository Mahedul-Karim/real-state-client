import "./App.css";
import router from "./components/routes/routes";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextProvider from "./components/context/context";

function App() {
  const queryClient = new QueryClient();

  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </ContextProvider>
  );
}

export default App;
