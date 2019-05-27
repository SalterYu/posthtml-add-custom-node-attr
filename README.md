
<div align="center">
  <img width="220" height="150" title="PostHTML" src="http://posthtml.github.io/posthtml/logo.svg">
  <h1>Custom Elements Plugin</h1>
  <p>Use it to add custom attrs now!</p>
</div>

<h2 align="center">Install</h2>

```bash
npm i -D posthtml-add-node-custom-attr
```

<h2 align="center">Usage</h2>

```js
var posthtml = require('posthtml');

const plugin = require('posthtml-add-node-custom-attr')
const html = `
<tag-name src="123" id="a" class="tagName asd" data-item="{a:1}" style="color: blue;"></tag-name>
`

const options = {
  'tag-name': {
    id: 'tagName', // Temporary support
    class: ['newClass', undefined, null, 'asd'],
    style: {
      fontSize: '20px'
    }
  }
}

posthtml([plugin(options)])
  .process(html)
  .then(function (result) {
    console.log(result.html);
  });
```

<h2 align="center">OutPut</h2>

```html
<tag-name src="123" id="a" class="tagName asd newClass" data-item="{a:1}" style="font-size:20px;color: blue;"></tag-name>
```

## TODO

- [ ] support to add 'ID'
- [x] support to add 'style'
- [x] support to add 'class'

<h2 align="center">LICENSE</h2>

> MIT License (MIT)

> Copyright (c) 2016 PostHTML Ivan Voischev

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

