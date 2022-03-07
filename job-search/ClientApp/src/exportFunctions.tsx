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
        work_type: [],
        ready_move: '',
        skills: '',
        profession: '',
        city: '',
        citizenship: '',
        education: [],
        workExperience: [],
    }
}