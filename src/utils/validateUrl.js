export const validateUrl = (urlToValidate = "") => {
  // Check for function param and verify that it is a string
  if (!urlToValidate || typeof urlToValidate !== "string") return null;

  // Reject strings with no "." characters (e.g. "hello", "notaurl")
  if (!urlToValidate.includes(".")) return null;

  // Remove any leading or trailing whitespace
  const trimmedUrlToValidate = urlToValidate.trim();

  // Common TLDs to recognize bare domains like "website.com" or "site.org/path"
  const tldPattern =
    /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+([a-zA-Z]{2,})(:[0-9]{1,5})?(\/[^\s]*)?$/;

  // Declare final url string variable to be returned and assign trimmed url parameter to it
  let urlString = trimmedUrlToValidate;

  // If url parameter doesn't start with a protocol, prepend https://
  if (!/^https?:\/\//i.test(trimmedUrlToValidate)) {
    // Reject strings that look like file extensions or version numbers (e.g. "v1.0", "file.txt")
    if (
      /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]{1,4}$/.test(trimmedUrlToValidate) &&
      trimmedUrlToValidate.split(".").length === 2
    ) {
      // TODO: Find a better method for checking TLDs
      const knownTlds = [
        "com",
        "org",
        "net",
        "io",
        "co",
        "app",
        "dev",
        "ai",
        "edu",
        "gov",
        "uk",
        "us",
        "ca",
      ];
      const tld = trimmedUrlToValidate.split(".").pop().toLowerCase();
      if (!knownTlds.includes(tld)) return null;
    }

    // Reject strings that don't pass the regex check for URLs
    if (!tldPattern.test(trimmedUrlToValidate)) return null;

    urlString = "https://" + trimmedUrlToValidate;
  }

  // Final validation using the URL constructor
  try {
    const parsed = new URL(urlString);
    return parsed.href;
  } catch {
    return null;
  }
};

export default validateUrl;
