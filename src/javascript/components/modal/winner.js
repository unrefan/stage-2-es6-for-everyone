import { showModal, hideModal } from './modal';
import { createFighterImage } from '../../components/fighterPreview';
import { createElement, EventEmitter } from '../../helpers/domHelper';

const Emitter = new EventEmitter(window);

export function showWinnerModal(fighter) {
  showModal({
    title: `Winner is ${fighter.name}`,
    bodyElement: createBody(fighter)
  }) 
}

function createBody(fighter) {
  const body = createElement({
    tagName: 'div',
    className: 'winner__body'
  });
  const winnerImage = createFighterImage(fighter);

  const btns = createElement({
    tagName: 'div',
    className: 'winner__btns'
  });
  const restartBtn = createElement({
    tagName: 'button',
    className: `preview-container___fight-btn`,
    attributes: {},
    text: 'Restart',
  });

  const revanshBtn = createElement({
    tagName: 'button',
    className: `preview-container___fight-btn`,
    attributes: {},
    text: 'Revansh',
  });

  restartBtn.addEventListener('click', restart, false);
  revanshBtn.addEventListener('click', revansh, false);

  btns.append(restartBtn);
  btns.append(revanshBtn);

  body.append(winnerImage);
  body.append(btns);

  return body;
}

function restart() {
  Emitter.emit('restart');
  hideModal();
}

function revansh() {
  Emitter.emit('revansh');
  hideModal();
}
