export function isAllowedFileSignature(buffer: Buffer): boolean {
  // JPG
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true

  // PNG
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) return true

  // PDF
  if (
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46
  ) return true

  // WEBP
  const riff = buffer.toString("ascii", 0, 4)
  const webp = buffer.toString("ascii", 8, 12)
  if (riff === "RIFF" && webp === "WEBP") return true

  return false
}