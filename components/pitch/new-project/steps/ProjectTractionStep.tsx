"use client";

import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Step3Form } from "../types";

interface ProjectTractionStepProps {
  form: Step3Form;
  setForm: React.Dispatch<React.SetStateAction<Step3Form>>;
}

export const ProjectTractionStep = ({
  form,
  setForm,
}: ProjectTractionStepProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Current Traction"
          placeholder="Select"
          labelPlacement="outside"
          selectedKeys={form.currentTraction ? [form.currentTraction] : []}
          onSelectionChange={(selection) => {
            const value = Array.from(selection)[0];
            setForm((current) => ({
              ...current,
              currentTraction: typeof value === "string" ? value : "",
            }));
          }}
        >
          <SelectItem key="1">Traction 1</SelectItem>
        </Select>
        <Select
          label="Growth Rate (Optional)"
          placeholder="Select"
          labelPlacement="outside"
          selectedKeys={form.growthRate ? [form.growthRate] : []}
          onSelectionChange={(selection) => {
            const value = Array.from(selection)[0];
            setForm((current) => ({
              ...current,
              growthRate: typeof value === "string" ? value : "",
            }));
          }}
        >
          <SelectItem key="1">Growth 1</SelectItem>
        </Select>
        <Input
          label="Total Users (Optional)"
          placeholder="Enter Number of Total Users"
          labelPlacement="outside"
          type="number"
          value={form.totalUsers}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              totalUsers: event.target.value,
            }))
          }
        />
        <Input
          label="Daily Active Users - DAU (Optional)"
          placeholder="Enter Number of Daily Active Users."
          labelPlacement="outside"
          type="number"
          value={form.dailyActiveUsers}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              dailyActiveUsers: event.target.value,
            }))
          }
        />
        <Input
          label="Monthly Revenue - MRR (Optional)"
          placeholder="Total recurring revenue generated every month in USD"
          labelPlacement="outside"
          type="number"
          value={form.monthlyRevenue}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              monthlyRevenue: event.target.value,
            }))
          }
        />
        <Input
          label="Growth Rate % (Optional)"
          placeholder="How fast your use revenue is growing every month."
          labelPlacement="outside"
          type="number"
          value={form.growthRatePct}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              growthRatePct: event.target.value,
            }))
          }
        />
        <Input
          label="Retention Rate % (Optional)"
          placeholder="Percentage of users who keep using your product over time."
          labelPlacement="outside"
          type="number"
          value={form.retentionRate}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              retentionRate: event.target.value,
            }))
          }
        />
        <Input
          label="Conversion Rate % (Optional)"
          placeholder="Percentage of users who become paying customers."
          labelPlacement="outside"
          type="number"
          value={form.conversionRate}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              conversionRate: event.target.value,
            }))
          }
        />
      </div>
    </div>
  );
};
