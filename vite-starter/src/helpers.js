export function kebabCaseToTitleCase(text) {
  const colorWithSpaces = text.replaceAll("-", " ");
  const colorWithCaps = colorWithSpaces.replace(/\b([a-z])/g, (match) =>
    match.toUpperCase()
  );

  return colorWithCaps;
}
