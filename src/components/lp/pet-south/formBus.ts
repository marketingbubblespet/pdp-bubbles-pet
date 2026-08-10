// Barramento simples pra abrir o modal de agendamento a partir de qualquer botão da LP,
// sem precisar de um Context/Provider envolvendo a página inteira. Qualquer seção cliente
// chama openPetSouthForm() no onClick; o PetSouthForm escuta o evento e abre o modal.
export const OPEN_FORM_EVENT = 'pet-south:open-form'

export function openPetSouthForm() {
  window.dispatchEvent(new Event(OPEN_FORM_EVENT))
}
