import { AxiosInstance } from "axios";

export const FilesApi = (instance: AxiosInstance) => ({
  async upload(file: any, imagePath: string) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("imagePath", imagePath);

    const { data } = await instance.post("/files", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
});
