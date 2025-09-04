export function getUserInitials(name: string) {
  const words = name.trim().split(' ');

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  } else {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
}
