import React, {Component} from 'react';
import _ from 'lodash';
import CCSelect from '../../components/CCSelect';
import {ORGANISATION_ROLES} from '../../utils/constants';

export default class OrganisationSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchDone: false,
      selectedRole: null
    };

    this.onRoleChange = this.onRoleChange.bind(this);
    this.searchOrganisations = this.searchOrganisations.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  onRoleChange(e) {
    this.setState({selectedRole: _.find(ORGANISATION_ROLES, {key: e.target.value})});
  }

  searchOrganisations(e) {
    e.preventDefault();

    const {organisationName, externalRefId, organisationRole, props} = this;
    const {organisations, onOrganisationsSearched} = props;

    if (!organisations || !organisations.length) {
      return;
    }

    let searchName = organisationName.value && organisationName.value.trim() ? organisationName.value.trim() : null,
      searchRefId = externalRefId.value && externalRefId.value.trim() ? externalRefId.value.trim() : null,
      searchRole = organisationRole.value ? organisationRole.value : null,
      filteredOrganisations = organisations;

    if (!searchName && !searchRefId && !searchRole) {
      return;
    }

    if (!_.isEmpty(filteredOrganisations) && searchName) {
      filteredOrganisations = filteredOrganisations.filter(organisation => {
        return organisation.name.match(new RegExp(searchName, 'i'));
      });
    }

    if (!_.isEmpty(filteredOrganisations) && searchRefId) {
      filteredOrganisations = filteredOrganisations.filter(organisation => {
        return searchRefId === organisation.externalId;
      });
    }

    if (!_.isEmpty(filteredOrganisations) && searchRole) {
      filteredOrganisations = filteredOrganisations.filter(organisation => {
        let roles = organisation.rolePlayingOrganisations.map(o => o.role.toLowerCase());

        return _.includes(roles, searchRole.toLowerCase());
      });
    }

    if (onOrganisationsSearched) {
      onOrganisationsSearched(filteredOrganisations);
    }

    this.setState({ searchDone: true });
  }

  clearFields(e) {
    e.preventDefault();

    const {organisationName, externalRefId, organisationRole} = this;
    const {organisations, onOrganisationsSearched} = this.props;

    [organisationName, externalRefId, organisationRole].forEach(input => {
      input.value = '';
    });

   if (onOrganisationsSearched) {
     onOrganisationsSearched(organisations);
   }

    this.setState({ searchDone: false, selectedRole: null });
  }

  render() {
    const {selectedRole, searchDone} = this.state;

    return (
      <div id="searchOrganisations">
        <h2>Search & Filter</h2>
        <form onSubmit={searchDone ? this.clearFields : this.searchOrganisations}>
          <fieldset>
            <div className="inputWrap">
              <label htmlFor="searchOrganisationName">Search Organisations:</label>
              <input className="ccText"
                     ref={input => {
                       this.organisationName = input;
                     }}
                     id="searchOrganisationName">
              </input>
            </div>
            <div className="inputWrap">
              <label htmlFor="searchExternalRefId">Search External Ref ID:</label>
              <input className="ccText"
                     ref={input => {
                       this.externalRefId = input;
                     }}
                     id="searchExternalRefId">
              </input>
            </div>

            <CCSelect id="roleSelect"
                      label="Search Organisation Role:"
                      value={selectedRole ? selectedRole.key : ''}
                      valueText={selectedRole ? selectedRole.text : ''}
                      setRef = {select => this.organisationRole = select}
                      onChange={this.onRoleChange}>
              <option value="" disabled >Please Select</option>
              {
                _.sortBy(ORGANISATION_ROLES, 'key').map(role => {
                  return <option key={role.key} value={role.key}>{role.text}</option>;
                })
              }
            </CCSelect>

            <div className="inputWrap">
              <button className="ctaOne">
                {searchDone ? 'Clear' : 'Search/Filter'}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
