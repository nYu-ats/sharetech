export type Page = {
  nextCursor?: number;
  size: number;
};

export type GetTechNoteList = {
  summary?: boolean;
  tags?: Array<string>;
  author?: Array<string>;
  keyword?: Array<string>;
  _order_by?: string;
  _cursor?: number;
  _limit?: number;
};
