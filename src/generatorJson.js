import Generator from './generator';

export class GeneratorJSON extends Generator {
    constructor(filename) {
        super('json', filename);
    }

    /**
     *
     * @returns {String}
     */
    toString() {
        return JSON.stringify(super.participants, null, 2);
    }

    /**
     *
     * @param filename
     * @returns {Generator}
     */
    static file(filename) {
        return super.file(new GeneratorJSON(filename));
    }
}

export default GeneratorJSON;
