export class SwotNotFoundError extends Error {
    constructor() {
        super('Swot not found!');
    }
}