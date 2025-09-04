export function previewIdFormat(previewId?: number): string {
  return previewId ? String(previewId).padStart(5, '0') : '00000';
}
