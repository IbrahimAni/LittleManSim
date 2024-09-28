import * as monaco from "monaco-editor";

export function registerLmcLanguage() {
  monaco.languages.register({ id: "lmc" });

  monaco.languages.setMonarchTokensProvider("lmc", {
    tokenizer: {
      root: [
        [/\b(INP|OUT|ADD|SUB|STA|LDA|BRA|BRZ|BRP|DAT)\b/, "keyword"],
        [/\b\d+\b/, "number"],
        [/[;#].*$/, "comment"],
        [/".*?"/, "string"],
        [/[a-zA-Z_]\w*/, "identifier"],
      ],
    },
  });

  monaco.languages.setLanguageConfiguration("lmc", {
    comments: {
      lineComment: ";",
    },
    brackets: [],
    autoClosingPairs: [],
    surroundingPairs: [],
  });
}
