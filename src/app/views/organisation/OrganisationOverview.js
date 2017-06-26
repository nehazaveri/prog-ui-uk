import {connect} from 'react-redux';
import React from 'react';
import {fetchOrganisationList} from '../../actionCreators/organisationActions';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import CreateOrganisationDialog from './CreateOrganisationDialog';
import EditOrganisationModal from './EditOrganisationModal';
import Sidebar from '../../components/Sidebar';
import OrganisationSearch from './OrganisationSearch';
import {ORGANISATION_ROLES} from '../../utils/constants';

const ORGANISATIONS_PER_PAGE = 10,
  SORT_ORDER_ASC = 'asc',
  SORT_ORDER_DESC = 'desc';

class OrganisationOverview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      totalPages: 1,
      allOrganisations: null,
      organisations: null,
      sortColumnField: 'id',
      sortOrder: SORT_ORDER_ASC,
      showCreateOrganisationDialog: false,
      showEditOrganisationModal: false,
      organisationToEdit: null
    };

    this.editOrganisation = this.editOrganisation.bind(this);
    this.onCloseEditOrganisationModal = this.onCloseEditOrganisationModal.bind(this);
    this.toggleCreateOrganisationDialog = this.toggleCreateOrganisationDialog.bind(this);
    this.sortColumn = this.sortColumn.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePagingClick = this.handlePagingClick.bind(this);
    this.organisationsSearched = this.organisationsSearched.bind(this);
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
    this.props.fetchOrganisationList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.organisations && nextProps.organisations.length && nextProps.organisations !== this.props.organisations) {
      let {organisations} = nextProps;

      organisations = _.cloneDeep(organisations);

      // process for sorting on organisation roles field
      organisations.forEach(organisation => {
        organisation.organisationRolesForSort = _.chain(organisation.rolePlayingOrganisations).map(rolePlayingOrganisation => ORGANISATION_ROLES[rolePlayingOrganisation.role.toLowerCase()].text.toUpperCase()).value().sort().join(', ');
      });

      this.setState({
        allOrganisations: organisations,
        organisations: organisations,
        currentPage: 1,
        totalPages: Math.ceil(organisations.length / ORGANISATIONS_PER_PAGE),
        sortColumnField: 'id',
        sortOrder: SORT_ORDER_ASC
      });
    }
  }

  toggleCreateOrganisationDialog() {
    this.setState({
      showCreateOrganisationDialog: !this.state.showCreateOrganisationDialog
    });
  }

  organisationsSearched(filteredOrganisations) {
    this.setState({
      organisations: filteredOrganisations,
      currentPage: 1,
      totalPages: Math.ceil(filteredOrganisations.length / ORGANISATIONS_PER_PAGE)
    });
  }

  editOrganisation(e, organisation) {
    this.setState({
      showEditOrganisationModal: true,
      organisationToEdit: organisation
    });
  }

  onCloseEditOrganisationModal() {
    this.setState({
      showEditOrganisationModal: false,
      organisationToEdit: null
    });
  }

  render() {
    const {showSpinner} = this.props,
      {currentPage, sortColumnField, sortOrder, showEditOrganisationModal, organisationToEdit, allOrganisations} = this.state;

    let {organisations} = this.state,
      numbers = [],
      hasOrganisationsInStore = allOrganisations && allOrganisations.length,
      hasOrganisationsInState = organisations && organisations.length,
      organisationsList;

    if (hasOrganisationsInState) {
      organisations = _.chain(organisations).orderBy([sortColumnField], [sortOrder]).slice((currentPage - 1) * ORGANISATIONS_PER_PAGE, currentPage * ORGANISATIONS_PER_PAGE).value();

      organisationsList = organisations.map(organisation => {
        return (
          <li key={organisation.id}>
            <a onClick={e => e.preventDefault()}>
              <span className="item">{organisation.id}</span>
              <span className="startDate">{organisation.name}</span>

              <span className="endDate">{organisation.organisationRolesForSort}</span>
              <span className="days">{organisation.externalId}</span>
            </a>
            <div className="edit active" onClick={e => {
              this.editOrganisation(e, organisation);
            }}></div>
          </li>
        );
      });

      for (let i = 1; i <= this.state.totalPages; i++) {
        let numberForRendering = i,
          classNameForNumber = '';
        if (numberForRendering == currentPage) {
          classNameForNumber = 'active';
        }
        numbers.push(
          <li key={numberForRendering}
              className={classNameForNumber}
              onClick={ event => this.handlePagingClick(i) }>
            <a href="#">{numberForRendering}</a>
          </li>
        );
      }
    }

    return (
      <main id="organisation">
        <section id="orderTop" className='readOnly'>
          <Sidebar />

          <div className="innerWrap">
            <h1>
              <span>ORGANISATIONS</span>
            </h1>

            <button className="ctaOne" id="create" onClick={this.toggleCreateOrganisationDialog}>
              CREATE
            </button>

            { hasOrganisationsInState ?
              (
                <div className="ccSort">
                  <label htmlFor="sortOrganisationId">
                    Organisation ID
                  </label>
                  <input type="radio"
                         id="sortOrganisationId"
                         className="ccSortRadio"
                         onChange={e => this.sortColumn('id')}/>

                  <label htmlFor="sortOrganisationName">
                    Organisation Name
                  </label>
                  <input type="radio"
                         id="sortOrganisationName"
                         className="ccSortRadio"
                         onChange={e => this.sortColumn('name')}/>

                  <label htmlFor="sortOrganisationRole">
                    Organisation Role(s)
                  </label>
                  <input type="radio"
                         id="sortOrganisationRole"
                         className="ccSortRadio"
                         onChange={e => this.sortColumn('organisationRolesForSort')}/>

                  <label htmlFor="sortExternalRefId">
                    External Ref ID
                  </label>
                  <input type="radio"
                         id="sortExternalRefId"
                         className="ccSortRadio"
                         onChange={e => this.sortColumn('externalId')}/>

                  <label>Action</label>
                </div>
              )
              :
              ''
            }
          </div>
        </section>

        <div id="orderWrap">
          <div id="orderSelect">
            <ul className={hasOrganisationsInStore ? '': 'fullWidth'}>
              {
                !hasOrganisationsInStore ? (showSpinner ? '' : 'No Organisations Available!') : (hasOrganisationsInState ? organisationsList : 'No Match Found!')
              }
            </ul>

            {
              hasOrganisationsInStore ?
              (
                <div id="searchWrapper">
                  <OrganisationSearch onOrganisationsSearched={this.organisationsSearched} organisations={allOrganisations}/>
                </div>
              )
              :
              ''
            }

            {
              this.state.showCreateOrganisationDialog ? <CreateOrganisationDialog onCloseDialog={this.toggleCreateOrganisationDialog} /> : ''
            }
          </div>

          { hasOrganisationsInState ?
            (
              <div id="paginationBar">
                <ul className="pagination">
                  <li onClick={this.handlePrevClick}
                      className="prev">
                    <a href="#"/>
                  </li>
                  { numbers }
                  <li onClick={this.handleNextClick} className="next">
                    <a href="#"/></li>
                </ul>
              </div>
            )
            :
            ''
          }
        </div>

        {
          showEditOrganisationModal ? <EditOrganisationModal organisation={organisationToEdit} onCloseModal={this.onCloseEditOrganisationModal} /> : ''
        }
      </main>
    )
  }
}
const mapStateToProps = (state) => ({
  organisations: state.organisation.organisations,
  showSpinner: state.global.showSpinner
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrganisationList: bindActionCreators(fetchOrganisationList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganisationOverview);
