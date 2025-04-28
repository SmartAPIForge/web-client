export function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard:", text);
    })
    .catch((err) => {
      console.error("Failed to copy text to clipboard:", err);
    });
}
