import { Button } from '@mui/material';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type PolicyFormProps = {
  onPolicyAdded: () => void;
  toggleAddPolicy: () => void 
};

const InsurancePolicyForm: React.FC<PolicyFormProps> = ({ onPolicyAdded, toggleAddPolicy }) => {
  const [policyName, setPolicyName] = useState('');
  const [policyStatus, setPolicyStatus] = useState('');
  const [coverageStartDate, setCoverageStartDate] = useState<Date | null>(new Date());
  const [coverageEndDate, setCoverageEndDate] = useState<Date | null>(new Date());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPolicy = {
      policyName,
      policyStatus,
      coverageStartDate: coverageStartDate?.toISOString(),
      coverageEndDate: coverageEndDate?.toISOString(),
    };

    try {
      const response = await fetch('http://localhost:8080/api/insurance-policy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPolicy),
      });

      if (response.ok) {
        onPolicyAdded(); // Refresh the policy list
        setPolicyName(''); // Reset form
        setPolicyStatus('');
      } else {
        // Handle server errors or invalid responses
        console.error('Failed to create policy');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Policy Name:
          <input
            type="text"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Policy Status:
          <select value={policyStatus} onChange={(e) => setPolicyStatus(e.target.value)} required>
            <option value="">Select Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Coverage Start Date:
          <DatePicker
            selected={coverageStartDate}
            onChange={(date: Date) => setCoverageStartDate(date)}
            dateFormat="yyyy-MM-dd"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
          />
        </label>
      </div>
      <div>
        <label>
          Coverage End Date:
          <DatePicker
            selected={coverageEndDate}
            onChange={(date: Date) => setCoverageEndDate(date)}
            dateFormat="yyyy-MM-dd"
            minDate={coverageStartDate}
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
          />
        </label>
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 16 }}
        type="submit"
      >
        Add Policy
      </Button>

      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: 16 }}
        onClick={()=>toggleAddPolicy()}
      >
        Cancel
      </Button>
    </form>
  );
};

export default InsurancePolicyForm;
