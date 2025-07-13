// types.ts
export type BloomResponse = {
  bloom_code: string;
  bloom_level: string;
  suggested_verb: string;
  sample_question: string;
};

export type BloomLevel = {
  code: string;
  level: string;
  description: string;
};