import React,{Component} from 'react';
import {connect} from 'react-redux';
import {uploadCreative} from '../../actionCreators/creativeActions';
import { FileUpload } from 'redux-file-upload'

import {bindActionCreators} from 'redux';
import { VALID_FILE_EXTENSIONS } from '../../utils/constants'
import _ from 'lodash';

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
    }

    uploadCreative(){
        let {creativeTitle, advertiser, product , creativePath} = this;
            this.props.uploadCreative(creativeTitle.value,
            advertiser.value,
            product.value,
            //creativePath,
            this.props.onCloseDialog);
    }

    validateFileExtensions(){
        let file = this.creativePath.files[0];
        let isInvalid = this.validateFields();
        let fileName = file.name;
        let ext = fileName.substring(fileName.lastIndexOf('.') + 1);
        let validExtension   = !isInvalid && _.includes(VALID_FILE_EXTENSIONS,ext);
        this.setState({ saveButtonDisabled : !validExtension ,
                        showFileExtensionErrorText : !validExtension,
                        })
    }

    validateFields() {
        let isInvalid = true;
        isInvalid = _.isEmpty(this.creativeTitle.value) ||
                _.isEmpty(this.advertiser.value) ||
                _.isEmpty(this.product.value) ||
                _.isEmpty(this.creativePath.files);

        this.setState({ saveButtonDisabled : isInvalid })
        return isInvalid;
    }


    render(){
    console.log(validExtension);
        return(
           <div id="creativeSettings">
                <h2>
                    Upload Creative
                </h2>
                <fieldset>
                    <div className="inputWrap">
                        <label htmlFor="creativeTitle">Creative Title:</label>
                        <input type="text"
                            className="ccText"
                            placeholder="Enter Creative Title"
                            ref={input => {
                                this.creativeTitle = input;
                            }}
                            onChange={e => {this.validateFields();}}
                            required="true"
                            id="creativeTitle">
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
                          //onChange={this.onFileChange}
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

