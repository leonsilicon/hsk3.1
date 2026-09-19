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

## Optional Word Segments

The official syllabus marks an optional part of a word with fullwidth parentheses — `没（有）`
means "没 or 没有", `有（一）点儿` means "有点儿 or 有一点儿".

The `data/` sources keep that notation verbatim, but the published JSON does **not**: such an
entry is emitted as a tuple of its accepted forms, shortest first, so consumers never have to
parse `（）` out of a string (and never mistake `（` for a Chinese character).

```js
hsk31WordsLevel1.includes("没（有）"); // false — no parentheses are published
// the entry is ["没", "没有"]
```

Six entries are tuples, all in the `words` lists:

| Syllabus notation | Published entry | Level |
| --- | --- | --- |
| `没（有）` | `["没", "没有"]` | 1 |
| `有（一）点儿` | `["有点儿", "有一点儿"]` | 1 |
| `有时（候）` | `["有时", "有时候"]` | 2 |
| `差（一）点儿` | `["差点儿", "差一点儿"]` | 4 |
| `要不（然）` | `["要不", "要不然"]` | 5 |
| `凡（是）` | `["凡", "凡是"]` | 6 |

Only those five lists are typed `(string | string[])[]`; every other list, including
`HSK3.1_words_level3.json` and `HSK3.1_words_level7-9.json`, stays a plain `string[]`, so you
only narrow where a tuple can actually appear. To flatten to all accepted forms, or to pick a
single canonical one:

```js
const allForms = hsk31WordsLevel1.flat();
const canonical = hsk31WordsLevel1.map((entry) =>
  Array.isArray(entry) ? entry.at(-1) : entry,
);
```

Note `HSK3.1_words.json` (the combined pinyin-sorted list) contains no tuples: the syllabus
already resolves each of these to one form there, though not consistently the same side — it
lists `没有` and `凡是` but `有点儿` and `有时`.

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
