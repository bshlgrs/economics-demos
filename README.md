# economics demos

To compile, use:

    wr "browserify -t [ babelify --presets [ react es2015 ] ] -t browserify-css js/main.jsx -o build/bundle.js" js
