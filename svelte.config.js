const sveltePreprocess = require('svelte-preprocess');

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
         postcss: {
             plugins: [require('autoprefixer')()]
         }
     })
}
