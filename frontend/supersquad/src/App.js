import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreatorLogin from "./screens/creator/login/CreatorLogin";
import CreatorSignup from "./screens/creator/login/CreatorSignup";
import TripHome from "./screens/creator/triphome/TripHome";
// import Home from "./screens/Home";
import CreatorHome from "./screens/creator/home/CreatorHome";
import PrivateRoutes from "./ProtectedRoutes";
import RedirectionRoutes from "./RedirectionRoutes";

import "./App.css";
import Checkout from "./screens/Checkout";
import HomeCreator from "./screens/home_creator/HomeCreator";
import Confirmation from "./screens/Confirmation";
import TripPage from "./screens/trip_page/TripPage";
import TripPage1 from "./screens/trip_page/TripPage1";
import TripPageCheckout from "./screens/trip_page/TripPageCheckout";
import TripPageCheckout1 from "./screens/trip_page/TripPageCheckout1";
import TripPageCheckout2 from "./screens/trip_page/TripPageCheckout2";
import TripPage2 from "./screens/trip_page/TripPage2";
import TnC from "./screens/TnC";
import TripPageV2 from "./screens/trip_page/TripPageV2";
import TripPageCheckoutV2 from "./screens/trip_page/TripPageCheckoutV2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeCreator />} />
        <Route path="/privacy-policy" element={<TnC />} />
        <Route path="/noharika/pages-and-peaks" element={<TripPage />} />
        <Route
          path="/noharika/pages-and-peaks/checkout"
          element={<TripPageCheckout />}
        />
        <Route path="/aditya/purrfect-escape" element={<TripPage1 />} />
        <Route
          path="/aditya/purrfect-escape/checkout"
          element={<TripPageCheckout1 />}
        />
        <Route
          path="/manali-with-manmeet-parneet-karan"
          element={<TripPage2 />}
        />
        <Route
          path="/manali-with-manmeet-parneet-karan/checkout"
          element={<TripPageCheckout2 />}
        />
        <Route path="/:hostname/:id" element={<TripPageV2 />} />
        <Route
          path="/:hostname/:id/checkout"
          element={<TripPageCheckoutV2 />}
        />

        {/* <Route path="/" element={<Home />} /> */}
        <Route element={<RedirectionRoutes />}>
          <Route path="creator/login" element={<CreatorLogin />} />
          <Route path="creator/signup" element={<CreatorSignup />} />
        </Route>
        <Route path="prabir/:slug" element={<TripHome />} />
        <Route path="prabir/:slug/checkout" element={<Checkout />} />
        <Route
          path="prabir/:slug/checkout/confirmation"
          element={<Confirmation />}
        />
        <Route element={<PrivateRoutes />}>
          <Route path="creator/home" element={<CreatorHome />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
