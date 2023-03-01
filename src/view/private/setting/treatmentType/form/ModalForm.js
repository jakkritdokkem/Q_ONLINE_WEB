import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, ErrorMessage } from 'formik';
import Schema from './Validation';
import { createTreatmentType } from '../../../../../service/TreatmentType.Service';
import Swal from 'sweetalert2';

function ModalForm({ show, setShow, reload }) {
  // ฟังก์ชันบันทึกข้อมูล
  async function create(data) {
    let res = await createTreatmentType(data);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        Swal.fire({
          icon: 'success',
          title: 'บันทึกข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });
        reload();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'บันทึกข้อมูลไม่สำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }

  return (
    <Modal show={show} onHide={setShow} centered>
      <Modal.Header closeButton>
        <Modal.Title>เพิ่มข้อมูล</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          validationSchema={Schema}
          initialValues={{
            name: '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);
            create(value);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-12">
                  <label>ประเภทการรักษา</label>
                  <input
                    value={values.name}
                    name="name"
                    type="text"
                    className={`form-input ${touched.name ? (errors.name ? 'invalid' : 'valid') : ''}`}
                    onChange={(e) => {
                      setFieldValue('name', e.target.value);
                    }}
                  />
                  <ErrorMessage component="div" name="name" className="text-invalid" />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="btn btn-success mx-1">
                  บันทึก
                </button>
                <button type="reset" className="btn btn-secondary mx-1">
                  ล้างค่า
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default ModalForm;
