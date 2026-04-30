import { z } from "zod";

export const getRatingSchema = (t: any) =>
  z.object({
    score: z.number().min(1, t("ratingModal.scoreRequired")).max(5),
    feedback: z.string().optional(),
  });

export const getCommentSchema = (t: any) =>
  z.object({
    content: z.string().min(1, t("commentModal.contentRequired")).max(1000),
  });

export type RatingInput = z.infer<ReturnType<typeof getRatingSchema>>;
export type CommentInput = z.infer<ReturnType<typeof getCommentSchema>>;
