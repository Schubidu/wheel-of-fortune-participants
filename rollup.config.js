import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default (() => {
        switch (process.env.NODE_ENV) {
            case 'cli':
                return {
                    entry: 'src/cli.js',
                    format: 'cjs',
                    plugins: [json(), babel()],
                    dest: 'dist/cli.cjs.js'
                };
            case 'main':
                return {
                    entry: 'src/main.js',
                    format: 'cjs',
                    plugins: [json(), babel()],
                    dest: 'dist/main.cjs.js'
                };
            default:
                return {
                    entry: 'src/main.js',
                    format: 'es6',
                    //plugins: [ json(), babel() ],
                    dest: 'dist/main.es2015.js'
                }

        }
    })();
