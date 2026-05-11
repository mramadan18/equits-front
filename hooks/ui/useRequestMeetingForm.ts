import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { today, getLocalTimeZone, now, Time } from "@internationalized/date";
import { useAuthStore } from "@/stores/useAuthStore";
import { MeetingType } from "@/types/api";
import {
  requestMeetingSchema,
  RequestMeetingFormValues,
} from "@/validations/meeting.validation";

export const useRequestMeetingForm = (
  defaultType: MeetingType = MeetingType.PROJECT_INQUIRY,
): UseFormReturn<RequestMeetingFormValues> => {
  const { user } = useAuthStore();

  const currentTime = now(getLocalTimeZone()).add({ hours: 2 });
  const defaultTimeValue = new Time(currentTime.hour, currentTime.minute);

  const form = useForm<RequestMeetingFormValues>({
    resolver: zodResolver(requestMeetingSchema),
    defaultValues: {
      type: defaultType,
      date: today(getLocalTimeZone()),
      time: defaultTimeValue,
      contactMethod: "Phone",
      contactValue: "",
      message: "",
      otherType: "",
    },
  });

  const { setValue, watch } = form;
  const contactMethod = watch("contactMethod");

  useEffect(() => {
    if (!user) return;
    if (contactMethod === "Phone" || contactMethod === "Whatsapp") {
      setValue("contactValue", user?.phone || "");
    } else if (contactMethod === "Email") {
      setValue("contactValue", user?.contactEmail || user?.email || "");
    }
  }, [contactMethod, user, setValue]);

  return form;
};
