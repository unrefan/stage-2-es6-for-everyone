import { controls } from '../../constants/controls';
import { EventEmitter } from '../helpers/domHelper';

const gameProps = (fighter, indicator = 'left') => ({
  ...fighter,
  criticalHitChance: 1,
  dodgeChance: 1,
  canAttack: true,
  canProc: true,
  effectiveHealth: fighter.health,
  healthBar: document.getElementById(`${indicator}-fighter-indicator`),
  get healthPercent() {
    if (this.effectiveHealth > 0) {
      return (this.effectiveHealth / this.health) * 100;
    }
    return 0;
  },
  set healthBarWidth(value) {
    this.healthBar.style.width = `${value}%`;
  }
});

const Emitter = new EventEmitter(window);
const START_EVENT = 'game-start';
const WIN_EVENT = 'game-win';
const EXTENTED_EVENT = 'game-extended';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    const one = gameProps(firstFighter, 'left');
    const two = gameProps(secondFighter, 'right');

    Emitter.on('keydown', handleKeyEvent(one, two, prepareAttack, prepareDefense), true);
    Emitter.on('keyup', handleKeyEvent(one, two, attack, defense), true);

    Emitter.emit(START_EVENT);
    Emitter.on(EXTENTED_EVENT, gameExtended(one, two));
    Emitter.on(WIN_EVENT, event => {
      Emitter.off('keydown', handleKeyEvent, true);
      Emitter.off('keyup', handleKeyEvent, true);

      resolve(event.detail);
    });
  });
}

function proc(one, two) {
  if (one.canProc) {
    one.canProc = false;

    console.log('proc');

    two.effectiveHealth -= one.attack * 2;    
    two.healthBarWidth = two.healthPercent;

    setTimeout(() => one.canProc = true, 1000 * 10);
  }
}

function gameExtended(one, two) {
  return function (event) {
    one.effectiveHealth = one.health;
    one.healthBarWidth = one.healthPercent / 3;
    two.effectiveHealth = one.health;
    two.healthBarWidth = two.healthPercent / 3;
  }
}

function handleKeyEvent(one, two, attack, defense) {
  return function (event) {
    switch(`Key${event.key.toUpperCase()}`) {
      case `${controls.PlayerOneAttack}`: { attack(one, two); break; }
      case `${controls.PlayerOneBlock}`: { defense(one, two); break; }
      case `${controls.PlayerTwoAttack}`: { attack(two, one); break; }
      case `${controls.PlayerTwoBlock}`: { defense(two, one); break; }
    }
  }
}

function prepareAttack(fighter) {
  if (fighter.canAttack) {
    fighter.criticalHitChance = getCriticalHitChance();
  }
}

function prepareDefense(fighter) {
  fighter.dodgeChance = getDodgeChance();
  fighter.canAttack = false;
}

function attack(firstFighter, secondFighter) {
  if (firstFighter.canAttack) {

    secondFighter.effectiveHealth -= getDamage(firstFighter, secondFighter);
    secondFighter.healthBarWidth = secondFighter.healthPercent;

    firstFighter.criticalHitChance = 1;

    if (secondFighter.effectiveHealth < 0 && firstFighter.effectiveHealth < 0) {
      return Emitter.emit(EXTENTED_EVENT);
    } else if (secondFighter.effectiveHealth < 0) {
      return Emitter.emit(WIN_EVENT, firstFighter);
    }
  }
}

function defense(firstFighter) {
  firstFighter.canAttack = true;
  firstFighter.dodgeChance = 1;
}

export function getDamage(attacker, defender) {
  let damage = 0;

  if ((damage = getHitPower(attacker) - getBlockPower(defender)) > 0) {
    return damage;
  }

  return 0;
}

export function getHitPower(fighter) {
  return fighter.attack * fighter.criticalHitChance;
}

export function getBlockPower(fighter) {
  return fighter.defense * fighter.dodgeChance;
}

function getCriticalHitChance() {
  return random(1, 2);
}

function getDodgeChance() {
  return random(1, 2);
}

function random(min, max) {
  return Math.random() * (max - min) + min; 
}
