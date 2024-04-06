import React, { useState, useEffect } from 'react';
import { InsurancePolicy } from '../types/InsurancePolicy';



const InsurancePolicyTable: React.FC = () => {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);

  useEffect(() => {

    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/insurance-policy');
          if (response.ok) {
            const result = await response.json();
            setPolicies(result);
          } else {
            throw new Error('Data could not be fetched');
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
  
      fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Policy ID</th>
          <th>Policy Name</th>
          <th>Status</th>
          <th>Coverage Start Date</th>
          <th>Coverage End Date</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {policies.map(policy => (
          <tr key={policy.policyId}>
            <td>{policy.policyId}</td>
            <td>{policy.policyName}</td>
            <td>{policy.policyStatus}</td>
            <td>{policy.coverageStartDate}</td>
            <td>{policy.coverageEndDate}</td>
            <td>{policy.createdAt}</td>
            <td>{policy.updatedAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InsurancePolicyTable;
