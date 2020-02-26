# vue

> An vue project


[![NPMVERSION](https://img.shields.io/npm/v/vue.svg)](http://npmjs.com/package/vue) [![GITHUBSTARS](https://img.shields.io/github/stars/Controlla/vue.svg)](https://github.com/Controlla/vue/stargazers) [![BUILD](https://travis-ci.org/Controlla/vue.svg?branch=master)](https://travis-ci.org/Controlla/vue) [![DOWNLOADS](https://img.shields.io/npm/dt/vue.svg)](https://npmjs.com/package/vue)

## Installation

``` bash
# Install with npm
$ npm install --save vue

# or yarn
$ yarn add vue
```


## Usage

``` vue
<template>
  <div class="app">
    <vue v-model="data"/>
  </div>
</template>

<script>
  import vue from 'vue';
  export default {
    name: 'demo',
    components: {
      vue
    }
  };
</script>
```

## Properties

* `blend-mode` **[String]**

  Optional; `difference` by defualt. The blend mode.


## License

```
The MIT License (MIT)

Copyright (c) 2019 Ivan Sotelo Vargas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
