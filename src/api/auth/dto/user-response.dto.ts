import { Exclude, Expose } from 'class-transformer';
import { ROLE } from 'src/api/common/constants';

@Exclude()
export class UserResponeDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  full_name: string;

  @Expose()
  role: ROLE;
}
