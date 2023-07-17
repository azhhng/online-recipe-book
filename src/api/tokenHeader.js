import { authStore } from "../stores/auth";

export async function getTokenHeader() {
  const accessToken = await authStore.getState().accessToken;
  console.log(accessToken);
  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  console.log(header);
  return header;
}
