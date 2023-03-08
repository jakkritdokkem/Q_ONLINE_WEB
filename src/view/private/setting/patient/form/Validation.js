import * as Yup from 'yup';

const Schema = Yup.object().shape({
  prefix_id: Yup.string().required('กรุณาเลือก คำนำหน้า'),
  name: Yup.string().required('กรุณากรอก ชื่อ'),
  lastname: Yup.string().required('กรุณากรอก นามสกุล'),
  id_card: Yup.string().required('กรุณากรอก เลขบัตรประชาชน'),
  birthday: Yup.string().required('กรุณากรอก วันเดือนปีเกิด'),
  phone_number: Yup.string().min(10,"กรุณากรอกให้ครบ 10 หลัก").required('กรุณากรอก เบอร์โทรศัพท์'),
  gender: Yup.string().required('กรุณาเลือก เพศ'),
  address: Yup.string().required('กรุณากรอก ที่อยู่'),
  subdistrict: Yup.string().required('กรุณากรอก ตำบล'),
  district: Yup.string().required('กรุณากรอก อำเภอ'),
  province: Yup.string().required('กรุณากรอก จังหวัด'),
  postcode: Yup.string().required('กรุณากรอก รหัสไปรษณีย์'),
  prifix_contact_id: Yup.string().required('กรุณากรอก คำนำหน้าผู้ติดต่อ'),
  name_contact: Yup.string().required('กรุณากรอก ชื่อผู้ติดต่อ'),
  lastname_contact: Yup.string().required('กรุณากรอก นามสกุลผู้ติดต่อ'),
});

export default Schema;
