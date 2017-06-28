import Content from './content';
import ContentMetaData from './contentMetaData';

class Creative {
    constructor(title,advertiser,product,file,base64String = {}){
        this.contentMetaData = new ContentMetaData(title,advertiser,product);
        //this.content = new Content(file,base64String);
        this.content = file;
    };
}

export default Creative;