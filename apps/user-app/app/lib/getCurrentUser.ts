import db from "@repo/db/client";

export type CurrentUser = {
  id: number;
  name: string | null;
  phoneNumber: string;
};

export async function getCurrentUser(
  userId: number,
): Promise<CurrentUser | null> {
  return db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      phoneNumber: true,
    },
  });
}
