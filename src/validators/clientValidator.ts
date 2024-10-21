import { body } from 'express-validator';
import { cpf } from 'cpf-cnpj-validator';
import { PrismaClient } from '@prisma/client';
import { addDays, isBefore, isAfter } from 'date-fns';

const prisma = new PrismaClient();

export const validateClient = [
  body('fiscalIdentifier')
    .isString()
    .custom(value => cpf.isValid(value))
    .withMessage('CPF inválido')
    .custom(async value => {
      const existingClient = await prisma.client.findUnique({
        where: { fiscalIdentifier: value }
      });
      if (existingClient) {
        throw new Error('Este CPF já está cadastrado');
      }
      return true;
    }),
  body('email')
    .isEmail()
    .withMessage('Formato de e-mail inválido')
    .normalizeEmail(),
];

export const validateEmail = [
    body('email')
      .isEmail()
      .withMessage('Formato de e-mail inválido')
      .normalizeEmail(),
  ];

  export const validateAddress = [
    body('address')
      .isLength({ min: 10, max: 255 })
      .withMessage('O endereço deve ter entre 10 e 255 caracteres')
      .notEmpty()
      .withMessage('Endereço é obrigatório'),
  ];

  export const validateDealValues = [
    body('value')
      .isFloat({ gt: 0 })
      .withMessage('O valor deve ser positivo'),

    body('downPayment')
      .custom((value, { req }) => {
        if (value < req.body.propertyValue * 0.20) {
          throw new Error('O valor de entrada deve ser no mínimo 20% do valor do imóvel');
        }
        return true;
      }),

    body('dealValue')
      .custom((value, { req }) => {
        if (value > req.body.propertyValue - req.body.downPayment) {
          throw new Error('O valor do financiamento não pode exceder o valor do imóvel');
        }
        return true;
      }),
  ];


export const validateDealDate = [
  body('issueDate')
    .isISO8601()
    .toDate()
    .custom((value) => {
      const today = new Date();
      const oneDayAhead = addDays(today, 1);
      const fiveDaysAhead = addDays(today, 5);

      if (isBefore(value, oneDayAhead) || isAfter(value, fiveDaysAhead)) {
        throw new Error('A data deve estar entre 1 e 5 dias no futuro');
      }
      return true;
    }),
];

