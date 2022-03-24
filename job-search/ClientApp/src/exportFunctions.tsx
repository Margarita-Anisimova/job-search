
import { AccountType, ResumeType, CompanyType, VacancyType, WorkExpirienceType, EducationType } from './components/types';

export function createEmptyAccount(): AccountType {
    return {
        email: '',
        f_name: '',
        l_name: '',
        phoneNumber: '',
        user_type: 'noRegistered',
        password: '',
        user_id: 0
    }
}
//'noRegistered',employer
export function createEmptyResume(user_id = 0): ResumeType {
    return {
        resumeInfo: {
            user_id: user_id,
            resume_id: 0,
            birth_date: '::',
            desired_position: '',
            desired_salary: '',
            work_type: [false, false, false, false, false],
            ready_move: true,
            skills: {},
            profession_id: 0,
            city: '',
            citizenship: '',
            education_level: 'Нет образования',
            gender: 'female'
        },
        education: [],
        workExperience: [createEmptyWorkExperience()],
    }
}

export function createEmptyEducation(resume_id = 0): EducationType {
    return {
        education_id: 0,
        institution: '',
        specialization: '',
        resume_id: resume_id,
        education_type: 'full-time',
        graduation_year: '',
        status: 'add'
    }
}


export function createEmptyWorkExperience(resume_id = 0): WorkExpirienceType {
    return {
        work_experience_id: 0,
        company: '',
        resume_id: resume_id,
        post: '',
        date_start: '',
        date_end: '',
        experience_description: '',
        status: 'add'
    }
}


export function createEmptyCompany(): CompanyType {
    return {
        user_id: 0,
        company_id: 0,
        fullname: '',
        city: '',
        description: '',
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


