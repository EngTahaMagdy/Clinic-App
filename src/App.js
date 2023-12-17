import { Suspense, lazy } from "react";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalLayout from "./layouts/DashboardLayout";
import AllRoute from "./routes";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useGlobalState } from "./context/global";

function App() {
  const { isAuth } = useGlobalState();

  const Login = lazy(() => import("./modules/Auth/login"));
  const Signup= lazy(() => import("./modules/Auth/signup"))

  return (
    <div className="App">
      <ReactNotifications />

      <ErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<div>Loading ...</div>}>
            {isAuth ? (
              <GlobalLayout>{AllRoute}</GlobalLayout>
            ) : (
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />

              </Routes>
            )}
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
