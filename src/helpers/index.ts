import { prisma } from '../config';

export async function isUserEnrolled(userId: number) {
  try {
    return await prisma.enrollment.findUnique({ where: { userId } });
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}
