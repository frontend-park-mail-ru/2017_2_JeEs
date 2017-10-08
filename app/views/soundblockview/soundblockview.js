import BaseView from '../baseview';
import SoundBlock from '../../blocks/soundblock/soundblock';

export default class MenuView extends BaseView {
    constructor(parent) {
        super(parent);
        this.block = new SoundBlock();

        this.eventBus.on('topbar:sound-block', () => {
            this.create()
        });
    }

    create() {
        this.parent.appendChildBlock('sound-block', this.block);
    }
}