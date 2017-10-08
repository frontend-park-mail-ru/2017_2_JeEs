import BaseView from '../baseview';
import SoundBlock from '../../blocks/soundblock/soundblock';


export default class MenuView extends BaseView {
    constructor(parent) {
        super(parent);

        this.blockName = 'sound-block';
        this.block = new SoundBlock();

        this.eventBus.on('topbar:sound-block', () => {
            this.create()
        });
    }
}