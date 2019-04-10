# Cache busting assets

A function that takes an array of files, copies them and appends a unique hash based on the file contents to the file name and returns an object where the original path is the property name and the value is the new file path.

## Getting Started

```
npm i --save-dev cache-busting-assets
```
```
const cacheBust = require('cache-busting-assets');
const cacheFiles = cacheBust(['/static/assets/js/bundle.js', '/static/assets/js/main.js']);
```

In this case cacheFiles can be used however you wish, it could be used as a function within server side templating to replace the path

```
// app.js
  res.nunjucksEnvironment.addFilter('cacheBust', (arg) => {
    return cacheFiles[arg] || arg;
  });

// scripts.html
  <script src={{"/static/assets/js/main.js" | cacheBust}}></script>
```

or could be used in a build task to move do a string replace on a script tag

```
.replace('{{"/static/assets/js/main.js"}}', cacheFiles["/static/assets/js/main.js"]);
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/alexnewmannn/cache-bust/tags).