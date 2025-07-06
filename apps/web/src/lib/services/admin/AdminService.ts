import { getApiHost } from "@/lib/apiUtils";

export const AdminService = {
  isCurrentUserAdmin: async (
    userId: string | null | undefined,
    token: string | null | undefined,
  ): Promise<{ isAdmin: boolean }> => {
    if (!userId || !token) {
      return { isAdmin: false };
    }

    const response = await fetch(
      `${getApiHost()}/admin/users/${userId}/isAdmin/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.json();
  },
};
