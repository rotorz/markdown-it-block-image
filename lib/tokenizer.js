// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.

"use strict";


const SYNTAX_CHARS = "![]()".split("");
const SYNTAX_CODES = SYNTAX_CHARS.map(char => char.charCodeAt(0));


function advanceToSymbol(state, symbol, pointer) {
  let maxPos = null;
  let symbolLine = pointer.line;
  let symbolIndex = state.src.indexOf(symbol, pointer.pos);

  if (symbolIndex === -1) return false;

  maxPos = state.eMarks[pointer.line];
  while (symbolIndex >= maxPos) {
    ++symbolLine;
    maxPos = state.eMarks[symbolLine];
  }

  pointer.prevPos = pointer.pos;
  pointer.pos = symbolIndex;
  pointer.line = symbolLine;
  return true;
}


function tokenizer(state, startLine, endLine, silent) {
  let startPos = state.bMarks[startLine] + state.tShift[startLine];
  let maxPos = state.eMarks[startLine];

  let pointer = { line: startLine, pos: startPos };

  // Block image must be at start of input or the previous line must be blank.
  if (startLine !== 0) {
    let prevLineStartPos = state.bMarks[startLine - 1] + state.tShift[startLine - 1];
    let prevLineMaxPos = state.eMarks[startLine - 1];
    if (prevLineMaxPos > prevLineStartPos) return false;
  }

  // Identify as being a potential block image.
  if (maxPos - startPos < 2) return false;
  if (SYNTAX_CODES[0] !== state.src.charCodeAt(pointer.pos++)) return false;

  // Read alt text from within square brackets.
  if (SYNTAX_CODES[1] !== state.src.charCodeAt(pointer.pos++)) return false;
  if (!advanceToSymbol(state, "]", pointer)) return false;
  ++pointer.pos;

  // Read image url and title from within parenthesis.
  if (SYNTAX_CODES[3] !== state.src.charCodeAt(pointer.pos++)) return false;
  if (!advanceToSymbol(state, ")", pointer)) return false;

  ++pointer.pos;

  // Do not recognize as block element when there is trailing text.
  maxPos = state.eMarks[pointer.line];
  let trailingText = state.src
    .substr(pointer.pos, maxPos - pointer.pos)
    .trim();
  if (trailingText !== "") return false;

  // Block image must be at end of input or the next line must be blank.
  if (endLine !== pointer.line + 1) {
    let nextLineStartPos = state.bMarks[pointer.line + 1] + state.tShift[pointer.line + 1];
    let nextLineMaxPos = state.eMarks[pointer.line + 1];
    if (nextLineMaxPos > nextLineStartPos) return false;
  }

  if (!silent) {
    let token;

    if (this.options.outputContainer) {
      token = state.push("block-image_open", this.options.outputContainer, 1);
      token.map = [ pointer.line, pointer.line + 1 ];

      if (this.options.containerClassName) {
        token.attrSet("class", this.options.containerClassName);
      }
    }

    token = state.push("inline", "", 0);
    token.content = state.src.substr(startPos, pointer.pos - startPos);
    token.map = [ startLine, pointer.line + 1 ];
    token.children = [];

    if (this.options.outputContainer) {
      state.push("block-image_close", this.options.outputContainer, -1);
    }

    state.line = pointer.line + 1;
  }

  return true;
}


module.exports = tokenizer;
