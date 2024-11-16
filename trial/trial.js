// Select the left and right scroll sections
const leftSection = document.querySelector('.scroll-section.left');
const rightSection = document.querySelector('.scroll-section.right');

// Synchronize scrolling in opposite directions
leftSection.addEventListener('scroll', () => {
  rightSection.scrollTop = leftSection.scrollHeight - leftSection.scrollTop - leftSection.clientHeight;
});

rightSection.addEventListener('scroll', () => {
  leftSection.scrollTop = rightSection.scrollHeight - rightSection.scrollTop - rightSection.clientHeight;
});
