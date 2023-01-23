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
}

export interface CoverResults {
  resources: Cover[];
}
