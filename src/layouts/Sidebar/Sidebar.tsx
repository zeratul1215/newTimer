import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import cls from 'clsx';
import styles from './sidebar.module.css';
import { forwardRef } from 'react';
import { useBaseContext } from '../Base/context';

const Sidebar = forwardRef<HTMLElement>((_props, ref) => {
  const { t } = useTranslation();

  const { openMenu, setOpenMenu } = useBaseContext();

  return (
    <aside
      ref={ref}
      className={cls(styles.sidebar, {
        [styles.open]: openMenu
      })}
    >
      <div className={styles.inner}>
        <ol className={styles.navList} onClick={() => setOpenMenu(false)}>
          <li className={styles.navItem}>
            <NavLink to="/dashboard" className={styles.link}>
              {t('views.dashboard.title')}
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/timer" className={styles.link}>
              {t('views.timer.title')}
            </NavLink>
          </li>
        </ol>
      </div>
    </aside>
  );
});

export default Sidebar;
