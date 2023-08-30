export function checkIsProd() {
  if (process.argv.includes("--build")) {
    return true;
  } else {
    return false;
  }
}
