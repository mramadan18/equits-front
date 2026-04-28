"use client";

import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Step4Form } from "../types";

interface ProjectFundingStepProps {
  form: Step4Form;
  setForm: React.Dispatch<React.SetStateAction<Step4Form>>;
}

export const ProjectFundingStep = ({
  form,
  setForm,
}: ProjectFundingStepProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Funding Stage"
          placeholder="Select"
          labelPlacement="outside"
          selectedKeys={form.fundingStage ? [form.fundingStage] : []}
          onSelectionChange={(selection) => {
            const value = Array.from(selection)[0];
            setForm((current) => ({
              ...current,
              fundingStage: typeof value === "string" ? value : "",
            }));
          }}
        >
          <SelectItem key="1">Stage 1</SelectItem>
        </Select>
        <Select
          label="Service Area"
          placeholder="Select"
          labelPlacement="outside"
          selectedKeys={form.serviceArea ? [form.serviceArea] : []}
          onSelectionChange={(selection) => {
            const value = Array.from(selection)[0];
            setForm((current) => ({
              ...current,
              serviceArea: typeof value === "string" ? value : "",
            }));
          }}
        >
          <SelectItem key="1">Area 1</SelectItem>
        </Select>
        <Input
          label="Funding Ask in USD"
          placeholder="Enter amount of funding you are currently seeking"
          labelPlacement="outside"
          type="number"
          value={form.fundingAsk}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              fundingAsk: event.target.value,
            }))
          }
        />
        <Input
          label="Equity Stake %"
          placeholder="Enter amount of equity stake."
          labelPlacement="outside"
          type="number"
          value={form.equityStake}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              equityStake: event.target.value,
            }))
          }
        />
      </div>

      <Textarea
        label="Use of Funds"
        placeholder="Briefly explain how you will use the investment."
        labelPlacement="outside"
        minRows={3}
        value={form.useOfFunds}
        onChange={(event) =>
          setForm((current) => ({ ...current, useOfFunds: event.target.value }))
        }
      />

      <Input
        label="Business Plan PDF URL (Optional)"
        placeholder="Paste a hosted PDF URL if you have one"
        labelPlacement="outside"
        variant="bordered"
        radius="sm"
        value={form.businessPlanUrl}
        onChange={(event) =>
          setForm((current) => ({
            ...current,
            businessPlanUrl: event.target.value,
          }))
        }
      />
    </div>
  );
};
