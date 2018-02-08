# gulp-google-tag-manager

Inject Google Tag Manager (GTM) script into HTML <head> and <body> tags with Gulp.

#### Install

```bash
$ npm install gulp-google-tag-manager --save-dev
```

## Example

Make sure to enter the correct gtmId and your homepage should be as follows

```js
const gulp = require('gulp')
const gtm  = require('gulp-google-tag-manager')

// Usage:
gulp.task('gtm', function(){
	gulp.src('./index.html')
	.pipe(gtm({
        gtmId: 'GTM-1234'
    }))
	.pipe(gulp.dest('./'));
});
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- headHolder:gtm -->
</head>
<body>
    <!-- bodyHolder:gtm -->
</body>
</html>
```

## Options

Optionally, you can use the following parameters

```js
const gulp = require('gulp')
const gtm  = require('gulp-google-tag-manager')

// Usage:
gulp.task('gtm', function(){
	gulp.src('./index.html')
	.pipe(gtm({
        gtmId: 'GTM-1234',
        layerName: 'PartnerLayer',
        placeHolder: 'gtm-partner'
    }))
	.pipe(gulp.dest('./'));
});

```

Tag manager scripts directly from [Google Tag Manager's site](https://developers.google.com/tag-manager/quickstart).
