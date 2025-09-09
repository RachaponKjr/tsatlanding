export const formatPhoneNumber = (phone: string) => {
  if (!phone) return "";

  // case: มือถือ 10 หลัก เช่น 0812345678 → 081-234-5678
  if (/^0[689]\d{8}$/.test(phone)) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  // case: เบอร์บ้าน 9 หลัก เช่น 021234567 → 02-123-4567
  if (/^0[2]\d{7}$/.test(phone)) {
    return phone.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  return phone; // ถ้าไม่ match ไม่ format
};
