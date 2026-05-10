"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Button,
  addToast,
  Textarea,
  Input,
} from "@heroui/react";
import { DatePicker, TimeInput } from "@heroui/react";
import { today, getLocalTimeZone, now, Time } from "@internationalized/date";
import { User } from "@/types/api";
import { useRequestMeeting } from "@/hooks/api/useProject";
import { useAuthStore } from "@/stores/useAuthStore";

interface RequestMeetingModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  talent: User;
  projectId?: number;
}

export const RequestMeetingModal = ({
  isOpen,
  onOpenChange,
  projectId,
}: RequestMeetingModalProps) => {
  const t = useTranslations("TalentDetails");
  const { user } = useAuthStore();
  const { mutate: requestMeeting, isPending } = useRequestMeeting();

  const [date, setDate] = useState<any>(today(getLocalTimeZone()));
  const [time, setTime] = useState<any>(null);
  const [contactMethod, setContactMethod] = useState<string>("phone");
  const [contactValue, setContactValue] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!user) return;
    if (contactMethod === "Phone" || contactMethod === "Whatsapp") {
      setContactValue(user?.phone || "");
    } else if (contactMethod === "Email") {
      setContactValue(user?.contactEmail || user?.email || "");
    }
  }, [contactMethod, user]);

  const contactMethods = [
    { key: "Phone", label: t("requestMeetingModal.contactMethods.phone") },
    { key: "Email", label: t("requestMeetingModal.contactMethods.email") },
    {
      key: "Whatsapp",
      label: t("requestMeetingModal.contactMethods.whatsapp"),
    },
  ];

  const handleSubmit = () => {
    if (!date || !time) {
      addToast({
        title: "Please select date and time",
        color: "warning",
      });
      return;
    }

    if (!projectId) return;

    // Comprehensive past date/time validation
    const currentFullDate = now(getLocalTimeZone());
    const selectedDate = date;
    const isToday = selectedDate.compare(today(getLocalTimeZone())) === 0;

    if (selectedDate.compare(today(getLocalTimeZone())) < 0) {
      addToast({
        title: "Please select a date in the future",
        color: "warning",
      });
      return;
    }

    if (isToday && time) {
      const currentTime = new Time(
        currentFullDate.hour,
        currentFullDate.minute,
      );
      if (time.compare(currentTime) < 0) {
        addToast({
          title: "Please select a time in the future",
          color: "warning",
        });
        return;
      }
    }

    requestMeeting(
      {
        id: projectId,
        data: {
          preferredDate: date.toString(),
          preferredTime: time.toString(),
          contactMethod,
          contactInfo: contactValue,
          message,
        },
      },
      {
        onSuccess: (res) => {
          addToast({
            title: res.message || "Request sent successfully",
            color: "success",
          });
          onOpenChange();
        },
        onError: (err: any) => {
          addToast({
            title: err.message || "Failed to send request",
            color: "danger",
          });
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      backdrop="blur"
      radius="lg"
      isDismissable={false}
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
                    value={date}
                    onChange={setDate}
                    minValue={today(getLocalTimeZone())}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray2">
                    {t("requestMeetingModal.preferredTime")}
                  </label>
                  <TimeInput
                    variant="bordered"
                    radius="sm"
                    value={time}
                    onChange={setTime}
                    minValue={
                      date.compare(today(getLocalTimeZone())) === 0
                        ? new Time(
                            now(getLocalTimeZone()).hour,
                            now(getLocalTimeZone()).minute,
                          )
                        : undefined
                    }
                  />
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
                  selectedKeys={[contactMethod]}
                  onSelectionChange={(keys) =>
                    setContactMethod(Array.from(keys)[0] as string)
                  }
                >
                  {contactMethods.map((method) => (
                    <SelectItem key={method.key} textValue={method.label}>
                      {method.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="text-sm font-semibold text-gray2">
                  {contactMethod === "Email"
                    ? t("requestMeetingModal.emailLabel")
                    : t("requestMeetingModal.phoneLabel")}
                </label>
                <Input
                  variant="bordered"
                  radius="sm"
                  placeholder={
                    contactMethod === "email"
                      ? "example@email.com"
                      : "01xxxxxxxxx"
                  }
                  value={contactValue}
                  onValueChange={setContactValue}
                />
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="text-sm font-semibold text-gray2">
                  {t("requestMeetingModal.message")} (optional)
                </label>
                <Textarea
                  variant="bordered"
                  radius="sm"
                  placeholder={t("requestMeetingModal.messagePlaceholder")}
                  value={message}
                  onValueChange={setMessage}
                  minRows={3}
                />
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
              <Button
                color="primary"
                radius="md"
                onPress={handleSubmit}
                isLoading={isPending}
              >
                {t("requestMeetingModal.sendRequest")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
