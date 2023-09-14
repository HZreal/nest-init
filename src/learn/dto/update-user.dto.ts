import {
    IntersectionType,
    OmitType,
    PartialType,
    PickType,
} from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// https://docs.nestjs.com/techniques/validation

// The PartialType() function returns a type (class) with all the properties of the input type set to optional.
export class UpdateUserDto extends PartialType(CreateUserDto) {}

// The PickType() function constructs a new type (class) by picking a set of properties from an input type.
export class UpdateUserPasswordDto extends PickType(CreateUserDto, [
    'username',
    'password',
] as const) {}

// The OmitType() function constructs a type by picking all properties from an input type and then removing a particular set of keys.
export class UpdateUserProfileDto extends OmitType(CreateUserDto, [
    'password',
] as const) {}

// The IntersectionType() function combines two types into one new type (class). For example, suppose we start with two types like:
export class AdditionalUserInfo {
    age: number;
}
export class UpdateCatDto extends IntersectionType(
    CreateUserDto,
    AdditionalUserInfo,
) {}

// The type mapping utility functions are composable
export class UpdateUserDto2 extends PartialType(
    OmitType(CreateUserDto, ['password'] as const),
) {}
