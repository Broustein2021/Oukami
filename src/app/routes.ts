import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import AgentDashboard from "./pages/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import DemandePhase from "./pages/souscription/DemandePhase";
import QualificationPhase from "./pages/souscription/QualificationPhase";
import PropositionPhase from "./pages/souscription/PropositionPhase";
import ValidationPhase from "./pages/souscription/ValidationPhase";
import PaiementPhase from "./pages/souscription/PaiementPhase";
import ConfirmationPhase from "./pages/souscription/ConfirmationPhase";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/agent",
    Component: AgentDashboard,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/client",
    Component: ClientDashboard,
  },
  {
    path: "/souscription/demande",
    Component: DemandePhase,
  },
  {
    path: "/souscription/qualification",
    Component: QualificationPhase,
  },
  {
    path: "/souscription/proposition",
    Component: PropositionPhase,
  },
  {
    path: "/souscription/validation",
    Component: ValidationPhase,
  },
  {
    path: "/souscription/paiement",
    Component: PaiementPhase,
  },
  {
    path: "/souscription/confirmation",
    Component: ConfirmationPhase,
  },
]);
