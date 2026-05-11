"use client";

import { useTranslations } from "next-intl";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";
import { DatePicker, TimeInput } from "@heroui/react";
import { today, getLocalTimeZone, now, Time } from "@internationalized/date";
import { Controller, SubmitHandler } from "react-hook-form";
import { FormInput } from "@/components/ui/form/FormInput";
import { FormTextarea } from "@/components/ui/form/FormTextarea";
import { useRequestMeetingForm } from "@/hooks/ui/useRequestMeetingForm";
import { RequestMeetingFormValues } from "@/validations/meeting.validation";
import { MeetingType } from "@/types/api";
import { I18nProvider } from "@react-aria/i18n";

interface RequestMeetingFormProps {
  onClose: () => void;
  onSubmit: SubmitHandler<RequestMeetingFormValues>;
  isPending?: boolean;
  types?: { key: MeetingType; label: string }[];
}

export const RequestMeetingForm = ({
  onClose,
  onSubmit,
  isPending = false,
  types,
}: RequestMeetingFormProps) => {
  const t = useTranslations("TalentDetails");

  const defaultTypes = [
    {
      key: MeetingType.PROJECT_INQUIRY,
      label: t("requestMeetingModal.meetingTypes.projectInquiry"),
    },
    {
      key: MeetingType.JOIN_AS_MEMBER,
      label: t("requestMeetingModal.meetingTypes.joinAsMember"),
    },
    {
      key: MeetingType.INVESTMENT_DISC,
      label: t("requestMeetingModal.meetingTypes.investmentDisc"),
    },
    {
      key: MeetingType.OTHER,
      label: t("requestMeetingModal.meetingTypes.other"),
    },
  ];

  const meetingTypes = types || defaultTypes;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useRequestMeetingForm(meetingTypes[0].key);

  const contactMethod = watch("contactMethod");
  const message = watch("message");
  const type = watch("type");

  const contactMethods = [
    { key: "Phone", label: t("requestMeetingModal.contactMethods.phone") },
    { key: "Email", label: t("requestMeetingModal.contactMethods.email") },
    {
      key: "Whatsapp",
      label: t("requestMeetingModal.contactMethods.whatsapp"),
    },
  ];

  return (
    <>
      <ModalHeader className="text-2xl font-semibold text-dark pt-4 px-8">
        {t("requestMeetingModal.title")}
      </ModalHeader>
      <ModalBody className="px-8 pt-4 pb-2">
        <div className="flex flex-col gap-2 mb-2">
          <label className="text-sm font-semibold text-gray2">
            {t("requestMeetingModal.meetingType")}
          </label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                variant="bordered"
                radius="sm"
                selectedKeys={[field.value]}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] as string)
                }
                isInvalid={!!errors.type}
                errorMessage={
                  errors.type?.message
                    ? t(errors.type.message as string)
                    : undefined
                }
              >
                {meetingTypes.map((type) => (
                  <SelectItem key={type.key} textValue={type.label}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
        {type === MeetingType.OTHER && (
          <div className="flex flex-col gap-2 mb-2">
            <label className="text-sm font-semibold text-gray2">
              {t("requestMeetingModal.otherTypeLabel")}
            </label>
            <FormInput
              name="otherType"
              control={control}
              t={t}
              variant="bordered"
              radius="sm"
              maxLength={20}
              placeholder={t("requestMeetingModal.otherTypePlaceholder")}
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-6 mb-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray2 tracking-tight">
              {t("requestMeetingModal.preferredDate")}
            </label>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <I18nProvider locale="en-GB">
                  <DatePicker
                    variant="bordered"
                    radius="sm"
                    value={field.value}
                    onChange={field.onChange}
                    minValue={today(getLocalTimeZone())}
                    isInvalid={!!errors.date}
                    errorMessage={
                      errors.date?.message
                        ? t(errors.date.message as string)
                        : undefined
                    }
                  />
                </I18nProvider>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray2">
              {t("requestMeetingModal.preferredTime")}
            </label>
            <Controller
              control={control}
              name="time"
              render={({ field }) => (
                <TimeInput
                  variant="bordered"
                  radius="sm"
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!errors.time}
                  errorMessage={
                    errors.time?.message
                      ? t(errors.time.message as string)
                      : undefined
                  }
                  minValue={
                    watch("date")?.compare(today(getLocalTimeZone())) === 0
                      ? new Time(
                          now(getLocalTimeZone()).hour,
                          now(getLocalTimeZone()).minute,
                        )
                      : undefined
                  }
                />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray2">
              {t("requestMeetingModal.preferredContactMethod")}
            </label>
            <Controller
              control={control}
              name="contactMethod"
              render={({ field }) => (
                <Select
                  variant="bordered"
                  radius="sm"
                  placeholder={t("requestMeetingModal.selectMethodPlaceholder")}
                  selectedKeys={[field.value]}
                  onSelectionChange={(keys) =>
                    field.onChange(Array.from(keys)[0] as string)
                  }
                  isInvalid={!!errors.contactMethod}
                  errorMessage={
                    errors.contactMethod?.message
                      ? t(errors.contactMethod.message as string)
                      : undefined
                  }
                >
                  {contactMethods.map((method) => (
                    <SelectItem key={method.key} textValue={method.label}>
                      {method.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray2">
              {contactMethod === "Email"
                ? t("requestMeetingModal.emailLabel")
                : t("requestMeetingModal.phoneLabel")}
            </label>
            <FormInput
              name="contactValue"
              control={control}
              t={t}
              variant="bordered"
              radius="sm"
              placeholder={
                contactMethod === "Email" ? "example@email.com" : "01xxxxxxxxx"
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-2">
          <label className="text-sm font-semibold text-gray2">
            {t("requestMeetingModal.message")} (optional)
          </label>
          <FormTextarea
            name="message"
            control={control}
            t={t}
            variant="bordered"
            radius="sm"
            placeholder={t("requestMeetingModal.messagePlaceholder")}
            minRows={5}
            maxLength={200}
            classNames={{
              description: "absolute bottom-4 end-4 text-[8px] text-gray2",
              inputWrapper: "relative",
            }}
            description={
              <div className="flex justify-end w-full">
                <span>{message?.length ?? 0}/200</span>
              </div>
            }
          />
        </div>

        <div className="bg-[#f0f7ff] border border-[#e1effe] rounded-xl p-4">
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
        <Button variant="bordered" onPress={onClose}>
          {t("requestMeetingModal.cancel")}
        </Button>
        <Button
          color="primary"
          onPress={() => handleSubmit(onSubmit)()}
          isLoading={isPending}
        >
          {t("requestMeetingModal.sendRequest")}
        </Button>
      </ModalFooter>
    </>
  );
};
