import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, GraduationCap, Home, LogOut, Menu, PlayCircle, School, Trophy, UsersRound, X } from 'lucide-react'
import './styles.css'

const subjects=[
{id:'math',title:'Математика',mark:'∑',done:8,total:12,progress:67,next:'Дроби и смешанные числа'},
{id:'russian',title:'Русский язык',mark:'А',done:5,total:10,progress:50,next:'Имя существительное'},
{id:'world',title:'Окружающий мир',mark:'◎',done:3,total:8,progress:38,next:'Природные зоны России'}
]
const students=[
['Александр Морозов','64%','8/10','Сегодня, 14:25'],
['Анна Петрова','78%','9/10','Сегодня, 13:40'],
['Максим Сидоров','51%','6/10','Вчера, 18:12'],
['Екатерина Смирнова','88%','10/10','Вчера, 16:05'],
['Даниил Волков','69%','8/10','5 сентября']
]

function Brand(){return <div className="brand"><div className="brand-mark">S</div><div><b>SEEU</b><span>Learning</span></div></div>}
function Progress({value}){return <div className="progress"><i style={{width:value+'%'}}/></div>}

function Login({onLogin}){
 const nav=useNavigate(),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[error,setError]=useState('')
 const fill=r=>{setEmail(r==='student'?'student@demo.ru':'teacher@demo.ru');setPassword('demo123');setError('')}
 const submit=e=>{e.preventDefault();if(email==='student@demo.ru'&&password==='demo123'){onLogin('student');nav('/student')}else if(email==='teacher@demo.ru'&&password==='demo123'){onLogin('teacher');nav('/teacher')}else setError('Используйте один из демо-доступов ниже.')}
 return <main className="login-page"><section className="login-visual"><Brand/><div className="login-copy"><span className="eyebrow">Образовательная платформа</span><h1>Учиться проще.<br/>Преподавать удобнее.</h1><p>Курсы, уроки, тесты и прогресс учеников — в одном понятном пространстве.</p></div><div className="visual-card"><Trophy/><div><b>64%</b><span>общий прогресс ученика</span></div><Progress value={64}/></div></section><section className="login-panel"><div className="login-form-wrap"><div className="mobile-brand"><Brand/></div><span className="eyebrow">Демо-доступ</span><h2>Вход в платформу</h2><p className="muted">Выберите роль или используйте логин и пароль.</p><div className="role-buttons"><button onClick={()=>fill('student')}><GraduationCap/>Ученик</button><button onClick={()=>fill('teacher')}><School/>Учитель</button></div><form onSubmit={submit}><label>Логин<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@example.ru"/></label><label>Пароль<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Введите пароль"/></label>{error&&<div className="form-error">{error}</div>}<button className="primary wide">Войти <ArrowRight size={18}/></button></form><div className="demo-hint"><b>Быстрый просмотр</b><div><span>Ученик</span><code>student@demo.ru / demo123</code></div><div><span>Учитель</span><code>teacher@demo.ru / demo123</code></div></div></div></section></main>
}

function Layout({role,onLogout,title,children}){
 const nav=useNavigate(),[open,setOpen]=useState(false)
 const items=role==='student'?[[Home,'Главная','/student'],[BookOpen,'Предметы','/student']]:[[Home,'Главная','/teacher'],[UsersRound,'Мои классы','/teacher/class/5a']]
 return <div className="app-shell"><aside className={'sidebar '+(open?'open':'')}><div className="sidebar-top"><Brand/><button className="icon-btn close-mobile" onClick={()=>setOpen(false)}><X/></button></div><nav>{items.map(([I,l,u])=><button key={l} onClick={()=>{nav(u);setOpen(false)}}><I size={19}/>{l}</button>)}</nav><div className="sidebar-user"><div className="avatar">{role==='student'?'АМ':'ЕВ'}</div><div><b>{role==='student'?'Александр Морозов':'Елена Васильева'}</b><span>{role==='student'?'Ученик • 5А':'Учитель математики'}</span></div><button className="icon-btn" onClick={onLogout}><LogOut size={18}/></button></div></aside><div className="app-main"><header className="topbar"><button className="icon-btn menu-mobile" onClick={()=>setOpen(true)}><Menu/></button><b>{title}</b><span className="demo-label">DEMO</span></header><div className="content">{children}</div></div></div>
}

function Student({onLogout}){
 const nav=useNavigate()
 return <Layout role="student" onLogout={onLogout} title="Главная"><div className="hero-row"><div><span className="eyebrow">7 сентября</span><h1>Добрый вечер, Александр</h1><p>Продолжайте в том же темпе — до следующего результата совсем немного.</p></div><div className="overall"><b>64%</b><span>Общий прогресс</span><Progress value={64}/></div></div><section><div className="section-head"><div><h2>Продолжить обучение</h2><p>Последний открытый урок</p></div></div><article className="continue-card"><div className="subject-icon">∑</div><div><span>Математика • Урок 9</span><h3>Дроби и смешанные числа</h3><p>Научимся сравнивать дроби и переводить смешанные числа.</p><Progress value={72}/></div><button className="primary" onClick={()=>nav('/student/lesson/1')}><PlayCircle size={18}/>Продолжить</button></article></section><section><div className="section-head"><div><h2>Мои предметы</h2><p>Прогресс по текущей программе</p></div></div><div className="subject-grid">{subjects.map(s=><article className="subject-card" key={s.id}><div className="subject-icon">{s.mark}</div><h3>{s.title}</h3><p>Следующий: {s.next}</p><div className="subject-meta"><span>{s.done} из {s.total} уроков</span><b>{s.progress}%</b></div><Progress value={s.progress}/></article>)}</div></section><section><div className="section-head"><div><h2>Последние результаты</h2></div></div><div className="result-list"><div><CheckCircle2/><span><b>Математика</b><small>Обыкновенные дроби</small></span><strong>8/10</strong></div><div><CheckCircle2/><span><b>Русский язык</b><small>Состав слова</small></span><strong>9/10</strong></div></div></section></Layout>
}

function Lesson({onLogout}){
 const nav=useNavigate()
 return <Layout role="student" onLogout={onLogout} title="Математика"><button className="back" onClick={()=>nav('/student')}><ArrowLeft size={17}/>На главную</button><div className="lesson-layout"><article className="lesson-content"><span className="eyebrow">Урок 9 • 12 минут</span><h1>Дроби и смешанные числа</h1><p className="lead">Смешанное число состоит из целой и дробной части. Разберём, как переводить неправильные дроби в смешанные числа и обратно.</p><div className="lesson-visual"><b>7/3</b><ArrowRight/><b>2 1/3</b></div><h2>Как это работает</h2><p>Разделите числитель на знаменатель. Целая часть результата становится целой частью смешанного числа, а остаток — новым числителем.</p><div className="tip"><b>Пример</b><p>7 ÷ 3 = 2, остаток 1. Значит, 7/3 = 2 1/3.</p></div><h2>Проверьте себя</h2><p>Пройдите короткий тест. Результат сразу появится в личном кабинете.</p><button className="primary" onClick={()=>nav('/student/test/1')}>Перейти к тесту <ArrowRight size={18}/></button></article><aside className="lesson-side"><span>Ваш прогресс</span><b>9 / 12</b><Progress value={75}/><small>Осталось 3 урока</small></aside></div></Layout>
}

const questions=[
['Как записать неправильную дробь 7/3 в виде смешанного числа?',['1 4/3','2 1/3','3 1/2']],
['Какая дробь соответствует числу 3 2/5?',['17/5','15/5','11/5']],
['Что является целой частью числа 4 3/7?',['3','4','7']],
['Чему равна дробь 9/4?',['2 1/4','2 2/4','3 1/4']],
['Какая из дробей является неправильной?',['3/8','5/7','9/5']]
]
function Test({onLogout}){
 const nav=useNavigate(),[n,setN]=useState(0),[chosen,setChosen]=useState(null),q=questions[n]
 const next=()=>{if(n===questions.length-1)nav('/student/result/1');else{setN(n+1);setChosen(null)}}
 return <Layout role="student" onLogout={onLogout} title="Тест"><div className="test-wrap"><div className="test-head"><div><span className="eyebrow">Математика • Урок 9</span><h1>Проверка знаний</h1></div><b>{n+1} / {questions.length}</b></div><Progress value={(n+1)/questions.length*100}/><article className="question-card"><span>Вопрос {n+1}</span><h2>{q[0]}</h2><div className="answers">{q[1].map((a,i)=><button className={chosen===i?'selected':''} key={a} onClick={()=>setChosen(i)}><i>{String.fromCharCode(65+i)}</i>{a}</button>)}</div><div className="question-actions"><button className="ghost" disabled={n===0} onClick={()=>{setN(n-1);setChosen(null)}}><ArrowLeft size={17}/>Назад</button><button className="primary" disabled={chosen===null} onClick={next}>{n===4?'Завершить':'Далее'}<ArrowRight size={17}/></button></div></article></div></Layout>
}
function Result({onLogout}){
 const nav=useNavigate()
 return <Layout role="student" onLogout={onLogout} title="Результат"><div className="result-page"><div className="result-badge"><Trophy/></div><span className="eyebrow">Тест завершён</span><h1>Отличная работа!</h1><p>Вы хорошо разобрались в теме «Дроби и смешанные числа».</p><div className="score"><b>8</b><span>/ 10</span></div><div className="score-grid"><div><b>80%</b><span>правильных ответов</span></div><div><b>4:12</b><span>время</span></div><div><b>1</b><span>попытка</span></div></div><button className="primary" onClick={()=>nav('/student')}>Вернуться на главную</button></div></Layout>
}

function Stat({v,l}){return <article className="stat"><b>{v}</b><span>{l}</span></article>}
function Table({open}){return <div className="table-wrap"><table><thead><tr><th>Ученик</th><th>Прогресс</th><th>Последний тест</th><th>Активность</th></tr></thead><tbody>{students.map((s,i)=><tr key={s[0]} onClick={i===0?open:undefined}><td><div className="student-cell"><span>{s[0].split(' ').map(x=>x[0]).join('').slice(0,2)}</span><b>{s[0]}</b></div></td><td>{s[1]}</td><td><b>{s[2]}</b></td><td>{s[3]}</td></tr>)}</tbody></table></div>}
function Teacher({onLogout}){
 const nav=useNavigate()
 return <Layout role="teacher" onLogout={onLogout} title="Главная"><div className="hero-row"><div><span className="eyebrow">7 сентября</span><h1>Добрый вечер, Елена</h1><p>Сегодня 12 учеников завершили задания.</p></div></div><div className="stats-grid"><Stat v="45" l="Учеников"/><Stat v="71%" l="Средний прогресс"/><Stat v="18" l="Тестов сегодня"/><Stat v="8,1" l="Средний балл"/></div><section><div className="section-head"><div><h2>Мои классы</h2><p>Текущая активность учеников</p></div></div><div className="class-grid"><article onClick={()=>nav('/teacher/class/5a')}><div className="class-icon">5А</div><div><h3>5А класс</h3><p>24 ученика • Математика</p><Progress value={72}/><span>Средний прогресс <b>72%</b></span></div></article><article><div className="class-icon">5Б</div><div><h3>5Б класс</h3><p>21 ученик • Математика</p><Progress value={66}/><span>Средний прогресс <b>66%</b></span></div></article></div></section><section><div className="section-head"><div><h2>Последняя активность</h2></div></div><Table open={()=>nav('/teacher/student/1')}/></section></Layout>
}
function TeacherClass({onLogout}){
 const nav=useNavigate()
 return <Layout role="teacher" onLogout={onLogout} title="5А класс"><button className="back" onClick={()=>nav('/teacher')}><ArrowLeft size={17}/>На главную</button><div className="hero-row"><div><span className="eyebrow">Математика</span><h1>5А класс</h1><p>24 ученика • программа 5 класса</p></div><div className="overall"><b>72%</b><span>Средний прогресс</span><Progress value={72}/></div></div><div className="stats-grid"><Stat v="24" l="Учеников"/><Stat v="19" l="Активны сегодня"/><Stat v="8,2" l="Средний тест"/><Stat v="3" l="Нужна помощь"/></div><section><div className="section-head"><div><h2>Ученики</h2><p>Прогресс и результаты</p></div></div><Table open={()=>nav('/teacher/student/1')}/></section></Layout>
}
function TeacherStudent({onLogout}){
 const nav=useNavigate()
 return <Layout role="teacher" onLogout={onLogout} title="Карточка ученика"><button className="back" onClick={()=>nav('/teacher/class/5a')}><ArrowLeft size={17}/>К классу</button><div className="student-profile-head"><div className="profile-avatar">АМ</div><div><span className="eyebrow">5А класс</span><h1>Александр Морозов</h1><p>Последняя активность: сегодня, 14:25</p></div><div className="overall"><b>64%</b><span>Общий прогресс</span><Progress value={64}/></div></div><div className="stats-grid"><Stat v="16" l="Уроков пройдено"/><Stat v="8,0" l="Средний балл"/><Stat v="3" l="Предмета"/><Stat v="12" l="Тестов"/></div><section><div className="section-head"><div><h2>Прогресс по предметам</h2></div></div><div className="subject-grid">{subjects.map(s=><article className="subject-card" key={s.id}><div className="subject-icon">{s.mark}</div><h3>{s.title}</h3><p>{s.done} из {s.total} уроков</p><Progress value={s.progress}/></article>)}</div></section></Layout>
}

function App(){
 const [role,setRole]=useState(localStorage.getItem('seeu-demo-role')||'')
 const login=r=>{localStorage.setItem('seeu-demo-role',r);setRole(r)}
 const logout=()=>{localStorage.removeItem('seeu-demo-role');setRole('')}
 return <Routes><Route path="/login" element={<Login onLogin={login}/>}/><Route path="/student" element={role==='student'?<Student onLogout={logout}/>:<Navigate to="/login"/>}/><Route path="/student/lesson/1" element={role==='student'?<Lesson onLogout={logout}/>:<Navigate to="/login"/>}/><Route path="/student/test/1" element={role==='student'?<Test onLogout={logout}/>:<Navigate to="/login"/>}/><Route path="/student/result/1" element={role==='student'?<Result onLogout={logout}/>:<Navigate to="/login"/>}/><Route path="/teacher" element={role==='teacher'?<Teacher onLogout={logout}/>:<Navigate to="/login"/>}/><Route path="/teacher/class/5a" element={role==='teacher'?<TeacherClass onLogout={logout}/>:<Navigate to="/login"/>}/><Route path="/teacher/student/1" element={role==='teacher'?<TeacherStudent onLogout={logout}/>:<Navigate to="/login"/>}/><Route path="*" element={<Navigate to={role?'/'+role:'/login'}/>}/></Routes>
}
createRoot(document.getElementById('root')).render(<HashRouter><App/></HashRouter>)
