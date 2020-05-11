import { createElement, EventEmitter } from '../helpers/domHelper';

const Emitter = new EventEmitter(window);

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  fighterElement.addEventListener('click', changeFighter(fighterElement, fighter));

  const infoContainer = createElement({
    tagName: 'div',
    className: `fighter-preview___info ${positionClassName}`,
  });

  if (fighter) {
    const image = createFighterImage(fighter);
    const info = {
      name: createFighterName(fighter),
      health: createFighterHealth(fighter),
      attack: createFighterAttack(fighter),
      defense: createFighterDefense(fighter),
    }
    
    fighterElement.append(image);
    Object.values(info).forEach(detailElement => infoContainer.append(detailElement));
  }

  fighterElement.append(infoContainer);

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

export function createFighterName(fighter) {
  return createElement({
    tagName: 'p',
    className: 'fighter-preview__name',
    attributes: {},
    text: fighter.name ?? '-'
  });
}

export function createFighterHealth(fighter) {
  return createElement({
    tagName: 'p',
    className: 'fighter-preview__health',
    attributes: {},
    text: `Health:  ${fighter.health}` ?? '-'
  });
}

export function createFighterAttack(fighter) {
  return createElement({
    tagName: 'p',
    className: 'fighter-preview__attack',
    attributes: {},
    text: `Attack:  ${fighter.attack}` ?? '-'
  });
}

export function createFighterDefense(fighter) {
  return createElement({
    tagName: 'p',
    className: 'fighter-preview__defense',
    attributes: {},
    text: `Defense: ${fighter.defense}` ?? '-'
  });
}

function changeFighter(elem, fighter) {
  return (event) => {
    Array.from(elem.children).forEach(child => child.remove());

    Emitter.emit('change-fighter', fighter);
  }
}