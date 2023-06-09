import Layout from "@root/components/Layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/projects");
  });

  return (
    <Layout>
      <div>Welcome to home page</div>
    </Layout>
  );
}
