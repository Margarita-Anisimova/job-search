
export type AccountType = {
    user_id: number;
    email: string;
    f_name: string;
    l_name: string;
    phoneNumber: string;
    user_type: string;
    gender: string;
}

export type ResumeType = {
    user_id: number;
    resume_id: number;
    birth_date: string;
    desired_position: string;
    desired_salary: string;
    work_type: boolean[];
    ready_move: string;
    skills: any;
    profession: string;
    city: string;
    education_level: string;
    citizenship: string;
    education: EducationType[];
    workExperience: WorkExpirienceType[];
}


export type EducationType = {
    education_id: number;
    institution: string;
    faculty: string;
    specialization: string;
    education_type: string;
    resume_id: number;
    graduation_year: string;
}

export type WorkExpirienceType = {
    work_experience_id: number;
    company: string;
    post: string;
    date_start: string;
    date_end: string;
    experience_description: string;
}

export type CompanyType = {
    user_id: number;
    company_id: number;
    fullname: string;
    city: string;
    description: string;
    contact_face: string;
    phone: string;
    email: string;
    vacancies: VacancyType[]
}

export type VacancyType = {
    vacancy_id: number;
    company_id: number;
    vacancy_name: string;
    position: string;
    profession: string;
    work_experience: string;
    education_type: string;
    salary: string;
    work_type: string;
    work_address: string;
    responsibilities: string;
    requirements: string;
}




