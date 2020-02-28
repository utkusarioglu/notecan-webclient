import React, { lazy } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from './context/Auth';
import { PrivateRoute } from "./PrivateRoute";
import CssBaseline from "@material-ui/core/CssBaseline";

const Home = lazy(() => import("./components/Home"));
const Guest = lazy(() => import("./components/Guest"))



function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <Router>
        <React.Suspense fallback={<p>wait</p>}>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/guest" component={Guest} />
        </React.Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
