const DEFAULT_CLEANUP_LENGTH = 200;

/**
 * Removes markdown characters from a string.
 * @param string - The markdown string
 * @param limit - Limit the number of characters the cleanup runs on
 */

const removeMarkdwonChars = (
  string: string,
  limit = DEFAULT_CLEANUP_LENGTH,
): string => {
  const cleanupLimit = string.length >= limit ? limit : string.length;
  const regex = new RegExp("[#*>`~\\[\\]\\(\\)]", "g");
  const cleaned = string.slice(0, cleanupLimit).replace(regex, "");

  return cleaned;
};

export default removeMarkdwonChars;
