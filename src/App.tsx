import { useEffect, useState } from "react";
import "./App.css";
import InsurancePolicyTable from "./components/InsurancePolicyTable";
import { InsurancePolicy } from "./types/InsurancePolicy";
import InsurancePolicyForm from "./components/InsurancePolicyForm";

function App() {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);

  const fetchPolicies = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/insurance-policy"
      );
      if (response.ok) {
        const result = await response.json();
        setPolicies(result);
      } else {
        throw new Error("Data could not be fetched");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <InsurancePolicyTable policies={policies.sort((a,b)=>{return a.policyId - b.policyId })} onPolicyAdded={fetchPolicies} />
    </div>
  );
}

export default App;
