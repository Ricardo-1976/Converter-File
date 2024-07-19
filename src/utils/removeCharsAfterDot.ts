import logger from "@config/logger";

export function removeCharsAfterDot(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.');

  if (lastDotIndex === -1) {
      return filename;
  }
  
  return filename.slice(0, lastDotIndex + 1);
}
