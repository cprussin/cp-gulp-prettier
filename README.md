# Gulp Prettier

A gulp plugin for Prettier.

## Usage

```js
gulp
  .src(FILES_TO_FORMAT)
  .pipe(prettier(PRETTIER_CONFIG))
  .pipe(gulp.dest(OUTPUT));
```
