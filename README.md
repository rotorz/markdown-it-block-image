# markdown-it-block-image [![Build Status](https://travis-ci.org/rotorz/markdown-it-block-image.svg?branch=master)](https://travis-ci.org/rotorz/markdown-it-block-image) 

[![npm version](https://badge.fury.io/js/markdown-it-block-image.svg)](https://badge.fury.io/js/markdown-it-block-image)
[![Dependency Status](https://david-dm.org/rotorz/markdown-it-block-image.svg)](https://david-dm.org/rotorz/markdown-it-block-image)
[![devDependency Status](https://david-dm.org/rotorz/markdown-it-block-image/dev-status.svg)](https://david-dm.org/rotorz/markdown-it-block-image#info=devDependencies)

Plugin for markdown-it that detects and outputs block level images.


Example input:
```markdown
Here is an inline image: ![example inline image](http://example.com/img/example.png).

![example block image](http://example.com/img/example.png)
```

Output (with default options):
```html
<p>Here is an inline image: <img src="http://example.com/img/example.png" alt="example inline image">.</p>
<img src="http://example.com/img/example.png" alt="example block image">
```

Output (with a container element and classes):
```html
<p>Here is an inline image: <img src="http://example.com/img/example.png" alt="example inline image">.</p>
<div class="image-container">
  <img src="http://example.com/img/example.png" alt="example block image">
</div>
```


## Install

```
$ npm install --save markdown-it-block-image
```


## Usage

```javascript
var md = require("markdown-it")();
var blockImagePlugin = require("markdown-it-block-image");

md.use(blockImagePlugin, {
  outputContainer: true,
  containerClassName: "image-container"
});

var input = "![example block image](http://example.com/img/example.png)";
var output = md.render(input);

console.log(output);
```


## Options

Option               | Type               | Default         | Description
:--------------------|:-------------------|:----------------|:---------------------------------------------------------------------------------------------------------------------
`outputContainer`    | `string` \| `null` | `null`          | Indicates the type of container element to add; for instance, `"div"`. Specify `null` to disable output of container.
`containerClassName` | `string` \| `null` | `"block-image"` | Class name for image container element.


## Contribution Agreement

This project is licensed under the MIT license (see LICENSE). To be in the best
position to enforce these licenses the copyright status of this project needs to
be as simple as possible. To achieve this the following terms and conditions
must be met:

- All contributed content (including but not limited to source code, text,
  image, videos, bug reports, suggestions, ideas, etc.) must be the
  contributors own work.

- The contributor disclaims all copyright and accepts that their contributed
  content will be released to the public domain.

- The act of submitting a contribution indicates that the contributor agrees
  with this agreement. This includes (but is not limited to) pull requests, issues,
  tickets, e-mails, newsgroups, blogs, forums, etc.
