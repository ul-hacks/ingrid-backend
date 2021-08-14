
import {
  ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions,
  registerDecorator
} from 'class-validator';

import { dbFindUserId } from '../services/db.service';

@ValidatorConstraint({ async: true })
export class IsUsernameNotRegisteredConstraint implements ValidatorConstraintInterface {
  async validate(username: string) {
    const [err, rows] = await dbFindUserId(username);
    return (rows === null);
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
