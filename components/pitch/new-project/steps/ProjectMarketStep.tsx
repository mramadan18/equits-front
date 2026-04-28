"use client";

import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Step2Form } from "../types";

interface ProjectMarketStepProps {
  form: Step2Form;
  setForm: React.Dispatch<React.SetStateAction<Step2Form>>;
}

export const ProjectMarketStep = ({
  form,
  setForm,
}: ProjectMarketStepProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Industry"
          placeholder="Select"
          labelPlacement="outside"
          selectedKeys={form.industryId ? [form.industryId] : []}
          onSelectionChange={(selection) => {
            const value = Array.from(selection)[0];
            setForm((current) => ({
              ...current,
              industryId: typeof value === "string" ? value : "",
            }));
          }}
        >
          <SelectItem key="1">Industry 1</SelectItem>
        </Select>
        <Select
          label="Sub-Industry"
          placeholder="Select"
          labelPlacement="outside"
          selectedKeys={form.subIndustryId ? [form.subIndustryId] : []}
          onSelectionChange={(selection) => {
            const value = Array.from(selection)[0];
            setForm((current) => ({
              ...current,
              subIndustryId: typeof value === "string" ? value : "",
            }));
          }}
        >
          <SelectItem key="1">Sub-Industry 1</SelectItem>
        </Select>
        <Select
          label="Project Type"
          placeholder="Select"
          labelPlacement="outside"
          selectedKeys={form.projectType ? [form.projectType] : []}
          onSelectionChange={(selection) => {
            const value = Array.from(selection)[0];
            setForm((current) => ({
              ...current,
              projectType: typeof value === "string" ? value : "",
            }));
          }}
        >
          <SelectItem key="1">Project Type 1</SelectItem>
        </Select>
        <Select
          label="Stage"
          placeholder="Select"
          labelPlacement="outside"
          selectedKeys={form.stage ? [form.stage] : []}
          onSelectionChange={(selection) => {
            const value = Array.from(selection)[0];
            setForm((current) => ({
              ...current,
              stage: typeof value === "string" ? value : "",
            }));
          }}
        >
          <SelectItem key="1">Stage 1</SelectItem>
        </Select>
        <Select
          label="Revenue Model"
          placeholder="Select"
          labelPlacement="outside"
          selectedKeys={form.revenueModel ? [form.revenueModel] : []}
          onSelectionChange={(selection) => {
            const value = Array.from(selection)[0];
            setForm((current) => ({
              ...current,
              revenueModel: typeof value === "string" ? value : "",
            }));
          }}
        >
          <SelectItem key="1">Model 1</SelectItem>
        </Select>
        <Select
          label="Market Focus"
          placeholder="Select"
          labelPlacement="outside"
          selectedKeys={form.marketFocus ? [form.marketFocus] : []}
          onSelectionChange={(selection) => {
            const value = Array.from(selection)[0];
            setForm((current) => ({
              ...current,
              marketFocus: typeof value === "string" ? value : "",
            }));
          }}
        >
          <SelectItem key="1">Focus 1</SelectItem>
        </Select>
      </div>

      <Textarea
        label="Problem"
        placeholder="Describe the problem you're solving."
        labelPlacement="outside"
        minRows={3}
        value={form.problem}
        onChange={(event) =>
          setForm((current) => ({ ...current, problem: event.target.value }))
        }
      />
      <Textarea
        label="Solution"
        placeholder="Explain your solution clearly."
        labelPlacement="outside"
        minRows={3}
        value={form.solution}
        onChange={(event) =>
          setForm((current) => ({ ...current, solution: event.target.value }))
        }
      />
      <Textarea
        label="Value Proposition"
        placeholder="Why your solution is better or unique."
        labelPlacement="outside"
        minRows={3}
        value={form.valueProp}
        onChange={(event) =>
          setForm((current) => ({ ...current, valueProp: event.target.value }))
        }
      />
    </div>
  );
};
