class Content{

    constructor(fileObj,base64File){
        this.name = fileObj.name;
        this.contentType = fileObj.type;
        this.file = base64File;
    }
}

export default Content;