export const getBase64FileURIList = async (files: File[] | FileList) => {
  const base64Files = Array.from(files).map((file) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result === null) {
          reject();
          return;
        }
        if (reader.result instanceof ArrayBuffer) {
          resolve(reader.result.toString());
          return;
        }

        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
        console.log("Error: ", error);
      };
    });
  });
  return await Promise.all(base64Files);
};
