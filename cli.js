#!/usr/bin/env node
var program = require('commander');
var pkg = require('./package.json');
var path = require('path');
var mime = require('mime-types');
var Csv = require('./index').Csv;
var Json = require('./index').Json;

program
    .version(pkg.version)
    .usage('[options] <file>')
    .option('-t, --type [json]', 'add file type', 'json')
    .option('-r, --reverse', 'output cols on csv `spokes;names`')
    .parse(process.argv);

var file = program.args[0] || '';
var output = (0 === program.args.length) ? 'log' : 'file';
var fileType = mime.lookup(file);
var type = program.type;

if ('file' === output && file && 0 === path.extname(file).trim().length && ('json' === type || 'csv' === type)) {
    console.error('Unkown type! Please specify type!');
    process.exit(1);
}

file = file.substring(0, file.lastIndexOf('.'));

switch (fileType) {
    case 'text/csv':
        type = 'csv';
        break;
    case 'application/json':
        type = 'json';
        break;
}

var generator;

switch (type) {
    case 'csv':
        var cols = ['name', 'spokes'];
        if (program.reverse) {
            cols.reverse();
        }
        generator = new Csv(file, cols);
        break;
    case 'json':
        generator = new Json(file);
        break;
}

if ('file' === output) {
    generator.generate().log();
} else {
    console.log(generator + '');
}

process.exit(0);
