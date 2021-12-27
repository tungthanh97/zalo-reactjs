export const parseJson = <T>(data: string): T => {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data) as T;
    } catch (e) {
      throw new Error(`invalid json: [${data}]`);
    }
  }
  return data as T;
};
