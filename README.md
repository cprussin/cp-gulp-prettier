# Gulp Prettier

A gulp plugin for Prettier.

## Usage

```js
const prettier = require('cp-gulp-prettier');

gulp
  .src(FILES_TO_FORMAT)
  .pipe(prettier(PRETTIER_CONFIG))
  .pipe(gulp.dest(OUTPUT));
```
