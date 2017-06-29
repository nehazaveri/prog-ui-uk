import React,{Component} from 'react';
import {connect} from 'react-redux';
import {uploadCreative} from '../../actionCreators/creativeActions';

import {bindActionCreators} from 'redux';
import { VALID_FILE_EXTENSIONS } from '../../utils/constants'
import _ from 'lodash';

import Creative from '../../model/creative'

const validExtension = _.join(VALID_FILE_EXTENSIONS,", ")
class UploadCreativeDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            saveButtonDisabled : true,
            showFileExtensionErrorText : false
        };

        this.uploadCreative = this.uploadCreative.bind(this);
        this.validateFields = this.validateFields.bind(this);
        this.validateFileExtensions = this.validateFileExtensions.bind(this);
//        this.getBase64 = this.getBase64.bind(this);
    }

// Commented code to be used if base64 string needs to be passed to backend api
//    uploadCreative(){
//        let {title, advertiser, product , creativePath} = this;
//         this.getBase64(creativePath.files[0]).
//                then(base64String =>
//                 {
//                     let creative = new Creative(title.value,advertiser.value,product.value,creativePath.files[0],base64String);
//                     this.props.uploadCreative(creative,
//                                     this.props.onCloseDialog);
//                 });
//
//    }
//
//    getBase64(file) {
//        return new Promise(
//            function(resolve,reject){
//                let reader = new FileReader();
//                reader.readAsDataURL(file);
//                reader.onload = function()
//                    {
//                        resolve(reader.result);
//                    };
//                });
//    }

    uploadCreative(){
        let {title, advertiser, product , creativePath} = this;
        let creative = new Creative(title.value, advertiser.value, product.value, creativePath.files[0]);
        this.props.uploadCreative(creative, this.props.onCloseDialog);

    }

    validateFileExtensions(){
        let file = this.creativePath.files[0];
        let isInvalid = this.validateFields();
        let fileName = file.name;
        let ext = fileName.substring(fileName.lastIndexOf('.') + 1);
        let validExtension   = !isInvalid && _.includes(VALID_FILE_EXTENSIONS,ext);
        this.setState({
            saveButtonDisabled : !validExtension ,
            showFileExtensionErrorText : !validExtension,
        });
    }

    validateFields() {
        let isInvalid = true;
        isInvalid = _.isEmpty(this.title.value) ||
                _.isEmpty(this.advertiser.value) ||
                _.isEmpty(this.product.value) ||
                _.isEmpty(this.creativePath.files);

        this.setState({ saveButtonDisabled : isInvalid })
        return isInvalid;
    }


    render(){
        return(
           <div id="creativeSettings">
                <h2>
                    Upload Creative
                </h2>
                <fieldset>
                    <div className="inputWrap">
                        <label htmlFor="title">Creative Title:</label>
                        <input type="text"
                            className="ccText"
                            placeholder="Enter Creative Title"
                            ref={input => {
                                this.title = input;
                            }}
                            onChange={e => {this.validateFields();}}
                            required="true"
                            id="title">
                        </input>
                    </div>
                    <div className="inputWrap">
                        <label htmlFor="advertiser">Advertiser:</label>
                        <input type="text"
                            className="ccText"
                            placeholder="Enter Advertiser Name"
                            ref={input => {
                                this.advertiser = input;
                            }}
                            onChange={e => {this.validateFields();}}
                            required="true"
                            id="advertiser">
                        </input>
                    </div>
                    <div className="inputWrap">
                        <label htmlFor="product">Product:</label>
                        <input type="text"
                            className="ccText"
                            placeholder="Enter Product Name"
                            ref={input => {
                                this.product = input;
                            }}
                            onChange={e => {this.validateFields();}}
                            required="true"
                            id="product">
                        </input>
                    </div>
                    <div className='inputWrap form-group'>
                    <label htmlFor="creativePath">Creative:</label>
                        <input
                          type='file'
                          ref={input => {
                              this.creativePath = input;
                          }}
                          onChange={e => {this.validateFileExtensions();}}
                          className='form-control' />
                    </div>
                    {this.state.showFileExtensionErrorText ?
                        <div className = "errorMessage">
                            <label htmlFor="errorMessage">Valid file extensions are {validExtension} </label>
                        </div> : ''
                    }
                    <div className="inputWrap buttonsWrapper">
                        <button className="ctaOne save"
                                disabled={this.state.saveButtonDisabled}
                                onClick={this.uploadCreative}>
                          Save
                        </button>
                        <button className="ctaTwo cancel"
                                onClick={this.props.onCloseDialog}>Cancel</button>
                    </div>

                </fieldset>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
  uploadCreative: bindActionCreators(uploadCreative, dispatch)
});

export default connect(null, mapDispatchToProps)(UploadCreativeDialog);

