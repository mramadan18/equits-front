import { z } from "zod";
import {
  getRatingSchema,
  getCommentSchema,
} from "../validations/engagement.validation";

export type RatingInput = z.infer<ReturnType<typeof getRatingSchema>>;
export type CommentInput = z.infer<ReturnType<typeof getCommentSchema>>;

export interface EngagementStats {
  likes: number;
  comments: number;
  rating: number;
}
