import { Button } from '@linktivity/link-ui';
import styles from './AddBtn.module.css';

interface AddBtnProps {
  seconds: number;
  onClick: (seconds: number) => void;
}

const AddBtn = ({ seconds, onClick }: AddBtnProps) => {
  const formatTime = (s: number) => {
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `+${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Button className={styles.addBtn} onClick={() => onClick(seconds)}>
      {formatTime(seconds)}
    </Button>
  );
};

export default AddBtn;
