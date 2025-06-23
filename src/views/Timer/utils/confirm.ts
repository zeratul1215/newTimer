export const addUnloadEvent = () => {
  window.addEventListener('beforeunload', event => {
    event.preventDefault();
    window.confirm('计时器正在运行中，确定要离开页面吗？');
  });
};
