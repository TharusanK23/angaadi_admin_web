import { noImage } from './';

export class IndustryCreateModel {
  industryName: string;
  iconUrl: string;
  color: string;
  type: number;

  constructor(obj: any) {
    this.industryName = obj.industryName ?? '';
    this.iconUrl = obj.iconUrl ?? '';
    this.color = obj.color ?? '';
    this.type = obj.type ?? 0;
  }
}

export class Industry {
  id: string;
  industryName: string;
  iconUrl: string;
  color: string;
  type: number;
  isEmpty: boolean;

  constructor(obj: any) {
    this.id = obj.industryId ?? '';
    this.industryName = obj.industryName ?? '';
    this.iconUrl = obj.iconUrl ?? noImage;
    this.color = obj.color ?? '';
    this.type = obj.type ?? 0;
    this.isEmpty = obj.isEmpty ?? false;
  }
}
