document.addEventListener('DOMContentLoaded', () => {
  const $draggable_list = document.querySelector('#draggable-list');
  const $check = document.querySelector('#check');
  const $reset = document.querySelector('#reset');

  const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Bernard Arnault',
    'Warren Buffett',
    'Larry Ellison',
    'Amancio Ortega',
    'Mark Zuckerberg',
    'Jim Walton',
    'Alice Walton',
    'Rob Walton'
  ];

  // Store listitems
  const listItems = [];
  let dragStartIndex;

  // Insert list items into DOM
  function createList(list) {
    var fragment = document.createDocumentFragment();
    [...list]
      .map((a) => ({ value: a, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
      .forEach((person, index) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

        listItems.push(listItem);
        fragment.appendChild(listItem);
      });

    $draggable_list.appendChild(fragment);

    addEventListeners();
  }

  function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
  }

  function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
  }

  function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
  }

  function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
  }

  function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
  }

  // Swap list items that are drag and drop
  function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
  }

  // Check the order of list items
  function checkOrder() {
    listItems.forEach((listItem, index) => {
      const personName = listItem.querySelector('.draggable').innerText.trim();

      if (personName !== richestPeople[index]) {
        listItem.classList.add('wrong');
      } else {
        listItem.classList.remove('wrong');
        listItem.classList.add('right');
      }
    });
  }

  function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach((item) => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('dragleave', dragLeave);
    });
  }

  $check.addEventListener('click', checkOrder);
  $reset.addEventListener('click', () => {
    $draggable_list.innerHTML = '';
    createList(richestPeople.slice().sort());
  });

  createList(richestPeople);
});
