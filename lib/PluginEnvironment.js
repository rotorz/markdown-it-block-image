// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.

"use strict";


class PluginEnvironment {

  constructor(md, options) {
    this.md = md;
    this.options = Object.assign(this.getDefaultOptions(), options);
  }

  getDefaultOptions() {
    return {
      outputContainer: false,
      containerClassName: "block-image"
    };
  }

}


module.exports = PluginEnvironment;
