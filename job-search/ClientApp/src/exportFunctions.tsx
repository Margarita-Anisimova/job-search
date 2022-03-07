export function createEmptyAccount() {
    return {
        email: '',
        f_name: '',
        l_name: '',
        phoneNumber: '',
        user_type: 'noRegistered',
        citizenship: '',
        city: '',
        gender: '',
        user_id: 0
    }
}

export function createEmptyResume() {
    return {
        birth_date: '',
        desired_position: '',
        desired_salary: '',
        work_type: [false, false, false, false, false],
        ready_move: 'yes',
        skills: {},
        profession: '',
        city: '',
        citizenship: '',
        education: [{
            edlevel: '',
            university: '',
            faculty: '',
            specialization: '',
            edForm: 'full-time',
            edStart: '1950',
            edEnd: '1950',
        }],
        workExperience: [{
            company: '',
            post: '',
            workStart: '1950',
            workEnd: '1950',
            responsibilities: '',
            achievements: '',
        }],
    }
}