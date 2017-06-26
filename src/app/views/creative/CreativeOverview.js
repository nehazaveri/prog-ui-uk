import {connect} from 'react-redux';
import React from 'react';
import Sidebar from '../../components/Sidebar';
import {fetchCreativeList} from '../../actionCreators/creativeActions';
import {bindActionCreators} from 'redux'

import UploadCreativeDialog from './UploadCreativeDialog';


import { CREATIVES_PER_PAGE } from '../../utils/constants';

const SORT_ORDER_ASC = 'asc',
  SORT_ORDER_DESC = 'desc';
class CreativeOverview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          currentPage: 1,
          totalPages: 1,
          allCreatives: null,
          creatives: null,
          sortColumnField: 'id',
          sortOrder: SORT_ORDER_ASC,
          showUploadCreativeDialog: false,
          showEditCreativeModal: false,
          creativeToEdit: null
        };

        this.editCreative = this.editCreative.bind(this);
        this.onCloseEditCreativeModal = this.onCloseEditCreativeModal.bind(this);
        this.toggleUploadCreativeDialog = this.toggleUploadCreativeDialog.bind(this);
        this.sortColumn = this.sortColumn.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePagingClick = this.handlePagingClick.bind(this);
    }

  handlePrevClick() {
    let {currentPage} = this.state;

    if (currentPage > 1) {
      this.setState({currentPage: --currentPage});
    }
  }

  handleNextClick() {
    let {currentPage, totalPages} = this.state;

    if (currentPage < totalPages) {
      this.setState({currentPage: ++currentPage});
    }
  }

  handlePagingClick(pageNumber) {
    this.setState({currentPage: pageNumber});
  }

  sortColumn(sortKey) {
    const {sortColumnField, sortOrder} = this.state;

    if (sortKey === sortColumnField) {
      this.setState({sortOrder: sortOrder === SORT_ORDER_ASC ? SORT_ORDER_DESC : SORT_ORDER_ASC});
    } else {
      this.setState({
        sortColumnField: sortKey,
        sortOrder: SORT_ORDER_ASC
      });
    }
  }

  componentWillMount() {
    this.props.fetchCreativeList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.creatives && nextProps.creatives.length && nextProps.creatives !== this.props.creatives) {
      let {creatives} = nextProps;

      creatives = _.cloneDeep(creatives);

      // process for sorting on creative roles field
      this.setState({
        allCreatives: creatives,
        creatives: creatives,
        currentPage: 1,
        totalPages: Math.ceil(creatives.length / CREATIVES_PER_PAGE),
        sortColumnField: 'id',
        sortOrder: SORT_ORDER_ASC
      });
    }
  }

  toggleUploadCreativeDialog() {
    this.setState({
      showUploadCreativeDialog: !this.state.showUploadCreativeDialog
    });
  }

  editCreative(e, organisation) {
      this.setState({
        showEditOrganisationModal: true,
        organisationToEdit: organisation
      });
    }

    onCloseEditCreativeModal() {
      this.setState({
        showEditOrganisationModal: false,
        organisationToEdit: null
      });
    }

    render(){
    return(
        <main id="creative">
            <section id="creativeTop" className='readOnly'>
              <Sidebar />

              <div className="innerWrap">
                  <h1>
                    <span>CREATIVES</span>
                  </h1>

                  <button className="ctaOne" id="create" onClick={this.toggleUploadCreativeDialog}>
                    ADD CREATIVE
                  </button>
              </div>
             </section>
             <div id="creativeWrap">
                <div id="creativeSelect">
                {
                  this.state.showUploadCreativeDialog ? <UploadCreativeDialog onCloseDialog={this.toggleUploadCreativeDialog} /> : ''
                }
                </div>
             </div>

        </main>
        )
    }
}

const mapStateToProps = (state) => ({
  creatives: state.creative.creatives,
  showSpinner: state.global.showSpinner
});

const mapDispatchToProps = (dispatch) => ({
  fetchCreativeList: bindActionCreators(fetchCreativeList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreativeOverview);