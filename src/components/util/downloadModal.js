import React, { useState, useEffect } from 'react';
import { withFormik } from 'formik';
import { Form, Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import CsvCreator from 'react-csv-creator';

const DownloadModal = (props) => {

  const [res, setRes] = useState({init:false});

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setRes({init:false});
    setModal(!modal);
  }

  const rows = [];
  
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


  useEffect(() => {

    if (res.init) {return;}

    fetch('http://localhost:8080/covidSearchSummary', {
            method: 'GET',
            mode: 'cors',
            cache: "force-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
        })
        .then(response => response.json())
        .then((json) => {

          json.Countries.map((country) => {rows.push(country);})

          setRes ({
            date: json.Date,
            init: true
          });
        })
        .catch(error => console.error('Error:サーバーが混み合っています', error)
    );

  });

  return (
    <div>
      <span onClick={toggle} className="">Download</span>
      <Modal isOpen={modal} toggle={toggle} className="modal-lg">
        <ModalHeader toggle={toggle}>Would you downloaded all of the data？：</ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            <CsvCreator filename="covid19_summary" headers={headers} rows={rows} text="Yes" /> 
          </Button>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


const MyEnhancedForm = withFormik({})(DownloadModal);

export default MyEnhancedForm;