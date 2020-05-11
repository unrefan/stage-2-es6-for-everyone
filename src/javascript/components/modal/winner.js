import { showModal } from './modal';
import { createFighterPreview } from '../../components/fighterPreview';

export function showWinnerModal(fighter) {
  showModal({
    title: `Winner is ${fighter.name}`,
    bodyElement: createFighterPreview(fighter)
  }) 
}
