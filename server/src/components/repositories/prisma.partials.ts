import { Prisma } from '@prisma/client';

export const userSelect: Prisma.UserSelect = {
  createdAt: true,
  id: true,
  email: true,
  name: true,
  avatarURL: true,
  phone: true,
  password: false,
  birthDate: true,
  aboutMe: true,
};

// export { productSelect } from '../product/prisma.partials';
