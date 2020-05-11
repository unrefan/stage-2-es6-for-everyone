export function createElement({ tagName, className, attributes = {}, text = '' }) {
  const element = document.createElement(tagName);

  if (className) {
    const classNames = className.split(' ').filter(Boolean);
    element.classList.add(...classNames);
  }

  Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));

  element.innerText = text;

  return element;
}

export class EventEmitter {
  constructor(target = null) {
    this.target = target ?? new EventTarget();
  }
  on(eventName, listener) {
    return this.target.addEventListener(eventName, listener);
  }
  once(eventName, listener) {
    return this.target.addEventListener(eventName, listener, { once: true });
  }
  off(eventName, listener) {
    return this.target.removeEventListener(eventName, listener);
  }
  emit(eventName, detail) {
    return this.target.dispatchEvent(
      new CustomEvent(eventName, { detail, cancelable: true })
    );
  }
}
