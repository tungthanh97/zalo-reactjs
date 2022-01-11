export const authUtils = {
  isPhoneNumber(phone: string): boolean {
    const re = new RegExp(/((84|0)[3|5|7|8|9])+([0-9]{8})\b/g);
    return re.test(phone);
  },
};
