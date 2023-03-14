import { InstanceFormBody /*, InstanceFormData*/ } from '../helper/Axios';

// ดึงข้อมูล
export async function getBookAppointment(pageSize, currentPage, userId, search, treatment, status, startDate, endDate, openStartDate, openEndDate) {
  try {
    const response = await InstanceFormBody.get(`bookAppointment/getBookAppointment?userId=${userId}&search=${search}&treatment=${treatment}&status=${status}&startDate=${startDate}&endDate=${endDate}&openStartDate=${openStartDate}&openEndDate=${openEndDate}&pageSize=${pageSize}&currentPage=${currentPage}`);
    return await response.data;
  } catch (error) {
    console.log('error', error);
  }
}

// จองคิว
export async function createBookAppointment(data) {
  try {
    const response = await InstanceFormBody.post(`bookAppointment/createBookAppointment`, data);
    return await response.data;
  } catch (error) {
    console.log('error', error);
  }
}

// อัพเดทสถานะข้อมูล
export async function updateStatusBook(id, data) {
  try {
    const response = await InstanceFormBody.put(`bookAppointment/updateStatusBook/${id}`, data);
    return await response.data;
  } catch (error) {
    console.log('error', error);
  }
}
