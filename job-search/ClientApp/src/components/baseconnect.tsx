import { crypto } from './encryption'



export async function getResumesByFilters(filters, method) {
    let str = `resume/?`
    Object.keys(filters).forEach(key => { str += `${key}=${filters[key]}&` })
    const response = await fetch(str);
    const data = await response.json();
    method(data);
}

export async function getVacanciesByFilters(filters, method) {
    let str = `vacancy/?`
    Object.keys(filters).forEach(key => { str += `${key}=${filters[key]}&` })
    const response = await fetch(str);
    const data = await response.json();
    method(data);
}


export async function getUserByEmail(email: string, password: string) {
    let data = await fetch(`user/${email}/${crypto(password)}`)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else if (response.status === 404) {
                document.querySelectorAll('.usererrormessage')[0].style.display = 'block'

            }
        })
    return data
}

// export function setAccountInfoById() {
//     let user_type = getCookie('user_type')
//     if (user_type === 'applicant') {
//         getResume()
//     } else if (user_type === 'employer') {
//         getCompany()
//     }
// }

// async function getResume() {
//     let user_id = getCookie('user_id')
//     const data = await fetch(`resume/${user_id}`)
//         .then((response) => {
//             if (response.status === 200) {
//                 return response.json()
//             }
//         })
//     dispatch(changeUser({ userState: data.user }));
//     if (data.resume) {
//         await changeData(data.resume)
//         dispatch(changeResume({ resumeState: data.resume }));
//     }

// }



export async function postNewUser(formInfo: any) {
    let userType = document.querySelectorAll('input[name="radio"]:checked')[0];
    let newUser = { ...formInfo, password: crypto(formInfo.password), user_type: userType.value }
    const response = await fetch('user', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: "same-origin",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(newUser)
    })
    const data = await response.json();
    document.cookie = await 'user_id=' + encodeURIComponent(data.user_id)
    document.cookie = await 'user_type=' + encodeURIComponent(data.user_type)
    delete newUser.password
    return { ...newUser, user_id: data.user_id }
}

export async function deleteResume(resume_id: number) {
    const response = await fetch('resume', {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: "same-origin",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(resume_id)
    })
}

export async function deleteVacansyFromBase(vacancy_id: number) {

    const response = await fetch('vacancy', {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: "same-origin",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(vacancy_id)
    })

}


// async function getCompany() {
//     let user_id = getCookie('user_id')
//     const data = await fetch(`company/${user_id}`)
//         .then((response) => {
//             if (response.status === 200) {
//                 return response.json()

//             }
//         })
//     dispatch(changeUser({ userState: data.user }));
//     if (data.company) {
//         await changeWorkType(data)
//         dispatch(changeCompany(data.company))
//     }
// }

