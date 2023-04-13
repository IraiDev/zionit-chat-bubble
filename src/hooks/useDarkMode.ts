import { useDarkModeContext } from '../store/DarkModeStore';
import { DARK_MODE, DOC_ELEMENT, LIGHT_MODE } from '../utils/constants';

export function useDarkMode() {
  const { isDarkModeActive, setIsDarkModeActive } = useDarkModeContext();

  const handleToggleDarkMode = () => {
    setIsDarkModeActive(!isDarkModeActive);
    DOC_ELEMENT.toggle(DARK_MODE)
      ? (localStorage.theme = DARK_MODE)
      : (localStorage.theme = LIGHT_MODE);
  };

  // useLayoutEffect(() => {
  //   const isActive =
  //     localStorage.theme === 'dark' ||
  //     (!('theme' in localStorage) &&
  //       window.matchMedia('(prefers-color-scheme: dark)').matches);
  //   setIsDarkModeActive(isActive);
  //   isActive ? DOC_ELEMENT.add(DARK_MODE) : DOC_ELEMENT.remove(DARK_MODE);
  // }, [setIsDarkModeActive]);

  return {
    isDarkModeActive,
    handleToggleDarkMode,
  };
}
