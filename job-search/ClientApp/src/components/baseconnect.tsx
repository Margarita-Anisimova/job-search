
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