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
  const startIndex = Array.from(text.children).indexOf(event.target);
  selectionStartIndex = startIndex;
  selectionEndIndex = startIndex;
  handleSelection(selectionStartIndex, selectionEndIndex);
}

function isMouseOverSpan(event) {
  const elementMouseIsOver = document.elementFromPoint(
    event.clientX,
    event.clientY
  );
  return elementMouseIsOver.tagName.toLowerCase() === 'span';
}

function handleMouseUp(event) {
  if (isMouseDown && dataToDrag.length > 0 && isMouseOverSpan(event)) {
    createCombinedSpan();
  }
  isMouseDown = false;
}

function handleMouseMove(event) {
  if (isMouseDown) {
    const endIndex = Array.from(text.children).indexOf(event.target);
    selectionEndIndex = endIndex;
    handleSelection(selectionStartIndex, selectionEndIndex);
  }
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

function handleSelection(startIndex, endIndex) {
  const spans = text.querySelectorAll('.item');
  spans.forEach((span, index) => {
    if (index >= startIndex && index <= endIndex) {
      span.classList.add('selected');

      const id = span.id;
      if (!dataToDrag.includes(id)) {
        dataToDrag.push(id);
      }
    } else {
      span.classList.remove('selected');

      const idIndex = dataToDrag.indexOf(span.id);
      if (idIndex !== -1) {
        dataToDrag.splice(idIndex, 1);
      }
    }
  });
}

console.log(dataToDrag);

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

function createCombinedSpan() {
  const combinedSpan = document.createElement('span');
  combinedSpan.setAttribute('draggable', 'true');
  combinedSpan.setAttribute('id', generateRandomNumbers());
  combinedSpan.classList.add('combined-item');

  const selectedSpans = text.querySelectorAll('.selected');

  const firstSelectedSpan = selectedSpans[0]; // Get the first selected span
  const parentElement = firstSelectedSpan.parentNode; // Get the parent node of the first selected span

  // Insert the combined span before the first selected span
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

  draggedElement.style.position = 'absolute';
  draggedElement.style.left = event.clientX + 'px';
  draggedElement.style.top = event.clientY + 'px';

  bigZone.appendChild(draggedElement);
}

function toggleSelection(span) {
  if (span.classList.contains('selected')) {
    span.classList.remove('selected');
  } else {
    span.classList.add('selected');
  }
}
