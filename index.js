import hsk31Export from "./HSK3.1_export.json" with { type: "json" };
import hsk31Chars from "./HSK3.1_chars.json" with { type: "json" };
import hsk31CharsOriginal from "./HSK3.1_chars_original.json" with { type: "json" };
import hsk31CharsLevel1 from "./HSK3.1_chars_level1.json" with { type: "json" };
import hsk31CharsLevel2 from "./HSK3.1_chars_level2.json" with { type: "json" };
import hsk31CharsLevel3 from "./HSK3.1_chars_level3.json" with { type: "json" };
import hsk31CharsLevel4 from "./HSK3.1_chars_level4.json" with { type: "json" };
import hsk31CharsLevel5 from "./HSK3.1_chars_level5.json" with { type: "json" };
import hsk31CharsLevel6 from "./HSK3.1_chars_level6.json" with { type: "json" };
import hsk31CharsLevel7to9 from "./HSK3.1_chars_level7-9.json" with { type: "json" };
import hsk314CharPhrases from "./HSK3.1_4char_phrases.json" with { type: "json" };
import hsk31Chengyu from "./HSK3.1_chengyu.json" with { type: "json" };
import hsk31NotChengyu from "./HSK3.1_not_chengyu.json" with { type: "json" };
import hsk31Words from "./HSK3.1_words.json" with { type: "json" };
import hsk31WordsLevel1 from "./HSK3.1_words_level1.json" with { type: "json" };
import hsk31WordsLevel2 from "./HSK3.1_words_level2.json" with { type: "json" };
import hsk31WordsLevel3 from "./HSK3.1_words_level3.json" with { type: "json" };
import hsk31WordsLevel4 from "./HSK3.1_words_level4.json" with { type: "json" };
import hsk31WordsLevel5 from "./HSK3.1_words_level5.json" with { type: "json" };
import hsk31WordsLevel6 from "./HSK3.1_words_level6.json" with { type: "json" };
import hsk31WordsLevel7to9 from "./HSK3.1_words_level7-9.json" with { type: "json" };

export {
  hsk31Export,
  hsk31Chars,
  hsk31CharsOriginal,
  hsk31CharsLevel1,
  hsk31CharsLevel2,
  hsk31CharsLevel3,
  hsk31CharsLevel4,
  hsk31CharsLevel5,
  hsk31CharsLevel6,
  hsk31CharsLevel7to9,
  hsk314CharPhrases,
  hsk31Chengyu,
  hsk31NotChengyu,
  hsk31Words,
  hsk31WordsLevel1,
  hsk31WordsLevel2,
  hsk31WordsLevel3,
  hsk31WordsLevel4,
  hsk31WordsLevel5,
  hsk31WordsLevel6,
  hsk31WordsLevel7to9,
};

const hsk31 = {
  export: hsk31Export,
  chars: hsk31Chars,
  charsOriginal: hsk31CharsOriginal,
  charsLevel1: hsk31CharsLevel1,
  charsLevel2: hsk31CharsLevel2,
  charsLevel3: hsk31CharsLevel3,
  charsLevel4: hsk31CharsLevel4,
  charsLevel5: hsk31CharsLevel5,
  charsLevel6: hsk31CharsLevel6,
  charsLevel7to9: hsk31CharsLevel7to9,
  fourCharPhrases: hsk314CharPhrases,
  chengyu: hsk31Chengyu,
  notChengyu: hsk31NotChengyu,
  words: hsk31Words,
  wordsLevel1: hsk31WordsLevel1,
  wordsLevel2: hsk31WordsLevel2,
  wordsLevel3: hsk31WordsLevel3,
  wordsLevel4: hsk31WordsLevel4,
  wordsLevel5: hsk31WordsLevel5,
  wordsLevel6: hsk31WordsLevel6,
  wordsLevel7to9: hsk31WordsLevel7to9,
};

export default hsk31;
