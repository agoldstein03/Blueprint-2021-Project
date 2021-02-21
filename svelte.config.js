const sveltePreprocess = require('svelte-preprocess');
const makeAttractionsImporter = require('attractions/importer.js');

module.exports = {
    compilerOptions: {
        // we'll extract any component CSS out into
        // a separate file - better for performance
        css: css => {
            css.write('bundle.css');
        }
    },
    preprocess: sveltePreprocess({
        sourceMap: true,
        defaults: {
//          markup: 'pug',
            style: 'scss'
         },
         scss: {
            importer: makeAttractionsImporter({
              // specify the path to your theme file, relative to this file
              themeFile: path.join(__dirname, './src/theme/theme.scss'),
            }),
            // not mandatory but nice to have for concise imports
            includePaths: [path.join(__dirname, './src/theme/')],
        },
         postcss: {
             plugins: [require('autoprefixer')()]
         }
     })
}
