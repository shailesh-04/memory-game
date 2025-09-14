export const now = () => Date.now();

export const generateId = (prefix = "g") =>
  `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
