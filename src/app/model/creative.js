import Content from './content';
import ContentMetaData from './contentMetaData';

class Creative {
    constructor(title,advertiser,product,file){
        this.contentMetaData = new ContentMetaData(title,advertiser,product);
        this.content = file;
    };
}

export default Creative;