
export type VacancyType = {
    type: 'vacancy'
    name: string;
    salary: string;
    adress: string;
    description: string;
}

export type ResumesType = {
    type: 'resume'
    name: string;
    profession: string;
    city: string;
    experience: string;
}

export type WorkExpirienceType = {
    company: string;
    post: string;
    workStart: string;
    workEnd: string;
    responsibilities: string;
    achievements: string;
}

export type EducationType = {
    edlevel: string;
    university: string;
    faculty: string;
    specialization: string;
    edForm: string;
    edStart: string;
    edEnd: string;
}