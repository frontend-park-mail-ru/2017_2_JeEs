import Block from "../block/block"

class RatingBlock extends Block {
    constructor(dataList) {
        super("div", ["rating-block"]);

        let ratingTemplate = require("./rating.pug");
        this._element.innerHTML = ratingTemplate({dataList: dataList});
    }
}

export default RatingBlock;