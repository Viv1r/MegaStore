export function convertToBase64(file: File): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(',').splice(1).toString());
    };
    reader.readAsDataURL(file);
  });
}
