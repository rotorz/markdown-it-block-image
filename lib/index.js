// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.

"use strict";

const PluginEnvironment = require("./PluginEnvironment");
const tokenizer = require("./tokenizer");


function setup(md, options) {
  let env = new PluginEnvironment(md, options);

  md.block.ruler.before("fence", "block-image", tokenizer.bind(env), {
    alt: [ "paragraph", "reference", "blockquote", "list" ]
  });
}


module.exports = setup;
