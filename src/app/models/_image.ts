export class Image {
  id: string;
  imageUrl: string;

  constructor(obj: any) {
    this.id = obj.id ?? '';
    this.imageUrl = obj.baseUrl ?? '';
  }
}
