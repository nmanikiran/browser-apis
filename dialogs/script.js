document.addEventListener('DOMContentLoaded', () => {
  let $updateButton = document.getElementById('updateDetails');
  let favDialog = document.getElementById('favDialog');
  let $outputBox = document.querySelector('output');
  let $selectEl = document.querySelector('select');
  let confirmBtn = document.getElementById('confirmBtn');

  function openCheck(dialog) {
    if (dialog.open) {
      console.log('Dialog open');
    } else {
      console.log('Dialog closed');
    }
  }

  // "Update details" button opens the <dialog> modally
  $updateButton.addEventListener('click', () => {
    if (typeof favDialog.showModal === 'function') {
      favDialog.showModal();
      openCheck(favDialog);
    } else {
      alert('The <dialog> API is not supported by this browser');
    }
  });
  // "Favorite animal" input sets the value of the submit button
  $selectEl.addEventListener('change', (e) => {
    confirmBtn.value = $selectEl.value;
  });
  // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
  favDialog.addEventListener('close', () => {
    $outputBox.value = `
			${favDialog.returnValue} is selected on - ${new Date().toString()}`;
    openCheck(favDialog);
  });
});
