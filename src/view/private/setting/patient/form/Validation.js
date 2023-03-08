import * as Yup from "yup";

const Schema = Yup.object().shape({
  prefix_id: Yup.string().required("กรุณาเลือก คำนำหน้า"),
  name: Yup.string().required("กรุณากรอก ชื่อ"),
  lastname: Yup.string().required("กรุณากรอก นามสกุล"),
  id_card: Yup.string()
    .test("is-citizenID", "กรุณาตรวจสอบเลขบัตรประชาชนอีกครั้ง", function checkCitizen(value) {
      if (value === undefined) {
        return false;
      }
      if (value.length !== 13) {
        return false;
      }
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum += parseInt(value.charAt(i)) * (13 - i);
      }
      let mod = sum % 11;
      let check = (11 - mod) % 10;
      if (check === parseInt(value.charAt(12))) {
        return true;
      } else {
        return false;
      }
    })
    .required("กรุณากรอก เลขบัตรประชาชน"),

  birthday: Yup.string().required("กรุณากรอก วันเดือนปีเกิด"),
  phone_number: Yup.string().min(10, "กรุณากรอกให้ครบ 10 หลัก").required("กรุณากรอก เบอร์โทรศัพท์"),
  gender: Yup.string().required("กรุณาเลือก เพศ"),
  address: Yup.string().required("กรุณากรอก ที่อยู่"),
  fulladdress: Yup.string().required("กรุณากรอก ตำบล / อำเภอ / จังหวัด/ รหัสไปรษณีย์"),
  prifix_contact_id: Yup.string().required("กรุณากรอก คำนำหน้าผู้ติดต่อ"),
  name_contact: Yup.string().required("กรุณากรอก ชื่อผู้ติดต่อ"),
  lastname_contact: Yup.string().required("กรุณากรอก นามสกุลผู้ติดต่อ"),
  password: Yup.string().min(6, "กรุณากรอกให้ครบ 6 หลัก").required("กรุณากรอก รหัสผ่าน"),
});

export default Schema;
