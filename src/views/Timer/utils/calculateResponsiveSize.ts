const mobileSize = 425;

export const calculateResponsiveSize = (screenWidth: number) => {
  if (screenWidth <= mobileSize) {
    // 手机小屏
    return {
      containerSize: 300,
      radius: 130,
      strokeWidth: 8
    };
  } else {
    return {
      containerSize: 400,
      radius: 180,
      strokeWidth: 10
    };
  }
};
