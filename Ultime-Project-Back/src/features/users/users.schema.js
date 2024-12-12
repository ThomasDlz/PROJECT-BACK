import { z } from "zod";

const RegisterUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Doit avoir au minimum 3 caractères" })
    .max(50, { message: "Doit avoir au maximum 50 caractères" }),
  email: z.string().email({ message: "Email invalide" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Doit avoir au minimum 6 caractères" }),
});

const LoginUserSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().trim(),
});

const MatchSchema = z.object({
  title: z.string().min(1),
  startTime: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid date",
  }),
});

const FavoriteSchema = z.object({
  userId: z.string().regex(/^[a-f\d]{24}$/i),
  matchId: z.string().regex(/^[a-f\d]{24}$/i),
});

export { RegisterUserSchema, LoginUserSchema, MatchSchema, FavoriteSchema };
