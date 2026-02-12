// ==========================================
// ADEi UNIVERSITY DIGITAL REGISTRAR - JS
// Date Constraints & Final Validation
// ==========================================

// === PROGRAM DATA ===
const undergradPrograms = {
    engineering: [
        { value: 'bs-architecture', text: 'BS Architecture' },
        { value: 'bs-chemical-eng', text: 'BS Chemical Engineering' },
        { value: 'bs-civil-eng', text: 'BS Civil Engineering' },
        { value: 'bs-computer-eng', text: 'BS Computer Engineering' },
        { value: 'bs-electrical-eng', text: 'BS Electrical Engineering' },
        { value: 'bs-electronics-eng', text: 'BS Electronics Engineering' },
        { value: 'bs-industrial-eng', text: 'BS Industrial Engineering' },
        { value: 'bs-mechanical-eng', text: 'BS Mechanical Engineering' }
    ],
    computer: [
        { value: 'bs-computer-science', text: 'BS Computer Science' },
        { value: 'bs-data-science', text: 'BS Data Science and Analytics' },
        { value: 'bs-entertainment-multimedia', text: 'BS Entertainment and Multimedia Computing' },
        { value: 'bs-information-technology', text: 'BS Information Technology' }
    ],
    business: [
        { value: 'bs-accountancy', text: 'BS Accountancy' },
        { value: 'bs-accounting-info-system', text: 'BS Accounting Information System' },
        { value: 'bs-business-admin', text: 'BS Business Administration' }
    ],
    arts: [
        { value: 'ba-english', text: 'Bachelor of Arts in English Language' },
        { value: 'ba-political-science', text: 'Bachelor of Arts in Political Science' }
    ]
};

const graduatePrograms = {
    doctorate: [
        { value: 'doctor-it', text: 'Doctor in Information Technology' },
        { value: 'doctor-eng-comp', text: 'Doctor of Engineering with Specialization in Computer Engineering' },
        { value: 'doctor-phd-cs', text: 'Doctor of Philosophy in Computer Science' }
    ],
    masters: [
        { value: 'master-info-systems', text: 'Master in Information Systems' },
        { value: 'master-it', text: 'Master in Information Technology' },
        { value: 'master-logistics', text: 'Master in Logistics and Supply Chain Management' },
        { value: 'master-eng-civil', text: 'Master of Engineering with Specialization in Civil Engineering' },
        { value: 'master-eng-comp', text: 'Master of Engineering with Specialization in Computer Engineering' },
        { value: 'master-eng-electrical', text: 'Master of Engineering with Specialization in Electrical Engineering' },
        { value: 'master-eng-electronics', text: 'Master of Engineering with Specialization in Electronics Engineering' },
        { value: 'master-eng-industrial', text: 'Master of Engineering with Specialization in Industrial Engineering' },
        { value: 'master-eng-mechanical', text: 'Master of Engineering with Specialization in Mechanical Engineering' },
        { value: 'master-cs', text: 'Master of Science in Computer Science' }
    ]
};

// === DOM ELEMENTS ===
const form = document.getElementById('registrationForm');
const dateOfBirth = document.getElementById('dateOfBirth');
const gsYear = document.getElementById('gsYear');
const jhsYear = document.getElementById('jhsYear');
const shsYear = document.getElementById('shsYear');
const gradeAverage = document.getElementById('gradeAverage');
const levelUndergrad = document.getElementById('levelUndergrad');
const levelGraduate = document.getElementById('levelGraduate');
const undergradSection = document.getElementById('undergradSection');
const gradSection = document.getElementById('gradSection');
const collegeDept = document.getElementById('collegeDept');
const degreeProgram = document.getElementById('degreeProgram');
const specializationSection = document.getElementById('specializationSection');
const specialization = document.getElementById('specialization');
const typeDoctorate = document.getElementById('typeDoctorate');
const typeMasters = document.getElementById('typeMasters');
const gradProgram = document.getElementById('gradProgram');

// === DATE CONSTRAINTS ===

// Set date constraints on page load
window.addEventListener('DOMContentLoaded', function() {
    setDateConstraints();
});

function setDateConstraints() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
    const currentDay = String(today.getDate()).padStart(2, '0');
    
    // Date of Birth: Must be at least 15 years old, max 100 years old
    const minBirthDate = new Date(currentYear - 100, 0, 1);
    const maxBirthDate = new Date(currentYear - 15, today.getMonth(), today.getDate());
    
    dateOfBirth.min = minBirthDate.toISOString().split('T')[0];
    dateOfBirth.max = maxBirthDate.toISOString().split('T')[0];
    
    console.log('Date constraints set:');
    console.log('Birth date range:', dateOfBirth.min, 'to', dateOfBirth.max);
}

// Validate date of birth in real-time
dateOfBirth.addEventListener('change', function() {
    const selectedDate = new Date(this.value);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    
    let actualAge = age;
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
        actualAge--;
    }
    
    if (actualAge < 15) {
        alert('You must be at least 15 years old to register.');
        this.value = '';
    } else if (actualAge > 100) {
        alert('Please enter a valid date of birth.');
        this.value = '';
    }
});

// === YEAR GRADUATED VALIDATION ===
function validateYearField(field) {
    field.addEventListener('input', function() {
        const currentYear = new Date().getFullYear();
        if (this.value > 2026) {
            this.value = 2026;
        }
        if (this.value < 1900) {
            this.value = 1900;
        }
    });
}

validateYearField(gsYear);
validateYearField(jhsYear);
validateYearField(shsYear);

// === GRADE AVERAGE VALIDATION ===
gradeAverage.addEventListener('input', function() {
    if (this.value > 100) {
        this.value = 100;
    }
    if (this.value < 75 && this.value !== '') {
        this.value = 75;
    }
});

// === ACADEMIC LEVEL TOGGLE ===
levelUndergrad.addEventListener('change', function() {
    if (this.checked) {
        undergradSection.style.display = 'block';
        gradSection.style.display = 'none';
        collegeDept.required = true;
        degreeProgram.required = true;
        gradProgram.required = false;
        
        // Clear graduate selections
        if (typeDoctorate) typeDoctorate.checked = false;
        if (typeMasters) typeMasters.checked = false;
        gradProgram.value = '';
    }
});

levelGraduate.addEventListener('change', function() {
    if (this.checked) {
        undergradSection.style.display = 'none';
        gradSection.style.display = 'block';
        gradProgram.required = true;
        collegeDept.required = false;
        degreeProgram.required = false;
        specialization.required = false;
        
        // Clear undergraduate selections
        collegeDept.value = '';
        degreeProgram.value = '';
        degreeProgram.innerHTML = '<option value="">Select Degree Program</option>';
        specializationSection.style.display = 'none';
        specialization.value = '';
    }
});

// === COLLEGE DEPARTMENT SELECTION ===
collegeDept.addEventListener('change', function() {
    const selectedDept = this.value;
    degreeProgram.innerHTML = '<option value="">Select Degree Program</option>';
    
    if (selectedDept && undergradPrograms[selectedDept]) {
        undergradPrograms[selectedDept].forEach(program => {
            const option = document.createElement('option');
            option.value = program.value;
            option.textContent = program.text;
            degreeProgram.appendChild(option);
        });
        degreeProgram.disabled = false;
    } else {
        degreeProgram.disabled = true;
    }
    
    specializationSection.style.display = 'none';
    specialization.value = '';
    specialization.required = false;
});

// === DEGREE PROGRAM SELECTION ===
degreeProgram.addEventListener('change', function() {
    if (this.value === 'bs-business-admin') {
        specializationSection.style.display = 'block';
        specialization.required = true;
    } else {
        specializationSection.style.display = 'none';
        specialization.value = '';
        specialization.required = false;
    }
});

// === GRADUATE PROGRAM TYPE ===
if (typeDoctorate) {
    typeDoctorate.addEventListener('change', function() {
        if (this.checked) {
            populateGraduatePrograms('doctorate');
        }
    });
}

if (typeMasters) {
    typeMasters.addEventListener('change', function() {
        if (this.checked) {
            populateGraduatePrograms('masters');
        }
    });
}

function populateGraduatePrograms(type) {
    gradProgram.innerHTML = '<option value="">Select Program</option>';
    
    if (graduatePrograms[type]) {
        graduatePrograms[type].forEach(program => {
            const option = document.createElement('option');
            option.value = program.value;
            option.textContent = program.text;
            gradProgram.appendChild(option);
        });
        gradProgram.disabled = false;
    }
}

// === PHONE NUMBER FORMATTING ===
const mobileNumber = document.getElementById('mobileNumber');
mobileNumber.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('63')) {
        value = value.substring(2);
    } else if (value.startsWith('0')) {
        value = value.substring(1);
    }
    
    if (value.length > 0) {
        if (value.length <= 3) {
            e.target.value = '+63 ' + value;
        } else if (value.length <= 6) {
            e.target.value = '+63 ' + value.substring(0, 3) + ' ' + value.substring(3);
        } else {
            e.target.value = '+63 ' + value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 10);
        }
    }
});

// === ZIP CODE VALIDATION ===
const zipCode = document.getElementById('zipCode');
zipCode.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').substring(0, 4);
});

// === FINAL FORM VALIDATION ===
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!this.checkValidity()) {
        alert('Please fill in all required fields marked with *');
        
        // Find first invalid field and focus on it
        const firstInvalid = this.querySelector(':invalid');
        if (firstInvalid) {
            firstInvalid.focus();
        }
        return;
    }
    
    // Validate date of birth
    const birthDate = new Date(dateOfBirth.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 15 || age > 100) {
        alert('Invalid date of birth. Age must be between 15 and 100 years.');
        dateOfBirth.focus();
        return;
    }
    
    // Validate academic level selection
    const academicLevel = document.querySelector('input[name="level"]:checked');
    
    if (academicLevel) {
        if (academicLevel.value === 'Undergraduate') {
            if (!collegeDept.value || !degreeProgram.value) {
                alert('Please select your college department and degree program.');
                collegeDept.focus();
                return;
            }
            
            if (degreeProgram.value === 'bs-business-admin' && !specialization.value) {
                alert('Please select your Business Administration specialization.');
                specialization.focus();
                return;
            }
        } else if (academicLevel.value === 'Graduate') {
            const gradType = document.querySelector('input[name="gradType"]:checked');
            if (!gradType || !gradProgram.value) {
                alert('Please select your graduate program type and program.');
                return;
            }
        }
    }
    
    // Validate year graduated sequence
    const gs = parseInt(gsYear.value);
    const jhs = parseInt(jhsYear.value);
    const shs = parseInt(shsYear.value);
    
    if (jhs < gs) {
        alert('Junior High School graduation year cannot be earlier than Grade School.');
        jhsYear.focus();
        return;
    }
    
    if (shs < jhs) {
        alert('Senior High School graduation year cannot be earlier than Junior High School.');
        shsYear.focus();
        return;
    }
    
    // Validate grade average
    const grade = parseFloat(gradeAverage.value);
    if (grade < 75 || grade > 100) {
        alert('Grade average must be between 75 and 100.');
        gradeAverage.focus();
        return;
    }
    
    // If all validations pass
    if (confirm('Are you sure you want to submit your registration? Please review all information before confirming.')) {
        submitForm();
    }
});

// === SUBMIT FORM ===
function submitForm() {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('=== FORM SUBMITTED ===');
    console.log('Registration Data:', data);
    
    const name = data.firstName + ' ' + (data.middleName || '') + ' ' + data.lastName;
    
    alert(`✓ Registration Successful!\n\nThank you, ${name}!\n\nYour registration has been submitted to ADEi University Digital Registrar.\n\nYou will receive a confirmation email at ${data.email} within 24-48 hours.`);
    
    // Reset form after successful submission
    form.reset();
    undergradSection.style.display = 'none';
    gradSection.style.display = 'none';
}

// === INITIALIZATION ===
console.log('ADEi University Digital Registrar - Form Initialized');
console.log('Date constraints and validation active');
