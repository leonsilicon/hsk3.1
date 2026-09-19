/**
 * A single list entry.
 *
 * Usually the word or character itself. When the official syllabus marks part of a word as
 * optional with fullwidth parentheses — `没（有）`, `有（一）点儿` — the entry is instead the
 * tuple of its accepted forms, shortest first: `["没", "没有"]`, `["有点儿", "有一点儿"]`.
 *
 * Six entries are tuples, all in the `words` lists: `没（有）` and `有（一）点儿` (level 1),
 * `有时（候）` (2), `差（一）点儿` (4), `要不（然）` (5) and `凡（是）` (6).
 */
export type Hsk31Entry = string | string[];

export type Hsk31List = Hsk31Entry[];

export interface Hsk31ExportFileSummary {
  name: string;
  size_bytes: number;
  sha256: string;
  content: unknown;
}

export interface Hsk31ExportManifest {
  source_directory: string;
  total_files: number;
  files: Hsk31ExportFileSummary[];
}

export interface Hsk31Dataset {
  export: Hsk31ExportManifest;
  chars: Hsk31List;
  charsOriginal: Hsk31List;
  charsLevel1: Hsk31List;
  charsLevel2: Hsk31List;
  charsLevel3: Hsk31List;
  charsLevel4: Hsk31List;
  charsLevel5: Hsk31List;
  charsLevel6: Hsk31List;
  charsLevel7to9: Hsk31List;
  fourCharPhrases: Hsk31List;
  chengyu: Hsk31List;
  notChengyu: Hsk31List;
  words: Hsk31List;
  wordsLevel1: Hsk31List;
  wordsLevel2: Hsk31List;
  wordsLevel3: Hsk31List;
  wordsLevel4: Hsk31List;
  wordsLevel5: Hsk31List;
  wordsLevel6: Hsk31List;
  wordsLevel7to9: Hsk31List;
}

export declare const hsk31Export: Hsk31ExportManifest;
export declare const hsk31Chars: Hsk31List;
export declare const hsk31CharsOriginal: Hsk31List;
export declare const hsk31CharsLevel1: Hsk31List;
export declare const hsk31CharsLevel2: Hsk31List;
export declare const hsk31CharsLevel3: Hsk31List;
export declare const hsk31CharsLevel4: Hsk31List;
export declare const hsk31CharsLevel5: Hsk31List;
export declare const hsk31CharsLevel6: Hsk31List;
export declare const hsk31CharsLevel7to9: Hsk31List;
export declare const hsk314CharPhrases: Hsk31List;
export declare const hsk31Chengyu: Hsk31List;
export declare const hsk31NotChengyu: Hsk31List;
export declare const hsk31Words: Hsk31List;
export declare const hsk31WordsLevel1: Hsk31List;
export declare const hsk31WordsLevel2: Hsk31List;
export declare const hsk31WordsLevel3: Hsk31List;
export declare const hsk31WordsLevel4: Hsk31List;
export declare const hsk31WordsLevel5: Hsk31List;
export declare const hsk31WordsLevel6: Hsk31List;
export declare const hsk31WordsLevel7to9: Hsk31List;

declare const hsk31: Hsk31Dataset;
export default hsk31;
