import internal from "assert";

export type AccountType = {
    user_id: number;
    email: string;
    f_name: string;
    l_name: string;
    phone_number: string;
    user_type: string;
    password: string;
}

export type ResumeType = {
    resumeInfo: ResumeInfoType;
    education: EducationType[];
    workExperience: WorkExpirienceType[];
}

export type ResumeInfoType = {
    user_id: number;
    resume_id: number;
    birth_date: string;
    desired_position: string;
    desired_salary: string;
    work_type: boolean[];
    ready_move: boolean;
    skills: {};
    profession_id: number;
    city: string;
    education_level: string;
    gender: 'male' | 'female';
    citizenship: string;
    work_experience: number;
    publication_date: string;
}

export type EducationType = {
    education_id: number;
    institution: string;
    specialization: string;
    education_type: string;
    resume_id: number;
    graduation_year: string;
    status: string;
}

export type WorkExpirienceType = {
    work_experience_id: number;
    company: string;
    post: string;
    date_start: string;
    date_end: string;
    experience_description: string;
    resume_id: number;
    status: string;
}

export type CompanyType = {
    companyInfo: CompanyInfoType;
    vacancies: VacancyType[];
}

export type CompanyInfoType = {
    user_id: number;
    company_id: number;
    fullname: string;
    city: string;
    description: string;
    contact_face: string;
    phone: string;
    email: string;
    tin: string;

}


export type VacancyType = {
    vacancy_id: number;
    company_id: number;
    position: string;
    profession_id: number;
    work_experience: string;
    education_level: string;
    salary: string;
    work_type: boolean[];
    work_address: string;
    responsibilities: string;
    requirements: string;
    publication_date: string;
}




