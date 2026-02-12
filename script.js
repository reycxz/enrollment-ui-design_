// ==========================================
// ADEi UNIVERSITY Digital Registrar System
// Date Constraints & Final Validation
// ==========================================

/*
 * INPUT VALIDATION RULES:
 * 
 * LETTERS ONLY (No Numbers):
 * - First Name, Middle Name, Last Name
 * - Religion
 * - City, Province
 * 
 * NUMBERS ONLY:
 * - Year Graduated (GS, JHS, SHS) - 4 digits, 1900-2026
 * - Grade Average - 75-100, allows decimals
 * - Mobile Number - 10 digits, auto-formatted
 * - Landline - 10 digits, auto-formatted
 * - Zip Code - exactly 4 digits
 * 
 * ALPHANUMERIC (Letters + Numbers):
 * - Street Address, Barangay
 * - School Names
 * - School Addresses
 * 
 * SPECIAL VALIDATION:
 * - Email - valid email format (user@domain.com)
 * - Date of Birth - age 15-100 years old
 * - Sequential Years - JHS >= GS, SHS >= JHS
 */

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

// === YEAR GRADUATED ADDITIONAL VALIDATION ===

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

// === INPUT VALIDATION - LETTERS ONLY ===
// Name fields should only accept letters, spaces, hyphens, and periods
const nameFields = [
    document.getElementById('firstName'),
    document.getElementById('middleName'),
    document.getElementById('lastName')
];

nameFields.forEach(field => {
    if (field) {
        field.addEventListener('input', function(e) {
            // Only allow letters, spaces, hyphens, periods, and apostrophes
            this.value = this.value.replace(/[^a-zA-Z\s\-\.\']/g, '');
        });
        
        // Capitalize first letter of each word on blur
        field.addEventListener('blur', function() {
            this.value = this.value
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        });
    }
});

// Religion field - letters only
const religion = document.getElementById('religion');
if (religion) {
    religion.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^a-zA-Z\s\-]/g, '');
    });
}

// === INPUT VALIDATION - NUMBERS ONLY ===
// Year fields - numbers only, 4 digits
const yearInputs = [
    document.getElementById('gsYear'),
    document.getElementById('jhsYear'),
    document.getElementById('shsYear')
];

yearInputs.forEach(field => {
    if (field) {
        field.addEventListener('input', function(e) {
            // Remove any non-numeric characters
            this.value = this.value.replace(/\D/g, '');
            // Limit to 4 digits
            if (this.value.length > 4) {
                this.value = this.value.slice(0, 4);
            }
        });
    }
});

// Grade Average - numbers and decimal only
if (gradeAverage) {
    gradeAverage.addEventListener('input', function(e) {
        // Only allow numbers and one decimal point
        let value = this.value.replace(/[^0-9.]/g, '');
        
        // Ensure only one decimal point
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        this.value = value;
        
        // Enforce min/max
        const numValue = parseFloat(value);
        if (numValue > 100) {
            this.value = '100';
        }
        if (numValue < 75 && value !== '' && !value.endsWith('.')) {
            this.value = '75';
        }
    });
    
    // Final validation on blur
    gradeAverage.addEventListener('blur', function() {
        if (this.value !== '') {
            const value = parseFloat(this.value);
            if (value < 75) this.value = '75';
            if (value > 100) this.value = '100';
        }
    });
}

// === PHONE NUMBER FORMATTING & VALIDATION ===
const mobileNumber = document.getElementById('mobileNumber');
if (mobileNumber) {
    // Prevent non-numeric keystrokes (allow navigation & control keys)
    mobileNumber.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
        if (allowedKeys.includes(e.key)) return;
        if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault();
        }
    });

    // Sanitize paste to only digits and apply formatting
    mobileNumber.addEventListener('paste', function(e) {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData('text') || '';
        const digits = pasted.replace(/\D/g, '');
        const current = this.value.replace(/\D/g, '');
        let combined = (current + digits).replace(/^63/, '').replace(/^0/, '').substring(0, 10);
        this.value = formatMobile(combined);
        this.dispatchEvent(new Event('input'));
    });

    mobileNumber.addEventListener('input', function(e) {
        // Remove all non-numeric characters
        let value = e.target.value.replace(/\D/g, '');

        // Remove leading 63 or 0
        if (value.startsWith('63')) {
            value = value.substring(2);
        } else if (value.startsWith('0')) {
            value = value.substring(1);
        }

        // Limit to 10 digits
        value = value.substring(0, 10);

        // If empty, clear value
        if (value.length === 0) {
            e.target.value = '';
            return;
        }

        // Format as +63 XXX XXX XXXX
        if (value.length <= 3) {
            e.target.value = '+63 ' + value;
        } else if (value.length <= 6) {
            e.target.value = '+63 ' + value.substring(0, 3) + ' ' + value.substring(3);
        } else {
            e.target.value = '+63 ' + value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 10);
        }
    });

    // Validate on blur
    mobileNumber.addEventListener('blur', function() {
        const digits = this.value.replace(/\D/g, '');
        if (digits.length > 0 && digits.length < 10) {
            alert('Mobile number must be 10 digits (e.g., +63 917 123 4567)');
            this.value = '';
        }
    });
}

// Landline - numbers only with formatting
const landline = document.getElementById('landline');
if (landline) {
    // Prevent non-numeric keystrokes (allow navigation & control keys)
    landline.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
        if (allowedKeys.includes(e.key)) return;
        if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault();
        }
    });

    // Sanitize paste for landline
    landline.addEventListener('paste', function(e) {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData('text') || '';
        const digits = pasted.replace(/\D/g, '').substring(0, 10);
        this.value = formatLandline(digits);
        this.dispatchEvent(new Event('input'));
    });

    landline.addEventListener('input', function(e) {
        // Remove all non-numeric characters
        let value = e.target.value.replace(/\D/g, '');

        // Limit to 10 digits
        value = value.substring(0, 10);

        // If empty, clear
        if (value.length === 0) {
            e.target.value = '';
            return;
        }

        // Format as (02) XXXX XXXX
        if (value.length <= 2) {
            e.target.value = '(' + value;
        } else if (value.length <= 6) {
            e.target.value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
        } else {
            e.target.value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 6) + ' ' + value.substring(6, 10);
        }
    });
}

// Helpers
function formatMobile(digits) {
    digits = (digits || '').replace(/\D/g, '').substring(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return '+63 ' + digits;
    if (digits.length <= 6) return '+63 ' + digits.substring(0, 3) + ' ' + digits.substring(3);
    return '+63 ' + digits.substring(0, 3) + ' ' + digits.substring(3, 6) + ' ' + digits.substring(6, 10);
}

function formatLandline(digits) {
    digits = (digits || '').replace(/\D/g, '').substring(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 2) return '(' + digits;
    if (digits.length <= 6) return '(' + digits.substring(0, 2) + ') ' + digits.substring(2);
    return '(' + digits.substring(0, 2) + ') ' + digits.substring(2, 6) + ' ' + digits.substring(6, 10);
}

// === ZIP CODE VALIDATION - NUMBERS ONLY ===
const zipCode = document.getElementById('zipCode');
if (zipCode) {
    zipCode.addEventListener('input', function(e) {
        // Only allow numbers
        this.value = this.value.replace(/\D/g, '');
        // Limit to 4 digits
        this.value = this.value.substring(0, 4);
    });
    
    zipCode.addEventListener('blur', function() {
        if (this.value.length > 0 && this.value.length < 4) {
            alert('Zip code must be exactly 4 digits');
            this.value = '';
        }
    });
}

// === ADDRESS VALIDATION - ALPHANUMERIC ===
const addressFields = [
    document.getElementById('street'),
    document.getElementById('barangay')
];

addressFields.forEach(field => {
    if (field) {
        field.addEventListener('input', function(e) {
            // Allow letters, numbers, spaces, commas, periods, hyphens
            this.value = this.value.replace(/[^a-zA-Z0-9\s\,\.\-]/g, '');
        });
    }
});

// === CITY AND PROVINCE - LETTERS ONLY ===
const locationFields = [
    document.getElementById('city'),
    document.getElementById('province')
];

locationFields.forEach(field => {
    if (field) {
        field.addEventListener('input', function(e) {
            // Only allow letters, spaces, and hyphens
            this.value = this.value.replace(/[^a-zA-Z\s\-]/g, '');
        });
        
        // Capitalize on blur
        field.addEventListener('blur', function() {
            this.value = this.value
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        });
    }
});

// === SCHOOL NAME AND ADDRESS VALIDATION ===
const schoolNameFields = [
    document.getElementById('gsName'),
    document.getElementById('jhsName'),
    document.getElementById('shsName')
];

schoolNameFields.forEach(field => {
    if (field) {
        field.addEventListener('input', function(e) {
            // Allow letters, numbers, spaces, periods, hyphens, apostrophes, commas
            this.value = this.value.replace(/[^a-zA-Z0-9\s\.\-\'\,]/g, '');
        });
    }
});

const schoolAddressFields = [
    document.getElementById('gsAddress'),
    document.getElementById('jhsAddress'),
    document.getElementById('shsAddress')
];

schoolAddressFields.forEach(field => {
    if (field) {
        field.addEventListener('input', function(e) {
            // Allow letters, numbers, spaces, commas, periods, hyphens
            this.value = this.value.replace(/[^a-zA-Z0-9\s\,\.\-]/g, '');
        });
    }
});

// === EMAIL VALIDATION ===
const emailField = document.getElementById('email');
if (emailField) {
    emailField.addEventListener('blur', function() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value !== '' && !emailPattern.test(this.value)) {
            alert('Please enter a valid email address (e.g., student@example.com)');
            this.setCustomValidity('Invalid email format');
        } else {
            this.setCustomValidity('');
        }
    });
    
    emailField.addEventListener('input', function() {
        this.setCustomValidity('');
    });
}

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
    
    alert(`✓ Registration Successful!\n\nThank you, ${name}!\n\nYour registration has been submitted to TIP Manila Digital Registrar.\n\nYou will receive a confirmation email at ${data.email} within 24-48 hours.`);
    
    // Reset form after successful submission
    form.reset();
    undergradSection.style.display = 'none';
    gradSection.style.display = 'none';
}

// === INITIALIZATION ===
console.log('ADEi UNIVERSITY Digital Registrar System - Form Initialized');
console.log('Date constraints and validation active');