import React, { Fragment, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextSelect } from '../../../../components/TextSelect';
import Status from '../../../../data/status.json';
import ShowData from './ShowData';
import { getTreatmentTypeAll } from '../../../../service/TreatmentType.Service';
import { getDoctor } from '../../../../service/Doctor.Service';

function MainDoctor() {
  const [dataTreatment, setDataTreatment] = useState([]);
  const [data, setData] = useState([]);
  const [pagin, setPagin] = useState({
    totalRow: 1,
    pageSize: 10,
    currentPage: 1,
    totalPage: 1,
  });

  useEffect(() => {
    fetchData(10, 1, '', '', '');
    getTreatmentAll();
  }, []);

  // ฟังก์ชันดึงข้อมูลประเภทการรักษาทั้งหมด
  async function getTreatmentAll() {
    let res = await getTreatmentTypeAll();
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        res.data.unshift({ id: '', name: 'ทั้งหมด' });
        setDataTreatment(res.data);
      }
    }
  }

  // ฟังก์ชันดึงข้อมูลแบบแบ่งหน้า
  async function fetchData(pageSize, currentPage, search, treatment, status) {
    let res = await getDoctor(pageSize, currentPage, search, treatment, status);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
        setPagin(res.pagin);
      }
    }
  }

  console.log('data', data);

  return (
    <Fragment>
      <div className="w-full">
        <div className="d-flex justify-content-end">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {/* <li className="breadcrumb-item">
                <Link to="#" className="nav-breadcrumb">
                  ข้อมูลแพทย์
                </Link>
              </li> */}
              <li className="breadcrumb-item text-black fw-semibold" aria-current="page">
                ข้อมูลรายชื่อแพทย์
              </li>
            </ol>
          </nav>
        </div>
        <div className="w-full mb-5">
          <h2 className="title-content">ข้อมูลรายชื่อแพทย์</h2>
        </div>
        <Formik
          enableReinitialize={true}
          // validationSchema={Schema}
          initialValues={{
            search: '',
            treatment: '',
            status: '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <label>ค้นหา</label>
                  <input
                    value={values.search}
                    type="text"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('search', e.target.value);
                    }}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <label>ประเภทการรักษา</label>
                  <TextSelect
                    id="treatment"
                    name="treatment"
                    options={dataTreatment}
                    value={dataTreatment.filter((a) => a.id === values.treatment)}
                    onChange={(item) => {
                      setFieldValue('treatment', item.id);
                    }}
                    getOptionLabel={(z) => z.name}
                    getOptionValue={(x) => x.id}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <label>สถานะการใช้งาน</label>
                  <TextSelect
                    id="status"
                    name="status"
                    options={Status}
                    value={Status.filter((a) => a.value === values.status)}
                    onChange={(item) => {
                      setFieldValue('status', item.value);
                    }}
                    getOptionLabel={(z) => z.label}
                    getOptionValue={(x) => x.value}
                  />
                </div>
                <div className="col-12 col-lg-4 pt-4">
                  <button type="submit" className="btn btn-success mx-1">
                    <i className="fa-solid fa-magnifying-glass mx-1"></i>
                    ค้นหา
                  </button>
                  <button
                    type="reset"
                    className="btn btn-secondary mx-1"
                    onClick={() => {
                      console.log();
                    }}
                  >
                    <i className="fa-solid fa-rotate-left mx-1"></i>
                    ล้างค่า
                  </button>
                </div>
              </div>
              <div className="w-full mt-5">
                <ShowData data={data} pagin={pagin} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
}

export default MainDoctor;
