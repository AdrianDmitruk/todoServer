import { body } from "express-validator";

export const loginValidation = [
  body("email", "Невыерный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Невыерный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
  body("firstName", "Укажите имя").isLength({ min: 3 }),
  body("lastName", "Укажите фамилию").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Введите заголовок задачи")
    .isLength({ min: 3 })
    .optional()
    .isString(),
  body("description", "Введите описание")
    .optional()
    .isLength({
      min: 3,
    })
    .isString(),
  body("imageUrl", "Неверная ссылка").optional().isString(),
];
