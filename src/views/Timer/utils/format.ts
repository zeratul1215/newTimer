/**
 * 将数字填充到指定长度，用0填充
 * @param num 要填充的数字
 * @param len 目标长度
 * @returns 填充后的字符串
 */
export function pad(num: number, len: number): string {
  return num.toString().padStart(len, '0');
}
