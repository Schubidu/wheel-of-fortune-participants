"use strict";
var faker = require('faker');
var fs = require('fs');
var path = require('path');
var mkdir = require('shelljs').mkdir;
var Chance = require('chance');
var chance = new Chance();

const MIN = 20;
const MAX = 50;

class Generator {
    /**
     *
     * @param {{ext, filename, min?, max?}} options
     */
    constructor(options) {
        this.ext = options.ext;
        this._filename = options.filename;
        this.min = options.min || MIN;
        this.max = options.max || MAX;
        this._participants = null;
    }

    /**
     *
     * @returns {Generator}
     */
    generate() {
        mkdir('-p', path.dirname(this.filename));
        fs.writeFileSync(this.filename, this, 'utf8');
        return this;
    }

    /**
     *
     * @returns {String}
     */
    get filename() {
        return `${this._filename}.${this.ext}`;
    }

    /**
     *
     * @returns {[{name:String, spokes:Number}]}
     */
    get participants() {
        if (null !== this._participants) {
            return this._participants;
        }
        const p = () => {
            let spokes = chance.integer({min: 0, max: 79});
            let name = faker.fake('{{name.firstName}} {{name.lastName}}');
            return {spokes, name};
        };

        let participants = [];
        const min = this.min, max = this.max;
        let i = 0, amount = chance.integer({min, max});
        for (i; i < amount; i++) {
            participants.push(p());
        }
        this._participants = participants;
        return participants;
    }

    /**
     *
     * @returns {string}
     */
    toString() {
        return '';
    }

    /**
     *
     * @returns {Generator}
     */
    log() {
        console.log(`${this.filename} successful generated with ${this.participants.length} participants.`);
        return this;
    }

    /**
     *
     * @param generator
     * @returns {Generator}
     */
    static file(generator) {
        return generator.generate().log();
    }
}

module.exports = Generator;
