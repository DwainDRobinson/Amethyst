'use strict';

import express from 'express';
import { UserController } from '../controllers';
import {
  userCreationValidation,
  userParamsValidation,
  userUpdateValidation,
  userQueryValidation
} from '../validations';
import { validationHandler } from '../utils';

const { Router } = express;

const router = Router();

router.get(
  '/user-service/v1/getUsers',
  userQueryValidation,
  validationHandler,
  UserController.getUsers
);

router.get(
  '/user-service/v1/getUserById/:userId',
  userParamsValidation,
  validationHandler,
  UserController.getUserById
);

router.post(
  '/user-service/v1/createUser',
  userCreationValidation,
  validationHandler,
  UserController.createUser
);

router.put(
  '/user-service/v1/updateUser/:userid',
  userUpdateValidation,
  validationHandler,
  UserController.updateUser
);

router.delete(
  '/user-service/v1/deleteUserById/:userId',
  userParamsValidation,
  validationHandler,
  UserController.deleteUser
);

export default router;
