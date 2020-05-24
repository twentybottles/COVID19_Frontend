import React, { useState, useEffect } from 'react';
import { withFormik } from 'formik';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import CsvCreator from 'react-csv-creator';

const DownloadModal = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => {setModal(!modal);}
  
  const headers = [
    {id:'CountryCode', display:'Code'}, 
    {id:'Country', display:'Name'},
    {id:'Slug', display:'Slug'},
    {id:'NewConfirmed', display:'NewConfirmed'},
    {id:'TotalConfirmed', display:'TotalConfirmed'},
    {id:'NewDeaths', display:'NewDeaths'},
    {id:'TotalDeaths', display:'TotalDeaths'},
    {id:'NewRecovered', display:'NewRecovered'},
    {id:'TotalRecovered', display:'TotalRecovered'},
    {id:'Date', display:'Date'}
  ];

  return (
    <div>
      <span onClick={toggle}>Download</span>
      <Modal isOpen={modal} toggle={toggle} className="modal-lg">
        <ModalHeader toggle={toggle}>Would you download all of the data？</ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            <CsvCreator filename="covid19_summary" headers={headers} rows={props.countries} text="Yes" /> 
          </Button>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


const MyEnhancedForm = withFormik({})(DownloadModal);

export default MyEnhancedForm;