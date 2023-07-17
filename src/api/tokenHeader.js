import { authStore } from "../stores/auth";

export async function getTokenHeader() {
  const accessToken = await authStore.getState().accessToken;
  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return header;
}
