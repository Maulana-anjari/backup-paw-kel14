import { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";
import CreateProposal from "../pages/ProposalPage/CreateProposal";
import ProposalView from "../pages/ProposalPage/ProposalView";

export const Home = lazy(() => import("../pages/app"));
export const AnggotaPage = lazy(() => import("../pages/anggota"));
export const TambahAnggota = lazy(() => import("../pages/anggota/tambah"));
export const DetailAnggota = lazy(() => import("../pages/anggota/detail"));
export const InventarisPage = lazy(() => import("../pages/inventaris"));
export const TambahInventaris = lazy(() =>
  import("../pages/inventaris/tambah")
);
export const DetailInventaris = lazy(() =>
  import("../pages/inventaris/detail")
);
export const PersuratanPage = lazy(() => import("../pages/persuratan"));
export const ProposalPage = lazy(() => import("../pages/ProposalPage/proposal"));
export const LPJPage = lazy(() => import("../pages/lpj/index"));
export const TambahLPJPage = lazy(() => import("../pages/lpj/tambah"));
export const DetailLPJPage = lazy(() => import("../pages/lpj/detail"));
export const LoginPage = lazy(() => import("../pages/login"));
export const Page404 = lazy(() => import("../pages/page-not-found"));

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to="/dashboard" replace />,
    },
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: "dashboard", element: <Home />, index: true },
        { path: "anggota", element: <AnggotaPage /> },
        { path: "anggota/:id", element: <AnggotaPage /> },
        { path: "inventaris", element: <InventarisPage /> },
        { path: "inventaris/:id", element: <DetailInventaris /> },
        { path: "inventaris/tambah", element: <TambahInventaris /> },
        { path: "persuratan", element: <PersuratanPage /> },
        { path: "persuratan/:id", element: <PersuratanPage /> },
        { path: "proposal", element: <ProposalPage /> },
        { path: "proposal/:id", element: <ProposalView /> },
        { path: "proposal/create", element: <CreateProposal /> },
        { path: "lpj", element: <LPJPage /> },
        { path: "lpj/:id", element: <DetailLPJPage /> },
        { path: "lpj/tambah", element: <TambahLPJPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
