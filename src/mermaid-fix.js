// Mermaid importuje `select` z "d3", które ma sideEffects: false, więc bundler wycina d3-transition
// i podpowiedź nad węzłem diagramu rzuca „tooltipElem.transition is not a function”.
// Import wymusza dołączenie d3-transition. Usunąć, gdy Mermaid naprawi to u siebie.
import 'd3-transition';
