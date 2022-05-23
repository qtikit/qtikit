export type Match = {
  pattern: string;
  match: string;
};

export type MatchResult = {
  type: 'latex' | undefined;
  target: string;
  matches: Array<Match>;
};
