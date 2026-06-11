export function saveData<T>(
  key: string,
  data: T
) {
  localStorage.setItem(
    key,
    JSON.stringify(data)
  );
}

export function loadData<T>(
  key: string,
  defaultValue: T
): T {
  const data = localStorage.getItem(key);

  if (!data) return defaultValue;

  try {
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
}

export function removeData(key: string) {
  localStorage.removeItem(key);
}