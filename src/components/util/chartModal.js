import React, { useState } from 'react';
import { withFormik } from 'formik';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LineChart, ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, Bar, Line } from 'recharts'

const ChartModal = (props) => {
  const {
    countryCode,
    countryName,
    countrySlug,
    className,
    moment
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {

   setModal(!modal);
    
  }

const data = [
      {name: '2020/1', confirmed: 390, deaths: 1000, recovered: 2000},
      {name: '2020/2', confirmed: 5000, deaths: 1400, recovered: 300},
      {name: '2020/3', confirmed: 1000, deaths: 3000, recovered: 400},
      {name: '2020/4', confirmed: 3000, deaths: 500, recovered: 500},
      {name: '2020/5', confirmed: 7000, deaths: 900, recovered: 1000},
      {name: '2020/6', confirmed: 1500, deaths: 1400, recovered: 400}
];

  return (
    <div>
      <span onClick={toggle} className={"flag-icon-"+countryCode.toLowerCase()+ " flagIcon"}>&nbsp;</span>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>COVID19 CHART：{countryName}</ModalHeader>
        <ModalBody>
          <LineChart
            width={700}
            height={500}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="confirmed" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="deaths" stroke="red" />
            <Line type="monotone" dataKey="recovered" stroke="#82ca9d" />
          </LineChart>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


const MyEnhancedForm = withFormik({})(ChartModal);

export default MyEnhancedForm;