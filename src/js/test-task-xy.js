function generateRandomNumbers() {
  const numbers = [];
  for (let i = 0; i < 4; i++) {
    const randomNumber = Math.floor(Math.random() * 10);
    numbers.push(randomNumber);
  }
  const id = numbers.join('');
  return id;
}

const input = document.getElementById('user-input');
const text = document.getElementById('user-output');
const ok = document.getElementById('ok-button');
const bigZone = document.body;

let isMouseDown = false;
let selectionStartIndex = -1;
let selectionEndIndex = -1;
let dataToDrag = [];

text.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);
text.addEventListener('mousemove', handleMouseMove);
text.addEventListener('click', handleClick);

function handleMouseDown(event) {
  isMouseDown = true;
  const startX = event.clientX;
  const startY = event.clientY;
  const spans = Array.from(text.children);
  selectionStartIndex = -1;
  selectionEndIndex = -1;

  spans.forEach((span, index) => {
    const rect = span.getBoundingClientRect();
    if (
      startX >= rect.left &&
      startX <= rect.right &&
      startY >= rect.top &&
      startY <= rect.bottom
    ) {
      selectionStartIndex = index;
      selectionEndIndex = index;
      toggleSelection(span);
    }
  });
}

function handleMouseMove(event) {
  if (isMouseDown) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const spans = Array.from(text.children);
    selectionEndIndex = -1;

    spans.forEach((span, index) => {
      const rect = span.getBoundingClientRect();
      if (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom
      ) {
        selectionEndIndex = index;
        toggleSelection(span);
      }
    });
  }
}

function handleMouseUp(event) {
  isMouseDown = false;
  createCombinedSpan();
}

function handleClick(event) {
  const target = event.target;
  if (target.tagName.toLowerCase() === 'span') {
    if (!event.ctrlKey) {
      clearSelection();
    }
    toggleSelection(target);
  }
}

function toggleSelection(span) {
  if (span.classList.contains('selected')) {
    span.classList.remove('selected');
  } else {
    span.classList.add('selected');
  }
}

function createCombinedSpan() {
  const selectedSpans = text.querySelectorAll('.selected');

  if (selectedSpans.length === 0) {
    return;
  }

  const combinedSpan = document.createElement('span');
  combinedSpan.setAttribute('draggable', 'true');
  combinedSpan.setAttribute('id', generateRandomNumbers());
  combinedSpan.classList.add('combined-item');

  const firstSelectedSpan = selectedSpans[0];
  const parentElement = firstSelectedSpan.parentNode;

  parentElement.insertBefore(combinedSpan, firstSelectedSpan);

  selectedSpans.forEach(span => {
    combinedSpan.textContent += span.textContent;
    span.parentNode.removeChild(span);
  });

  clearSelection();

  combinedSpan.addEventListener('dragstart', event => {
    event.dataTransfer.setData('text/plain', combinedSpan.id);
  });

  combinedSpan.addEventListener('dragend', event => {
    event.target.style.opacity = '';
  });
}

function clearSelection() {
  const selectedSpans = text.querySelectorAll('.selected');
  selectedSpans.forEach(span => {
    span.classList.remove('selected');
  });
}

ok.addEventListener('click', () => {
  const inputValue = input.value;

  inputValue.split('').forEach(letter => {
    const span = document.createElement('span');
    span.setAttribute('draggable', 'true');
    span.setAttribute('id', generateRandomNumbers());
    span.classList.add('item');
    span.textContent = letter;
    text.appendChild(span);

    span.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', event.target.id);
    });

    span.addEventListener('dragend', event => {
      event.target.style.opacity = '';
    });
  });
});

function allowDrop(event) {
  event.preventDefault();
}

text.ondragover = allowDrop;
bigZone.ondragover = allowDrop;

text.ondrop = drop;
bigZone.ondrop = dropOnTheBody;

function drop(event) {
  event.preventDefault();
  let itemId = event.dataTransfer.getData('text/plain');
  let draggedElement = document.getElementById(itemId);
  let target = event.target.closest('.item');

  if (draggedElement) {
    if (target) {
      if (
        event.clientY <
        target.getBoundingClientRect().top + target.offsetHeight / 2
      ) {
        target.parentNode.insertBefore(draggedElement, target);
      } else {
        target.parentNode.insertBefore(draggedElement, target.nextSibling);
      }
    } else {
      text.appendChild(draggedElement);
    }

    draggedElement.style.position = '';
    draggedElement.style.left = '';
    draggedElement.style.top = '';
  }
}

function dropOnTheBody(event) {
  if (event.target === text || text.contains(event.target)) {
    return;
  }

  event.preventDefault();
  let itemId = event.dataTransfer.getData('text/plain');
  let draggedElement = document.getElementById(itemId);

  if (!draggedElement) {
    console.error('Error: Dragged element not found.');
    return;
  }

  if (!bigZone.contains(draggedElement)) {
    console.error('Error: Dragged element is not in the expected container.');
    return;
  }

  draggedElement.style.position = 'absolute';
  draggedElement.style.left = event.clientX + 'px';
  draggedElement.style.top = event.clientY + 'px';

  bigZone.appendChild(draggedElement);
}
