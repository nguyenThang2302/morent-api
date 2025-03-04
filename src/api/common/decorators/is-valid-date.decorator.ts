import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Items } from 'src/api/order/dto/create-order.dto';

@ValidatorConstraint({ name: 'IsValidDate' })
export class IsValidDateConstraint implements ValidatorConstraintInterface {
  async validate(value: Items[]) {
    const isValid = value.every(
      (value) =>
        value.pickup_date > new Date(Date.now()) &&
        value.pickup_date < value.dropoff_date,
    );

    return isValid;
  }
}

export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDateConstraint,
    });
  };
}
