/* eslint-disable no-param-reassign */
import { div } from 'core/html';
import { mount, unmount, listen, dispatch, setValue, getAttribute } from 'core/dom';
import { KEYBOARD } from 'const';
import textInput from '../text_input/text_input';
import './select_autocomplete.scss';

type Props<T> = {
  label?: string,
  name?: string,
  selected: number,
  options?: T[],
  optionRenderer?: (data: T) => HTMLElement | string,
  optionLabeler?: (data: T) => HTMLElement | string,
  onChange?: (data: T) => void,
};

/**
 * Select with autocomplete
 * @extends Component HTMLDivElement
 *
 * Usage examples:
 * - selectAutoComplete({ label: 'Select Fruit', options: ['Orange', 'Apple', 'Pineapple']})
 * - selectAutoComplete({ options: [{ id: 1, text: 'Orange' }], optionRenderer: (data) => div(data.text) })
 */
export default function selectAutoComplete<T>({
  label = '',
  name = '',
  selected,
  options = [],
  optionRenderer = (text: T) => (typeof text === 'string' && text) || '',
  optionLabeler = (text: T) => (typeof text === 'string' && text) || '',
  onChange,
}: Props<T>) {
  let query = '';
  let highlighted = -1;
  let inputEl: HTMLInputElement;

  const arrow = div`.select__arrow`();
  const element = div`.select`(
    textInput({
      label,
      name,
      autocomplete: 'off',
      ref: (el: HTMLInputElement) => { inputEl = el; },
    }),
    arrow,
  );

  const optionsEl = div`.select__options`(
    ...options.map((data: T, key: number) => (
      div`.select__option`({ key },
        optionRenderer(data),
      )
    )),
  );

  const performBlur = () => {
    element.className = `select${query ? ' filled' : ''}`;
    unmount(optionsEl);
    inputEl.blur();
  };

  const handleHighlight = (index: number) => {
    if (highlighted === index) return;
    if (highlighted > -1) {
      (optionsEl.childNodes[highlighted] as HTMLElement).className = (
        (optionsEl.childNodes[highlighted] as HTMLElement).className.replace(' active', '')
      );
    }
    if (index >= options.length) {
      highlighted = 0;
    } else if (index <= -1) {
      highlighted = options.length - 1;
    } else {
      highlighted = index;
    }
    if (highlighted > -1) {
      (optionsEl.childNodes[highlighted] as HTMLElement).className += ' active';
    }
  };

  const fetchOptions = (highlight: boolean = false) => {
    let first = -1;

    for (let i = 0; i < optionsEl.childNodes.length; i++) {
      const node = optionsEl.childNodes[i] as HTMLElement;
      if (!query || node.textContent!.toLowerCase().indexOf(query) > -1) {
        node.style.display = '';
        if (first === -1) first = i;
      } else {
        node.style.display = 'none';
      }
    }

    if (highlight) handleHighlight(first);
  };

  const setSelected = (key: number) => {
    selected = key === -1 ? 0 : key;
    setValue(inputEl, optionLabeler(options[selected]));
    performBlur();

    if (onChange) onChange(options[selected]);
  };

  if (selected !== undefined) setSelected(selected);

  listen(inputEl!, 'input', (event: Event) => {
    const q = event.currentTarget instanceof HTMLInputElement ? event.currentTarget.value : '';

    if (!query && q) element.className = 'select focused filled';
    if (query && !q) element.className = 'select focused';

    query = q.toLowerCase();
    fetchOptions(true);
  });

  listen(inputEl!, 'focus', () => {
    element.className = `select focused${query ? ' filled' : ''}`;
    if (optionsEl.parentNode !== element) {
      mount(element, optionsEl);
      if (selected) handleHighlight(selected);
    }
    fetchOptions();
  });

  listen(arrow, 'click', () => {
    if (query) {
      setValue(inputEl, '');
      inputEl.focus();
      return;
    }

    if (!optionsEl.parentNode) inputEl.focus();
    else performBlur();
  });

  listen(inputEl!, 'keydown', (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case KEYBOARD.TAB:
        // To Do: shift tabs
        event.preventDefault();
        setSelected(highlighted);
        performBlur();
        break;

      case KEYBOARD.ARROW_DOWN:
        handleHighlight(highlighted + 1);
        break;

      case KEYBOARD.ARROW_UP:
        handleHighlight(highlighted - 1);
        break;

      case KEYBOARD.ENTER:
        event.preventDefault();
        setSelected(highlighted);
        break;

      case KEYBOARD.ESC:
        dispatch(arrow, 'click');
        break;

      default:
    }
  });

  for (let i = 0; i < optionsEl.childNodes.length; i++) {
    listen(optionsEl.childNodes[i] as HTMLDivElement, 'click', (event: MouseEvent) => event.currentTarget instanceof HTMLDivElement
      && setSelected(parseInt(getAttribute(event.currentTarget, 'data-key'), 10)),
    );

    listen(optionsEl.childNodes[i] as HTMLDivElement, 'mouseenter', (event: Event) => event.currentTarget instanceof HTMLDivElement
      && handleHighlight(parseInt(getAttribute(event.currentTarget, 'data-key'), 10)),
    );
  }

  // To Do: wrapper for click outside event
  window.addEventListener('click', (event) => {
    if (!element.contains(event.target as HTMLElement)) {
      performBlur();
    }
  });

  return element;
}
