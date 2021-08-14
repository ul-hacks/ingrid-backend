
import {
  ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions,
  registerDecorator
} from 'class-validator';

import { dbGetUserByUsername } from '../services/db.service';

@ValidatorConstraint({ async: true })
export class IsUsernameNotRegisteredConstraint implements ValidatorConstraintInterface {
  async validate(username: string) {
    const [err, rows] = await dbGetUserByUsername(username);
    return (rows.length == 0);
  }
}

export function IsUsernameNotRegistered(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameNotRegisteredConstraint
    });
  }
}
