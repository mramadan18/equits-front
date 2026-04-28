"use client";

import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Switch } from "@heroui/switch";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Step1Form } from "../types";

interface ProjectBasicsStepProps {
  form: Step1Form;
  setForm: React.Dispatch<React.SetStateAction<Step1Form>>;
  isAcademic: boolean;
  setIsAcademic: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectBasicsStep = ({
  form,
  setForm,
  isAcademic,
  setIsAcademic,
}: ProjectBasicsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Project Name"
          placeholder="Enter the official or commercial name of your project"
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          value={form.title}
          onChange={(event) =>
            setForm((current) => ({ ...current, title: event.target.value }))
          }
        />
        <Input
          label="Tagline"
          placeholder="A short, catchy sentence that describes your startup in one line"
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          value={form.tagline}
          onChange={(event) =>
            setForm((current) => ({ ...current, tagline: event.target.value }))
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Logo URL (optional)"
          placeholder="Paste a hosted image URL for your logo"
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          value={form.logo}
          onChange={(event) =>
            setForm((current) => ({ ...current, logo: event.target.value }))
          }
        />
        <Input
          label="Cover / Thumbnail URL"
          placeholder="Paste a hosted image URL for the project cover"
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          value={form.cover}
          onChange={(event) =>
            setForm((current) => ({ ...current, cover: event.target.value }))
          }
        />
      </div>

      <div className="flex flex-col gap-4">
        <Textarea
          label="Text Elevator Pitch"
          placeholder="Explain your idea in 5 minutes as if you were in an elevator with an investor."
          labelPlacement="outside"
          minRows={4}
          variant="bordered"
          radius="sm"
          value={form.elevatorPitch}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              elevatorPitch: event.target.value,
            }))
          }
        />
        <Input
          label="Youtube Video (optional)"
          placeholder="Provide a YouTube video link that showcases your idea and pitch."
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          value={form.videoUrl}
          onChange={(event) =>
            setForm((current) => ({ ...current, videoUrl: event.target.value }))
          }
        />
        <Input
          label="Project Live Link / Prototype (Optional)"
          placeholder="Provide a link to your live product or prototype (e.g. Figma, website, demo)."
          labelPlacement="outside"
          variant="bordered"
          radius="sm"
          value={form.projectUrl}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              projectUrl: event.target.value,
            }))
          }
        />
      </div>

      <div className="space-y-4">
        <span className="block text-sm font-medium">
          Social Media Links (Optional)
        </span>
        <div className="flex items-center gap-4">
          <FaLinkedinIn className="text-blue-600 text-2xl flex-shrink-0" />
          <Input
            aria-label="LinkedIn Profile"
            placeholder="Share your startup's LinkedIn page (if available)."
            className="flex-1"
            variant="bordered"
            radius="sm"
            value={form.linkedinUrl}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                linkedinUrl: event.target.value,
              }))
            }
          />
        </div>
        <div className="flex items-center gap-4">
          <FaFacebookF className="text-blue-600 text-2xl flex-shrink-0" />
          <Input
            aria-label="Facebook Page"
            placeholder="Share your startup's Facebook page (if available)."
            className="flex-1"
            variant="bordered"
            radius="sm"
            value={form.facebookUrl}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                facebookUrl: event.target.value,
              }))
            }
          />
        </div>
        <div className="flex items-center gap-4">
          <FaInstagram className="text-pink-600 text-2xl flex-shrink-0" />
          <Input
            aria-label="Instagram Profile"
            placeholder="Share your startup's Instagram profile (if available)."
            className="flex-1"
            variant="bordered"
            radius="sm"
            value={form.instagramUrl}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                instagramUrl: event.target.value,
              }))
            }
          />
        </div>
        <div className="flex items-center gap-4">
          <FaYoutube className="text-red-600 text-2xl flex-shrink-0" />
          <Input
            aria-label="YouTube Channel"
            placeholder="Share your startup's YouTube channel (if available)."
            className="flex-1"
            variant="bordered"
            radius="sm"
            value={form.youtubeUrl}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                youtubeUrl: event.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <p className="font-semibold text-sm">
            Is it Academic / Graduation Project?
          </p>
        </div>
        <Switch isSelected={isAcademic} onValueChange={setIsAcademic} />
      </div>

      {isAcademic && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Select University"
            placeholder="Select"
            variant="bordered"
            radius="sm"
          >
            <SelectItem key="1">University 1</SelectItem>
          </Select>
          <Select
            label="Select Faculty / Major"
            placeholder="Select"
            variant="bordered"
            radius="sm"
          >
            <SelectItem key="1">Faculty 1</SelectItem>
          </Select>
        </div>
      )}
    </div>
  );
};
