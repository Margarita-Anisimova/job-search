
import { AccountType, ResumeType, CompanyType, VacancyType, WorkExpirienceType, EducationType } from './components/types';

export function createEmptyAccount(): AccountType {
    return {
        email: '',
        f_name: '',
        l_name: '',
        phone_number: '',
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
            gender: 'female',
            work_experience: 0,
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

export function createCompanyInfo(user_id = 0) {
    return {
        user_id: user_id,
        company_id: 0,
        fullname: '',
        city: '',
        description: '',
        contact_face: '',
        phone: '',
        email: '',
    }
}


export function createEmptyCompany(user_id = 0): CompanyType {
    return {
        companyInfo: createCompanyInfo(user_id),
        vacancies: []
    }
}


export function createEmptyVacancy(vacancy_id = 0, company_id = 0): VacancyType {
    return {
        vacancy_id: vacancy_id,
        company_id: company_id,
        position: '',
        profession_id: 0,
        work_experience: 'без опыта',
        education_level: 'Среднее',
        salary: '',
        work_type: [false, false, false, false, false],
        work_address: '',
        responsibilities: '',
        requirements: '',
    }
}


