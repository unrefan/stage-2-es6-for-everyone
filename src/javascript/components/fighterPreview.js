import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  
  if (fighter) {
    const info = {
      image: createFighterImage(fighter),
      name: createFighterName(fighter),
      health: createFighterHealth(fighter),
      attack: createFighterAttack(fighter),
      defense: createFighterDefense(fighter),
    }
    
    Object.values(info).forEach(detailElement => fighterElement.append(detailElement));
  }

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
    text: fighter.health ?? '-'
  });
}

export function createFighterAttack(fighter) {
  return createElement({
    tagName: 'p',
    className: 'fighter-preview__attack',
    attributes: {},
    text: fighter.attack ?? '-'
  });
}

export function createFighterDefense(fighter) {
  return createElement({
    tagName: 'p',
    className: 'fighter-preview__defense',
    attributes: {},
    text: fighter.defense ?? '-'
  });
}
