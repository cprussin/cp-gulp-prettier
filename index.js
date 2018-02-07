'use strict';

const PluginError = require('plugin-error');
const prettier = require('prettier');
const through = require('through2');

/**
 * Function composition on two functions.
 */
const compose2 = (fn1, fn2) => function() { return fn1(fn2(...arguments)); }

/**
 * Apply prettier.format, but output a Buffer instead of a string.
 */
const formatToBuffer = compose2(Buffer.from, prettier.format);

/**
 * Given a file, format it with prettier, then call the callback on the
 * formatted response.
 */
const formatFile = (options, file, cb) => {
    file.contents = formatToBuffer(file.contents.toString(), options);
    cb(null, file);
}

/**
 * Given a file, determine if it's a stream. If so, pass an error to the first
 * callback. If not, call the second callback.
 */
const errorOnStreamOrCall = (file, cb, notStreamCb) =>
    file.isStream()
        ? cb(new PluginError('gulp-prettier', 'Streaming not supported'))
        : notStreamCb();

/**
 * Given a file from through2, determine if it's null. If so, call the callback
 * with the file. If not, format it if possible, or error otherwise.
 */
const formatNullable = options => (file, enc, cb) =>
    file.isNull()
        ? cb(null, file)
        : errorOnStreamOrCall(file, cb, () => formatFile(options, file, cb));

module.exports = compose2(through.obj, formatNullable);
