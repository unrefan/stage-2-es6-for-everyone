import { createElement, EventEmitter } from '../helpers/domHelper';
import { createFighterImage } from './fighterPreview';
import { fight } from './fight';
import { showWinnerModal } from './modal/winner';

const Emitter = new EventEmitter(window);

export async function renderArena(selectedFighters) {
  const root = document.getElementById('root');
  const arena = createArena(selectedFighters);
  const fightText = createFightText();

  root.innerHTML = '';
  root.append(arena);

  const [leftFighter, rightFighter] = selectedFighters;

  Emitter.once('game-start', event => {
    root.append(fightText);
    setTimeout(() => fightText.remove(), 1000);
  });

  fight(leftFighter, rightFighter)
    .then(winner => showWinnerModal(winner))
    .catch(error => console.error(error));

  Emitter.on('revansh', () => {
    document.getElementById(`left-fighter-indicator`).style.width = '100%';
    document.getElementById(`right-fighter-indicator`).style.width = '100%';

    fight(leftFighter, rightFighter)
    .then(winner => showWinnerModal(winner))
    .catch(error => console.error(error));
  });
}

function createFightText() {
  const container = createElement({ tagName: 'div', className: 'preview-container___versus-block fight' });
  const fight = createElement({
    tagName: 'div',
    className: 'preview-container___versus-fight',
    attributes: { },
    text: 'Fight !',
  });

  container.append(fight);

  return container;
}

function createArena(selectedFighters) {
  const arena = createElement({ tagName: 'div', className: 'arena___root' });
  const healthIndicators = createHealthIndicators(...selectedFighters);
  const fighters = createFighters(...selectedFighters);
  
  arena.append(healthIndicators, fighters);
  return arena;
}

function createHealthIndicators(leftFighter, rightFighter) {
  const healthIndicators = createElement({ tagName: 'div', className: 'arena___fight-status' });
  const versusSign = createElement({ tagName: 'div', className: 'arena___versus-sign' });
  const leftFighterIndicator = createHealthIndicator(leftFighter, 'left');
  const rightFighterIndicator = createHealthIndicator(rightFighter, 'right');

  healthIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator);
  return healthIndicators;
}

function createHealthIndicator(fighter, position) {
  const { name } = fighter;
  const container = createElement({ tagName: 'div', className: 'arena___fighter-indicator' });
  const fighterName = createElement({ tagName: 'span', className: 'arena___fighter-name' });
  const indicator = createElement({ tagName: 'div', className: 'arena___health-indicator' });
  const bar = createElement({ tagName: 'div', className: 'arena___health-bar', attributes: { id: `${position}-fighter-indicator` }});

  fighterName.innerText = name;
  indicator.append(bar);
  container.append(fighterName, indicator);

  return container;
}

function createFighters(firstFighter, secondFighter) {
  const battleField = createElement({ tagName: 'div', className: `arena___battlefield` });
  const firstFighterElement = createFighter(firstFighter, 'left');
  const secondFighterElement = createFighter(secondFighter, 'right');

  battleField.append(firstFighterElement, secondFighterElement);
  return battleField;
}

function createFighter(fighter, position) {
  const imgElement = createFighterImage(fighter);
  const positionClassName = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const fighterElement = createElement({
    tagName: 'div',
    className: `arena___fighter ${positionClassName}`,
  });

  fighterElement.append(imgElement);
  return fighterElement;
}
