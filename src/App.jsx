import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./shared/components/Layout.jsx";
import ItemsPage from "./features/items/pages/ItemsPage.jsx";

export default function App() {
  return (
    <Layout>
      <ItemsPage />
      <ToastContainer position="top-right" autoClose={4000} />
    </Layout>
  );
}