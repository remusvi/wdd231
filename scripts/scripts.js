// Navigation Hamburger Toggle
const hamburgerElement = document.querySelector('#menu');
const navElement = document.querySelector('nav');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

// Course Array Data
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This is a course introducing programming concepts.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Introduction to HTML, CSS, and basic web standards.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Deep dive into functions, testing, and debugging in Python.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Object-oriented programming concepts using C#.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 230,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Advanced responsive design, DOM manipulation, and APIs.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development II',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Dynamic web applications, frameworks, and optimization.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseContainer = document.querySelector('#course-container');
const totalCreditsSpan = document.querySelector('#total-credits');
const filterAllBtn = document.querySelector('#all-courses');
const filterWddBtn = document.querySelector('#wdd-courses');
const filterCseBtn = document.querySelector('#cse-courses');

// Function to display courses and calculate credits using reduce()
function displayCourses(filteredCourses) {
    courseContainer.innerHTML = '';

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        if (course.completed) {
            card.classList.add('completed');
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>Credits: ${course.credits}</p>
        `;
        courseContainer.appendChild(card);
    });

    // Calculate total credits using reduce
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}

// Filter Event Listeners
filterAllBtn.addEventListener('click', () => {
    setActiveButton(filterAllBtn);
    displayCourses(courses);
});

filterWddBtn.addEventListener('click', () => {
    setActiveButton(filterWddBtn);
    displayCourses(courses.filter(course => course.subject === 'WDD'));
});

filterCseBtn.addEventListener('click', () => {
    setActiveButton(filterCseBtn);
    displayCourses(courses.filter(course => course.subject === 'CSE'));
});

function setActiveButton(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Initialize Page Load
displayCourses(courses);

// Footer Dynamic Dates
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;
