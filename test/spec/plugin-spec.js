// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.

"use strict";

const given = require("mocha-testdata");
const should = require("should");
const markdownIt = require("markdown-it");

const inlineBlockPlugin = require("../../lib");


describe("markdown-it-block-image", function () {

  given([
    [
      `![alt text](example.png "title text")`,
      `<img src="example.png" alt="alt text" title="title text">`
    ],
    [
      `![alt text](example.png)`,
      `<img src="example.png" alt="alt text">`
    ],
    [
      `![alt text](example.png)    `,
      `<img src="example.png" alt="alt text">`
    ],
    [
      `![alt text](example.png)

![alt text](another-example.png)`,
      `<img src="example.png" alt="alt text"><img src="another-example.png" alt="alt text">`
    ],
    [
      `   ![  alt text  ](  example.png  )    `,
      `<img src="example.png" alt="  alt text  ">`
    ],
    [
      `Paragraph before

![alt text](example.png)

Paragraph after`,
      `<p>Paragraph before</p>
<img src="example.png" alt="alt text"><p>Paragraph after</p>`
    ]
  ]).
  it("outputs image as a block element by default", function (source, expected) {
    let markdownProcessor = markdownIt().use(inlineBlockPlugin);
    markdownProcessor.render(source)
      .trim()
      .should.be.eql(expected);
  });

  given([
    [
      `![alt text](example.png)`,
      `<div class="block-image"><img src="example.png" alt="alt text"></div>`
    ],
    [
      `![alt text](example.png)    `,
      `<div class="block-image"><img src="example.png" alt="alt text"></div>`
    ],
    [
      `   ![  alt text  ](  example.png  )    `,
      `<div class="block-image"><img src="example.png" alt="  alt text  "></div>`
    ],
    [
      `![
alt text
](
example.png
)`,
      `<div class="block-image"><img src="example.png" alt="alt text"></div>`
    ]
  ]).
  it("outputs image within a container element", function (source, expected) {
    let markdownProcessor = markdownIt().use(inlineBlockPlugin, {
      outputContainer: "div"
    });
    markdownProcessor.render(source)
      .trim()
      .should.be.eql(expected);
  });

  given([
    [
      `![alt text](example.png)`,
      `<div class="custom-container-class"><img src="example.png" alt="alt text"></div>`
    ],
    [
      `![alt text](example.png)    `,
      `<div class="custom-container-class"><img src="example.png" alt="alt text"></div>`
    ],
    [
      `   ![  alt text  ](  example.png  )    `,
      `<div class="custom-container-class"><img src="example.png" alt="  alt text  "></div>`
    ]
  ]).
  it("outputs image within a container element and a custom class name", function (source, expected) {
    let markdownProcessor = markdownIt().use(inlineBlockPlugin, {
      outputContainer: "div",
      containerClassName: "custom-container-class"
    });
    markdownProcessor.render(source)
      .trim()
      .should.be.eql(expected);
  });

  given([
    [
      `Normal paragraph: ![alt text](example.png)`,
      `<p>Normal paragraph: <img src="example.png" alt="alt text"></p>`
    ],
    [
      `![alt text](example.png) - Normal paragraph!`,
      `<p><img src="example.png" alt="alt text"> - Normal paragraph!</p>`
    ],
    [
      `![alt text](example.png)
![alt text](another-example.png)`,
      `<p><img src="example.png" alt="alt text">
<img src="another-example.png" alt="alt text"></p>`
    ],
    [
      `Text before
![alt text](example.png)`,
      `<p>Text before
<img src="example.png" alt="alt text"></p>`
    ],
    [
      `![alt text](example.png)
text after`,
      `<p><img src="example.png" alt="alt text">
text after</p>`
    ],
    [
      `Text before
![alt text](example.png)
text after`,
      `<p>Text before
<img src="example.png" alt="alt text">
text after</p>`
    ]
  ]).
  it("outputs regular paragraph for non-block images", function (source, expected) {
    let markdownProcessor = markdownIt().use(inlineBlockPlugin, {
      outputContainer: "div"
    });
    markdownProcessor.render(source)
      .trim()
      .should.be.eql(expected);
  });

});
