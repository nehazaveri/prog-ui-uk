import {connect} from 'react-redux';
import React from 'react';
import Sidebar from '../../components/Sidebar';


class OrganisationOverview extends React.Component {
    render(){
    return(
            <main id="organisation">
                    <section id="orderTop" className='readOnly'>
                      <Sidebar />
                     </section>
            </main>
        )
    }
}

export default OrganisationOverview;