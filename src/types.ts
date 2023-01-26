export interface BibleBook {
  name: string;
  nameLong: string;
  id: string;
  abbreviation: string;
  bibleId: string;
}

export interface Cover {
  public_id: string;
  version: number;
  format: string;
  width: number;
  height: number;
  type: string;
  created_at: string;
  imgUrl?: string
}

export interface CoverResults {
  resources: Cover[];
}

export interface FormattedCover {
 [public_id: string]: Cover;
}

export interface Chapter {
    reference: string,
    id: string,
    number: number
}
