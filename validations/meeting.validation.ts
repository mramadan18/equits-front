import { z } from "zod";
import { today, getLocalTimeZone, now, Time } from "@internationalized/date";
import { MeetingType } from "@/types/api";

export const requestMeetingSchema = z
  .object({
    type: z.nativeEnum(MeetingType, {
      message: "requestMeetingModal.validation.invalidOption",
    }),
    date: z.any().refine((val) => val !== null, {
      message: "requestMeetingModal.validation.dateRequired",
    }),
    time: z.any().refine((val) => val !== null, {
      message: "requestMeetingModal.validation.timeRequired",
    }),
    contactMethod: z.string().min(1),
    contactValue: z.string().min(1, {
      message: "requestMeetingModal.validation.contactRequired",
    }),
    message: z.string().max(200).optional(),
    otherType: z
      .string()
      .max(20, { message: "requestMeetingModal.validation.otherTypeTooLong" })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === MeetingType.OTHER && !data.otherType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "requestMeetingModal.validation.otherTypeRequired",
        path: ["otherType"],
      });
    }
    if (!data.date || !data.time) return;

    const currentFullDate = now(getLocalTimeZone());
    const selectedDate = data.date;
    const isToday = selectedDate.compare(today(getLocalTimeZone())) === 0;

    if (selectedDate.compare(today(getLocalTimeZone())) < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "requestMeetingModal.validation.futureDate",
        path: ["date"],
      });
    }

    if (isToday && data.time) {
      const currentTime = new Time(
        currentFullDate.hour,
        currentFullDate.minute,
      );
      if (data.time.compare(currentTime) < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "requestMeetingModal.validation.futureTime",
          path: ["time"],
        });
      }
    }

    if (data.contactMethod === "Email") {
      const emailResult = z.string().email().safeParse(data.contactValue);
      if (!emailResult.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "requestMeetingModal.validation.invalidEmail",
          path: ["contactValue"],
        });
      }
    }
  });

export type RequestMeetingFormValues = z.infer<typeof requestMeetingSchema>;
