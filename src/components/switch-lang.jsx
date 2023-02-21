import useBookId from '../hooks/useBookId';
import langs from '../data/langs.json';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentLangauge, setLanguage } from '../store/features/language';
import languageData from '../data/langs.json';

export default function SwitchLang() {
  const { book } = useBookId();
  const dispatch = useDispatch();
  const currentLang = useSelector(selectCurrentLangauge)
  const handleChange = (e) => {
    localStorage.setItem('langId', e.target.value)
    dispatch(setLanguage({ lang: e.target.value }));
  };

  return (
    <div className='lang-select'>
      <label htmlFor="language-select">
        <select id="language-select" name="languages" onChange={handleChange}>
          <option value="">{languageData[currentLang]}</option>
          {Object.entries(langs).filter(([key, value]) => key !== currentLang).map(([id, language]) => (
            <option value={id} key={id}>
              {language}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
