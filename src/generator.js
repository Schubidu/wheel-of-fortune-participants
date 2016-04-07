import { faker } from 'faker';
import { fs } from 'fs';
import { path } from 'path';
import { mkdir } from 'shelljs';
import { Chance } from 'chance';
var chance = new Chance();

const MIN = 20;
const MAX = 50;

export default class Generator {
    /**
     *
     * @param {String} ext
     * @param {String} filename
     * @param {Number} [min]
     * @param {Number} [max]
     */
    constructor(ext, filename, min = MIN, max = MAX) {
        this.ext = ext;
        this._filename = filename;
        this.min = min;
        this.max = max;
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
        const { _filename, ext } = this;
        return `${ _filename }.${ ext }`;
    }

    /**
     *
     * @returns {[{name:String, spokes:Number}]}
     */
    get participants() {
        const { _participants, min, max } = this;
        if (null !== _participants) {
            return _participants;
        }
        const p = () => {
            let spokes = chance.integer({min: 0, max: 79});
            let name = faker.fake('{{name.firstName}} {{name.lastName}}');
            return {spokes, name};
        };

        let participants = [];
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
        const { filename, participants } = this;
        console.log(`${ filename } successful generated with ${ participants.length } participants.`);
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
