// --- ค่าคงที่ ---
const SHEET_ID = '[Google Sheets ID ของเรา]';
const SHEET_NAME = 'Sheet1';

/**
 * ฟังก์ชันหลักในการแสดงผล WebApp
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('VOC Record System')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}

/**
 * ฟังก์ชันสำหรับรับข้อมูลจากฟอร์มและบันทึกลง Google Sheets
 * @param {object} formData - อ็อบเจกต์ข้อมูลที่ส่งมาจากฟอร์ม HTML
 * @returns {object} - อ็อบเจกต์สถานะการทำงาน
 */
function saveData(formData) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const timestamp = new Date();
    
    // ตรวจสอบและสร้างหัวข้อคอลัมน์หากชีทว่างเปล่า
    if (sheet.getLastRow() === 0) {
      const headers = ["Timestamp", "ประเภทการดำเนินงาน", "ชื่อ", "นามสกุล", "อีเมลล์", "เบอร์ติดต่อ", "รายละเอียด"];
      sheet.appendRow(headers);
    }
    
    // เตรียมข้อมูลแถวใหม่
    const newRow = [
      timestamp,
      formData.operationType,
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.details
    ];
    
    // เพิ่มข้อมูลแถวใหม่ลงในชีท
    sheet.appendRow(newRow);
    
    return { status: 'success', message: 'บันทึกข้อมูลเรียบร้อยแล้ว' };
  } catch (error) {
    // ส่งข้อความแจ้งเตือนกลับไปในกรณีที่เกิดข้อผิดพลาด
    return { status: 'error', message: 'เกิดข้อผิดพลาด: ' + error.message };
  }
}