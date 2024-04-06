import React, { useState } from "react";
import { InsurancePolicy } from "../types/InsurancePolicy";
import InsurancePolicyForm from "./InsurancePolicyForm";
import UpdateInsurancePolicyForm from "./UpdateInsurancePolicyForm";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

type PolicyTableProps = {
  policies: InsurancePolicy[];
  onPolicyAdded: () => void;
};

const InsurancePolicyTable: React.FC<PolicyTableProps> = ({
  policies,
  onPolicyAdded,
}) => {
  const [addPolicy, setAddPolicy] = useState<boolean>(false);
  const [updatePolicyId, setUpdatePolicyId] = useState<number>(0);
  const [openUpdatePolicyForm, setOpenUpdatePolicyForm] = useState<boolean>(false);

  const toggleAddPolicy = () => setAddPolicy(!addPolicy);
  const toggleUpdatePolicyForm = () => setOpenUpdatePolicyForm(!openUpdatePolicyForm);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Policy ID</TableCell>
              <TableCell>Policy Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Coverage Start Date</TableCell>
              <TableCell>Coverage End Date</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policies.map((policy) => (
              <TableRow
                key={policy.policyId}
                hover
                onClick={() => {
                  setUpdatePolicyId(policy.policyId);
                  setOpenUpdatePolicyForm(true);
                }}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{policy.policyId}</TableCell>
                <TableCell>{policy.policyName}</TableCell>
                <TableCell>{policy.policyStatus}</TableCell>
                <TableCell>{policy.coverageStartDate}</TableCell>
                <TableCell>{policy.coverageEndDate}</TableCell>
                <TableCell>{policy.createdAt}</TableCell>
                <TableCell>{policy.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        !addPolicy && <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 16 }}
        onClick={toggleAddPolicy}
      >
        Add Policy
      </Button>
      }
      

      {addPolicy && <InsurancePolicyForm onPolicyAdded={onPolicyAdded} toggleAddPolicy={toggleAddPolicy} />}

      {openUpdatePolicyForm && (
        <UpdateInsurancePolicyForm
          onPolicyAdded={onPolicyAdded}
          updatePolicy={policies.find(
            (policy) => policy.policyId === updatePolicyId
          )}
          setOpenUpdatePolicyForm={toggleUpdatePolicyForm}
        />
      )}
    </div>
  );
};

export default InsurancePolicyTable;
