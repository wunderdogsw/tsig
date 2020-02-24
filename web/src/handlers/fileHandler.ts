const readBlobAsString = async (blob: Blob): Promise<string> => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new Error("Error parsing file as string"));
    };
    reader.onload = () => {
      const binaryString = reader.result as string;
      resolve(binaryString);
    };
    reader.readAsBinaryString(blob);
  });
};

export async function handleFileUpload<T>(files: Blob[]) {
  if (files.length !== 1) {
    throw new Error("Please upload a single json file");
  }
  const file = files[0];
  if (file.type !== "application/json") {
    throw new Error("Please upload a single json file");
  }
  const binaryString = await readBlobAsString(file);
  const json = JSON.parse(binaryString) as T;
  return json;
}
