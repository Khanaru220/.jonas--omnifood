console.log('Hello world!');

const myName = 'Jonas Schmedtmann';
const h1 = document.querySelector('.heading-primary');
console.log(myName);
console.log(h1);

// h1.addEventListener("click", function () {
//   h1.textContent = myName;
//   h1.style.backgroundColor = "red";
//   h1.style.padding = "5rem";
// });

///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');

btnNavEl.addEventListener('click', function () {
	headerEl.classList.toggle('nav-open');
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function (link) {
	link.addEventListener('click', function (e) {
		e.preventDefault();
		const href = link.getAttribute('href');

		// Scroll back to top
		if (href === '#')
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});

		// Scroll to other links
		if (href !== '#' && href.startsWith('#')) {
			const sectionEl = document.querySelector(href);
			sectionEl.scrollIntoView({ behavior: 'smooth' });
		}

		// Close mobile naviagtion
		if (link.classList.contains('main-nav-link'))
			headerEl.classList.toggle('nav-open');
	});
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector('.section-hero');

const obs = new IntersectionObserver(
	function (entries) {
		const ent = entries[0];
		console.log(ent);

		if (ent.isIntersecting === false) {
			document.body.classList.add('sticky');
		}

		if (ent.isIntersecting === true) {
			document.body.classList.remove('sticky');
		}
	},
	{
		// In the viewport
		root: null,
		threshold: 0,
		rootMargin: '-80px',
	}
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
	var flex = document.createElement('div');
	flex.style.display = 'flex';
	flex.style.flexDirection = 'column';
	flex.style.rowGap = '1px';

	flex.appendChild(document.createElement('div'));
	flex.appendChild(document.createElement('div'));

	document.body.appendChild(flex);
	var isSupported = flex.scrollHeight === 1;
	flex.parentNode.removeChild(flex);
	console.log(isSupported);

	if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();

function verifyFix() {
	// based on CSS
	// .list {
	// 	display: flex;
	// 	flex-direction: column;
	// 	gap: 1.6rem;
	// }
	// .no-flexbox-gap .list-item:not(:last-child) {
	// 	margin-bottom: 1.6rem;
	// }
	// .gallery {
	// 	display: grid;
	// 	gap: 1.6rem;
	// }
	const elUseFlexGap = document.querySelector('.list');
	const elFixGap = document.querySelector('.list-item:not(:last-child)');
	const elUseGridGap = document.querySelector('.gallery');

	// Source: https://stackoverflow.com/a/6338234/14733188
	const flexGapValue = window.getComputedStyle(elUseFlexGap).gap;
	const marginValue = window.getComputedStyle(elFixGap).marginBottom;
	const gridGapValue = window.getComputedStyle(elUseGridGap).gap;

	const verboseMessage = `body's classes:  "${document.body.className}"
---
elUseFlexGap "${elUseFlexGap.className}": (gap: ${flexGapValue})
elFixGap "${elFixGap.className}": (margin-bottom: ${marginValue})

elUseGridGap "${elUseGridGap.className}": (grid-gap: ${gridGapValue})
---
isFlexFixed: ${parseInt(marginValue) > 0 ? 'yes' : 'no'}
isGridFixed: ${parseInt(gridGapValue) > 0 ? 'yes' : 'no'}
`;

	console.log(verboseMessage);
	alert(verboseMessage);
}
verifyFix();
