import Instance from '../helper/Axios';

// เพิ่มข้อมูลการเปิดจองคิว
export async function createOpenSchedule(data) {
  try {
    const response = await Instance.post(`openSchedule/createOpenSchedule`, data);
    return await response.data;
  } catch (error) {
    console.log('error', error);
  }
}