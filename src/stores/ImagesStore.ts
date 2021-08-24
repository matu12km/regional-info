import { observable } from 'mobx';

export class UploadImage {
  fileName: string;
  fileType: string;
  base64: string;

  constructor(name: string, type: string, base64: string) {
    this.fileName = name;
    this.fileType = type;
    this.base64 = base64;
  }
}

export const ImagesStore = () => {
  return {
    images: [] as UploadImage[],

    addImage(img: UploadImage) {
      this.images.push(img);
    },

    updateImages(newImages: UploadImage[]) {
      this.images = newImages;
    },
  };
};
