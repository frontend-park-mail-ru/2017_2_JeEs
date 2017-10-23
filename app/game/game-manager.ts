// singleton

class GameManager {
    private _fieldDimension: number = 0;

    constructor() {
        this.setFieldDimension(7);
    }

    getFieldDimension(): number {
        return this._fieldDimension;
    }

    setFieldDimension(value: number) {
        this._fieldDimension = value;
    }
}

export default new GameManager();