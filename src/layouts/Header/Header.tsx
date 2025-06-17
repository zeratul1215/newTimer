import { forwardRef, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from 'clsx';
import { Select } from '@linktivity/link-ui';
import { setLocale } from '../../i18n';
import styles from './header.module.css';
import { useBaseContext } from '../Base/context';

const Header = forwardRef<HTMLElement>((_props, ref) => {
  const { i18n, t } = useTranslation();

  const [lang, setLang] = useState(i18n.language);

  const options = useMemo(
    () => [
      { label: 'English', value: 'en' },
      { label: '日本語', value: 'ja' },
      { label: '中文', value: 'zh' }
    ],
    []
  );

  const { openMenu, setOpenMenu } = useBaseContext();

  return (
    <header className={styles.header} ref={ref}>
      <div className={styles.inner}>
        <button
          className={styles.menu}
          onClick={() => setOpenMenu(open => !open)}
        >
          <span
            className={cls(styles.menuIcon, {
              [styles.open]: openMenu
            })}
          ></span>
        </button>
        <a href="/" className={styles.logo}>
          Link
        </a>
        <div className={styles.selectContainer}>
          <span className={styles.selectLabel}>{t('header.language')}</span>
          <Select
            options={options}
            value={lang}
            onSelect={value => {
              setLang(value);
              setLocale(value);
            }}
            clearable={false}
            className={styles.select}
          />
        </div>
      </div>
    </header>
  );
});

export default Header;
