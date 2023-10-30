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
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка").optional().isURL(),
];

export const postCreateValidation = [
  // body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  // body("description", "Введите текст статьи")
  //   .isLength({
  //     min: 3,
  //   })
  //   .isString(),
  body("imageUrl", "Неверная ссылка").optional().isString(),
];
