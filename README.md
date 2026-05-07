# hsk3.1

Exports [https://github.com/becky82/mteh/tree/main/sources/HSK3.1] as JSON files. All credit goes to the original repo owner [@becky82](https://github.com/becky82).

> This package publishes the 2025 revision of the HSK 3.0 syllabus as JSON. The repository calls it HSK 3.1 to distinguish it from the earlier 2021 HSK 3.0 syllabus.

## What This Package Contains

- `HSK3.1_words.json`: all vocabulary items
- `HSK3.1_words_level*.json`: vocabulary split by level
- `HSK3.1_chars.json`: all characters
- `HSK3.1_chars_level*.json`: characters split by level
- `HSK3.1_chars_original.json`: original character list
- `HSK3.1_4char_phrases.json`: four-character phrases
- `HSK3.1_chengyu.json`: chengyu
- `HSK3.1_not_chengyu.json`: four-character phrases that are not chengyu
- `HSK3.1_export.json`: manifest with source file metadata and hashes

## Install

```bash
npm install @leonsilicon/hsk3.1
```

## Usage

```js
import hsk31, { hsk31WordsLevel1, hsk31Chars } from "@leonsilicon/hsk3.1";

console.log(hsk31.words.length);
console.log(hsk31WordsLevel1[0]);
console.log(hsk31Chars.includes("学"));
```

Each JSON file is also available as a subpath export:

```js
import wordsLevel1 from "hsk3.1/HSK3.1_words_level1.json" with { type: "json" };
import charsLevel7to9 from "hsk3.1/HSK3.1_chars_level7-9.json" with { type: "json" };
```

## Exports

The package root default export groups all lists under friendly property names:

- `words`, `wordsLevel1`, `wordsLevel2`, `wordsLevel3`, `wordsLevel4`, `wordsLevel5`, `wordsLevel6`, `wordsLevel7to9`
- `chars`, `charsOriginal`, `charsLevel1`, `charsLevel2`, `charsLevel3`, `charsLevel4`, `charsLevel5`, `charsLevel6`, `charsLevel7to9`
- `fourCharPhrases`, `chengyu`, `notChengyu`, `export`

Named exports are also available for the same JSON payloads, using names such as
`hsk31Words`, `hsk31WordsLevel1`, `hsk31Chars`, and `hsk31Export`.

## Regenerating The JSON

The source files live in `data/HSK3.1`. To regenerate the published root JSON
files:

```bash
bun run build
```

## Repository

- Source: [github.com/leonsilicon/hsk3.1](https://github.com/leonsilicon/hsk3.1)
