import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as vanDetailsLoader } from "./pages/Vans/VanDetail";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostLayout from "./pages/Host/HostLayout";
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans";
import HostVanDetail, {
  loader as hostVansDetailsLoader,
} from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import Error from "./components/Error";
import Login, { action as loginAction } from "./pages/Login";
import "../server";
import { requireAuth } from "./utils";

// prettier-ignore
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" action={loginAction} element={<Login />} />
        <Route path="vans" element={<Vans />} loader={vansLoader} />
        <Route path="vans/:id" element={<VanDetail />} loader={vanDetailsLoader} />
        <Route path="host" element={<HostLayout />} loader={requireAuth}  >
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="vans" element={<HostVans />} loader={hostVansLoader} />
          <Route path="vans/:id" element={<HostVanDetail />} loader={hostVansDetailsLoader} >
            <Route index element={<HostVanInfo />} />
            <Route path="pricing" element={<HostVanPricing />} />
            <Route path="photos" element={<HostVanPhotos />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>Page not found!</h1>} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
