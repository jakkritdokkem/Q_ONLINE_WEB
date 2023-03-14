import { InstanceFormBody /*, InstanceFormData*/ } from '../helper/Axios';

export async function getBookAppointment(pageSize, currentPage, userId, search, treatment, status, startDate, endDate, openStartDate, openEndDate) {
  try {
    const response = await InstanceFormBody.get(`bookAppointment/getBookAppointment?userId=${userId}&search=${search}&treatment=${treatment}&status=${status}&startDate=${startDate}&endDate=${endDate}&openStartDate=${openStartDate}&openEndDate=${openEndDate}&pageSize=${pageSize}&currentPage=${currentPage}`);
    return await response.data;
  } catch (error) {
    console.log('error', error);
  }
}
