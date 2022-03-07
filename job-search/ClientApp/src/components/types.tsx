
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
    birth_date: string;
    desired_position: string;
    desired_salary: string;
    work_type: boolean[];
    ready_move: string;
    skills: any;
    profession: string;
    city: string;
    citizenship: string;
    education: EducationType[];
    workExperience: WorkExpirienceType[];
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

export type WorkExpirienceType = {
    company: string;
    post: string;
    workStart: string;
    workEnd: string;
    responsibilities: string;
    achievements: string;
}






export type VacancyType = {
    type: 'vacancy'
    name: string;
    salary: string;
    adress: string;
    description: string;

}





export type CompanyType = {
    email: string;
    f_name: string;
    l_name: string;
    phoneNumber: string;
    user_type: string;
    age: number;
    city: string;
    citizenship: string;
    gender: string;
}