
import { AccountType, ResumeType, CompanyType, VacancyType } from './components/types';

export function createEmptyAccount(): AccountType {
    return {
        email: '',
        f_name: '',
        l_name: '',
        phoneNumber: '',
        user_type: 'employer',
        gender: '',
        user_id: 0
    }
}
//'noRegistered',
export function createEmptyResume(): ResumeType {
    return {
        user_id: 0,
        resume_id: 0,
        birth_date: '',
        desired_position: '',
        desired_salary: '',
        work_type: [false, false, false, false, false],
        ready_move: 'yes',
        skills: {},
        profession: '',
        city: '',
        citizenship: '',
        education_level: '',
        education: [{
            education_id: 0,
            institution: '',
            faculty: '',
            specialization: '',
            resume_id: 0,
            education_type: 'full-time',
            graduation_year: '1950',
        }],
        workExperience: [{
            work_experience_id: 0,
            company: '',
            post: '',
            date_start: '1950',
            date_end: '1950',
            experience_description: '',
        }],
    }
}

export function createEmptyCompany(): CompanyType {
    return {
        user_id: 0,
        company_id: 0,
        fullname: '',
        city: '',
        description: '',
        contact_face: '',
        phone: '',
        email: '',
        vacancies: []
    }
}


export function createEmptyVacancy(): VacancyType {
    return {
        vacancy_id: 0,
        company_id: 0,
        vacancy_name: '',
        position: '',
        profession: '',
        work_experience: 'без опыта',
        education_type: 'Среднее',
        salary: '',
        work_type: 'Гибкий',
        work_address: '',
        responsibilities: '',
        requirements: '',
    }
}


