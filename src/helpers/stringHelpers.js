export function splitUserSub(sub) {
  if (!sub) {
    return "";
  }
  return sub.split("|")[1];
}

export function splitPathSub(sub) {
  if (!sub) {
    return "";
  }
  return sub.split("/")[2];
}
