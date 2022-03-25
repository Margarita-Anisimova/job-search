import * as React from 'react';
import { useState, useEffect } from 'react';
import './ResumeCard.css';
import '../custom.css';
import { EducationType, ResumeType, WorkExpirienceType } from './types';


export default function ResumeCard() {

    const [resume, setResume] = useState<ResumeType>(createExapmleResume())

    function createExapmleResume(user_id = 0): ResumeType {
        return {
            resumeInfo: {
                user_id: user_id,
                resume_id: 0,
                birth_date: '1:10:2000',
                desired_position: '',
                desired_salary: '50000',
                work_type: [false, false, false, false, false],
                ready_move: true,
                skills: {},
                profession_id: 0,
                city: 'Екатеринбург',
                citizenship: 'РФ',
                education_level: 'Нет образования',
                gender: 'female'
            },
            education: [createEducation()],
            workExperience: [createWorkExperience()],
        }
    }
    
    function createEducation(resume_id = 0): EducationType {
        return {
            education_id: 0,
            institution: 'Уральский Федеральный Университет',
            specialization: 'Информатика и вычислительная техника',
            resume_id: resume_id,
            education_type: 'очное',
            graduation_year: '2020',
            status: 'add'
        }
    }
    
    
    function createWorkExperience(resume_id = 0): WorkExpirienceType {
        return {
            work_experience_id: 0,
            company: 'ООО “Наша Компания”',
            resume_id: resume_id,
            post: 'Системный администратор',
            date_start: '2020',
            date_end: '2022',
            experience_description: "Администрирование: Windows Server 2008-2019, MS365, Ubuntu, Debia, 1С Предприятие; MSSQL Server 2008-2019.Виртуализация: Proxmox, kvm Программирование: PowerShell Мониторинг состояния оборудования Zabbix Техподдержка пользователей. Внедрил шифрование и зажатие резервных копий MSSQL силами самого sql за место внешнего архиватора.",
            status: 'add'
        }
    }

  return (
    <div className="container resumecard__container">
      <div className="resumecard__title row">
          <div className="resumecard__title-img col-md-2">
              <img src="https://static.planetminecraft.com/files/avatar/1268532_1.png" />
          </div>
          <div className="resumecard__title-maininfo col-md-4">
              <div className="user_name">Иван Иванович Иванов</div>
              <div className="user_birthday">{resume.resumeInfo.birth_date}</div>
              <div className="user_city">{resume.resumeInfo.city}</div>
              <div className="user_citizenship">Гражданство {resume.resumeInfo.citizenship}</div>
          </div>
          <div className="resumecard__title-buttons col-md-3">
              <button className='button resumecard__btn'>Отправить отклик</button>
              <button className='resumecard__btn-light'>Показать контакты</button>
          </div>  
      </div>

      <div className="desired_profession">
          <div className='desired_profession__name'>Системный администратор</div>
          <div className='desired_profession__salary'>{resume.resumeInfo.desired_salary} руб.</div>
          <div className='desired_profession__readymove'>Переезд: {resume.resumeInfo.ready_move ? 'возможен': 'не возможен'} </div>
          <div className='desired_profession__work_type'>График работы:</div>
      </div>

      <div className="work_experiences">
          <h3 className='section_title'>Опыт работы</h3>
          <div className="work_exp row">
              <div className="work-period col-md-3">
                  {resume.workExperience[0].date_start} - {resume.workExperience[0].date_end}
              </div>
              <div className="work_description col-md-6">
                  <div className="work_exp-post">{resume.workExperience[0].post}</div>
                  <div className="work_exp-company">{resume.workExperience[0].company}</div>
                  <div className='work_exp-desc_title'>Обязанности и достижения</div>
                  <div className="work_exp-desc">{resume.workExperience[0].experience_description}</div>
              </div>
          </div>
      </div>

      <div className="educations">
          <h3 className='section_title'>Образование</h3>
          <div className="education row">
              <div className="edu-period col-md-3">
                  Год выпуска: {resume.education[0].graduation_year}
              </div>
              <div className="edu_description col-md-6">
                  <div className="edu-institution">{resume.education[0].institution}</div>
                  <div className="edu-specialization">{resume.education[0].specialization}</div>
                  <div className="edu-type">Тип обучения: {resume.education[0].education_type}</div>
              </div>

          </div>
      </div>

      <div className="skills">
          <h3 className='section_title'>Знания и навыки</h3>
          <div className="skill">
              <div>Перечисление навыков....</div>
          </div>
      </div>
      <button className='button resumecard__btn'>Отправить отклик</button>


    </div >

  );
}

