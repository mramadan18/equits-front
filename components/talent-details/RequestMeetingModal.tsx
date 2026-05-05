"use client";

import { useTranslations } from "next-intl";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { DatePicker, TimeInput } from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { User } from "@/types/api";

interface RequestMeetingModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  talent: User;
}

export const RequestMeetingModal = ({
  isOpen,
  onOpenChange,
  // talent,
}: RequestMeetingModalProps) => {
  const t = useTranslations("TalentDetails");

  const contactMethods = [
    { key: "phone", label: t("requestMeetingModal.contactMethods.phone") },
    { key: "email", label: t("requestMeetingModal.contactMethods.email") },
    {
      key: "whatsapp",
      label: t("requestMeetingModal.contactMethods.whatsapp"),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      backdrop="blur"
      radius="lg"
      classNames={{
        backdrop: "bg-black/30 backdrop-blur-md",
        base: "border border-gray-100 shadow-2xl p-2",
        header: "border-b-0 pb-0",
        footer: "border-t-0 pt-6",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl font-semibold text-dark pt-8 px-8">
              {t("requestMeetingModal.title")}
            </ModalHeader>
            <ModalBody className="px-8 pt-4 pb-2">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray2 tracking-tight">
                    {t("requestMeetingModal.preferredDate")}
                  </label>
                  <DatePicker
                    variant="bordered"
                    radius="sm"
                    placeholderValue={undefined}
                    minValue={today(getLocalTimeZone())}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray2">
                    {t("requestMeetingModal.preferredTime")}
                  </label>
                  <TimeInput variant="bordered" radius="sm" />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="text-sm font-semibold text-gray2">
                  {t("requestMeetingModal.preferredContactMethod")}
                </label>
                <Select
                  variant="bordered"
                  radius="sm"
                  placeholder={t("requestMeetingModal.selectMethodPlaceholder")}
                  defaultSelectedKeys={["phone"]}
                >
                  {contactMethods.map((method) => (
                    <SelectItem key={method.key} textValue={method.label}>
                      {method.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="bg-[#f0f7ff] border border-[#e1effe] rounded-xl p-5">
                <p className="text-sm text-primary leading-relaxed font-medium">
                  <span className="font-bold">
                    {t("requestMeetingModal.noteLabel")}:
                  </span>{" "}
                  {t("requestMeetingModal.note")
                    .replace("Note: ", "")
                    .replace("ملاحظة: ", "")}
                </p>
              </div>
            </ModalBody>
            <ModalFooter className="px-8 pb-10 pt-6 flex gap-4">
              <Button variant="bordered" onPress={onClose} radius="md">
                {t("requestMeetingModal.cancel")}
              </Button>
              <Button color="primary" radius="md" onPress={onClose}>
                {t("requestMeetingModal.sendRequest")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
