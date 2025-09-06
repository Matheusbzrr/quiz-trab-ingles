import { SetMetadata } from '@nestjs/common';

export const IS_TEACHER = 'isTeacher';
export const SuperAdmOnly = () => SetMetadata(IS_TEACHER, true);
