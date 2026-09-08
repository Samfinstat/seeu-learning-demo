import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, BarChart3, Bell, BookOpen, CheckCircle2, ClipboardCheck,
  GraduationCap, Home, LineChart, LockKeyhole, LogOut, Mail, Menu, MessageCircle,
  PlayCircle, School, Search, Settings, Sparkles, Target, Trophy, UsersRound, X
} from 'lucide-react'
import './styles.css'

const subjects = [
  { id: 'math', title: 'Математика', mark: '∑', done: 8, total: 12, progress: 67, next: 'Дроби и смешанные числа', tone: 'violet' },
  { id: 'russian', title: 'Русский язык', mark: 'А', done: 5, total: 10, progress: 50, next: 'Имя существительное', tone: 'coral' },
  { id: 'world', title: 'Окружающий мир', mark: '◎', done: 3, total: 8, progress: 38, next: 'Природные зоны России', tone: 'orange' }
]

const students = [
  { name: 'Александр Морозов', progress: 64, test: '8/10', activity: 'Сегодня, 14:25' },
  { name: 'Анна Петрова', progress: 78, test: '9/10', activity: 'Сегодня, 13:40' },
  { name: 'Максим Сидоров', progress: 51, test: '6/10', activity: 'Вчера, 18:12' },
  { name: 'Екатерина Смирнова', progress: 88, test: '10/10', activity: 'Вчера, 16:05' },
  { name: 'Даниил Волков', progress: 69, test: '8/10', activity: '5 сентября' }
]

const questions = [
  { q: 'Как записать неправильную дробь 7/3 в виде смешанного числа?', a: ['1 4/3', '2 1/3', '3 1/2'], correct: 1 },
  { q: 'Какая дробь соответствует числу 3 2/5?', a: ['17/5', '15/5', '11/5'], correct: 0 },
  { q: 'Что является целой частью числа 4 3/7?', a: ['3', '4', '7'], correct: 1 },
  { q: 'Чему равна дробь 9/4?', a: ['2 1/4', '2 2/4', '3 1/4'], correct: 0 },
  { q: 'Какая из дробей является неправильной?', a: ['3/8', '5/7', '9/5'], correct: 2 }
]

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Доброе утро'
  if (hour < 18) return 'Добрый день'
  return 'Добрый вечер'
}

function currentDate() {
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(new Date())
}

function SeeULogo({ small = false }) {
  return <div className={'seeu-logo' + (small ? ' seeu-logo--small' : '')} aria-label="SeeU"><span>SeeU</span></div>
}

function Brand({ compact = false }) {
  return <div className={'brand' + (compact ? ' brand--compact' : '')}>
    <SeeULogo small={compact} />
    <div className="brand__name">
      <strong>SeeU <span>Learning</span></strong>
      <small>личный помощник</small>
    </div>
  </div>
}

function Progress({ value, tone = '' }) {
  return <div className={'progress ' + tone}><i style={{ width: value + '%' }} /></div>
}

function Feature({ icon: Icon, title, text, tone }) {
  return <div className="feature">
    <div className={'feature__icon ' + tone}><Icon size={21} /></div>
    <div><b>{title}</b><span>{text}</span></div>
  </div>
}

function Login({ onLogin }) {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const fill = role => {
    setEmail(role === 'student' ? 'student@demo.ru' : 'teacher@demo.ru')
    setPassword('demo123')
    setError('')
  }

  const submit = e => {
    e.preventDefault()
    if (email === 'student@demo.ru' && password === 'demo123') {
      onLogin('student')
      nav('/student')
      return
    }
    if (email === 'teacher@demo.ru' && password === 'demo123') {
      onLogin('teacher')
      nav('/teacher')
      return
    }
    setError('Используйте один из демо-доступов ниже.')
  }

  return <main className="login-page">
    <section className="login-visual">
      <div className="blob blob--one" />
      <div className="blob blob--two" />
      <div className="blob blob--three" />
      <Brand />
      <div className="login-copy">
        <span className="eyebrow">SEEU LEARNING</span>
        <h1>Личный помощник<br />для обучения.</h1>
        <p>Материалы, задания, тесты и прогресс — в одном понятном пространстве для учеников и преподавателей.</p>
        <div className="feature-list">
          <Feature icon={GraduationCap} title="Удобное обучение" text="Уроки, задания и результаты всегда под рукой" tone="violet" />
          <Feature icon={UsersRound} title="Работа с учениками" text="Классы, прогресс и результаты в одном кабинете" tone="coral" />
          <Feature icon={BarChart3} title="Понятная аналитика" text="Видно, где всё хорошо и кому нужна помощь" tone="orange" />
        </div>
      </div>
      <div className="login-showcase">
        <div className="showcase__top"><span>Прогресс обучения</span><Sparkles size={18} /></div>
        <strong>64%</strong>
        <Progress value={64} tone="brand" />
        <div className="showcase__meta"><span>+12% за месяц</span><span>8/12 уроков</span></div>
      </div>
      <div className="login-footer"><span>SeeU Learning</span><span>Люди. Знания. Возможности.</span></div>
    </section>

    <section className="login-panel">
      <div className="login-card">
        <div className="mobile-brand"><Brand compact /></div>
        <Brand compact />
        <div className="login-card__intro">
          <span className="eyebrow">ДЕМО ПЛАТФОРМЫ</span>
          <h2>Добро пожаловать!</h2>
          <p>Войдите в аккаунт, чтобы посмотреть платформу в роли ученика или учителя.</p>
        </div>

        <div className="role-buttons">
          <button className={email === 'student@demo.ru' ? 'active student' : 'student'} onClick={() => fill('student')}><GraduationCap size={19} />Ученик</button>
          <button className={email === 'teacher@demo.ru' ? 'active teacher' : 'teacher'} onClick={() => fill('teacher')}><School size={19} />Учитель</button>
        </div>

        <form onSubmit={submit}>
          <label className="input-field"><span>Логин</span><div><Mail size={18} /><input value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.ru" /></div></label>
          <label className="input-field"><span>Пароль</span><div><LockKeyhole size={18} /><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Введите пароль" /></div></label>
          {error && <div className="form-error">{error}</div>}
          <button className="primary wide">Войти <ArrowRight size={18} /></button>
        </form>

        <div className="demo-hint">
          <div className="demo-hint__title"><Target size={17} /><div><b>Демо-доступы</b><span>Можно скопировать или выбрать роль выше</span></div></div>
          <div className="demo-row"><span>Ученик</span><code>student@demo.ru</code><code>demo123</code></div>
          <div className="demo-row"><span>Учитель</span><code>teacher@demo.ru</code><code>demo123</code></div>
        </div>

        <p className="login-note">SEEU Learning — <b>личный помощник</b> для обучения.</p>
      </div>
    </section>
  </main>
}

function Layout({ role, onLogout, title, children }) {
  const nav = useNavigate()
  const [open, setOpen] = useState(false)

  const liveItems = role === 'student'
    ? [
      [Home, 'Главная', '/student'],
      [BookOpen, 'Мои предметы', '/student'],
      [ClipboardCheck, 'Результаты', '/student']
    ]
    : [
      [Home, 'Главная', '/teacher'],
      [UsersRound, 'Мои классы', '/teacher/class/5a'],
      [LineChart, 'Результаты', '/teacher']
    ]

  return <div className="app-shell">
    <aside className={'sidebar ' + (open ? 'open' : '')}>
      <div className="sidebar-top"><Brand compact /><button className="icon-btn close-mobile" onClick={() => setOpen(false)}><X /></button></div>
      <nav className="sidebar-nav">
        {liveItems.map(([Icon, label, url], index) =>
          <button key={label} className={index === 0 ? 'active' : ''} onClick={() => { nav(url); setOpen(false) }}><Icon size={19} />{label}</button>
        )}
        <div className="nav-divider" />
        <button className="muted-nav"><MessageCircle size={19} />Сообщения <span className="soon">демо</span></button>
        <button className="muted-nav"><Settings size={19} />Настройки <span className="soon">демо</span></button>
      </nav>

      <div className="sidebar-promo">
        <SeeULogo small />
        <div><b>SeeU</b><span>Больше возможностей в экосистеме</span></div>
        <span className="sidebar-promo__caption">Единая экосистема SeeU</span>
      </div>

      <div className="sidebar-user">
        <div className="avatar">{role === 'student' ? 'АМ' : 'ЕВ'}</div>
        <div><b>{role === 'student' ? 'Александр Морозов' : 'Елена Васильева'}</b><span>{role === 'student' ? 'Ученик • 5А' : 'Учитель математики'}</span></div>
        <button className="icon-btn" onClick={onLogout} title="Выйти"><LogOut size={18} /></button>
      </div>
    </aside>

    <div className="app-main">
      <header className="topbar">
        <button className="icon-btn menu-mobile" onClick={() => setOpen(true)}><Menu /></button>
        <div className="topbar-title"><b>{title}</b><span>личный помощник</span></div>
        <div className="topbar-actions">
          <div className="search-box"><Search size={17} /><span>Поиск</span></div>
          <button className="icon-btn bell"><Bell size={19} /><i /></button>
          <span className="demo-label">DEMO</span>
        </div>
      </header>
      <div className="content">{children}</div>
      <footer className="app-footer"><span>SeeU Learning — личный помощник для обучения</span><span>Демонстрационная версия</span></footer>
    </div>
  </div>
}

function Stat({ icon: Icon, value, label, tone = 'violet', delta }) {
  return <article className={'stat stat--' + tone}>
    <div className="stat__icon"><Icon size={19} /></div>
    <div><b>{value}</b><span>{label}</span>{delta && <small>{delta}</small>}</div>
  </article>
}

function SubjectCard({ subject, onClick }) {
  return <article className={'subject-card subject-card--' + subject.tone} onClick={onClick}>
    <div className="subject-card__top"><div className="subject-icon">{subject.mark}</div><span>{subject.progress}%</span></div>
    <h3>{subject.title}</h3>
    <p>Следующий: {subject.next}</p>
    <div className="subject-meta"><span>{subject.done} из {subject.total} уроков</span><b>{subject.progress}%</b></div>
    <Progress value={subject.progress} tone={subject.tone} />
  </article>
}

function Student({ onLogout }) {
  const nav = useNavigate()
  const greeting = getGreeting()

  return <Layout role="student" onLogout={onLogout} title="Главная">
    <section className="welcome-card welcome-card--student">
      <div className="welcome-copy">
        <span className="eyebrow">{currentDate()}</span>
        <h1>{greeting}, Александр! <span>👋</span></h1>
        <p>Продолжайте учиться — небольшой шаг сегодня приближает к большому результату.</p>
      </div>
      <div className="welcome-quote"><Sparkles size={20} /><b>Знания сегодня —<br />возможности завтра.</b></div>
    </section>

    <div className="student-overview">
      <div className="overall-card">
        <div><span>Ваш общий прогресс</span><b>64%</b></div>
        <div className="overall-card__bar"><Progress value={64} tone="brand" /><small>+12% за последний месяц</small></div>
      </div>
      <div className="mini-goal"><Target size={22} /><div><b>8 из 12</b><span>уроков математики</span></div></div>
    </div>

    <section>
      <div className="section-head"><div><h2>Продолжить обучение</h2><p>Последний открытый урок</p></div></div>
      <article className="continue-card">
        <div className="continue-card__icon"><PlayCircle size={27} /></div>
        <div><span>Математика • Урок 9</span><h3>Дроби и смешанные числа</h3><p>Научимся сравнивать дроби и переводить смешанные числа.</p></div>
        <button className="primary light" onClick={() => nav('/student/lesson/1')}>Продолжить <ArrowRight size={18} /></button>
      </article>
    </section>

    <section>
      <div className="section-head"><div><h2>Мои предметы</h2><p>Прогресс по текущей программе</p></div></div>
      <div className="subject-grid">
        {subjects.map((s, i) => <SubjectCard key={s.id} subject={s} onClick={i === 0 ? () => nav('/student/lesson/1') : undefined} />)}
      </div>
    </section>

    <section>
      <div className="section-head"><div><h2>Последние результаты</h2><p>Что уже получилось</p></div></div>
      <div className="result-list">
        <div><CheckCircle2 /><span><b>Математика</b><small>Обыкновенные дроби</small></span><strong>8/10</strong></div>
        <div><CheckCircle2 /><span><b>Русский язык</b><small>Состав слова</small></span><strong>9/10</strong></div>
      </div>
    </section>
  </Layout>
}

function Lesson({ onLogout }) {
  const nav = useNavigate()
  return <Layout role="student" onLogout={onLogout} title="Математика">
    <button className="back" onClick={() => nav('/student')}><ArrowLeft size={17} />На главную</button>
    <div className="lesson-layout">
      <article className="lesson-content">
        <div className="lesson-kicker"><span className="eyebrow">Урок 9</span><span>12 минут</span></div>
        <h1>Дроби и смешанные числа</h1>
        <p className="lead">Смешанное число состоит из целой и дробной части. Разберём, как переводить неправильные дроби в смешанные числа и обратно.</p>
        <div className="lesson-visual"><b>7/3</b><ArrowRight /><b>2 1/3</b></div>
        <h2>Как это работает</h2>
        <p>Разделите числитель на знаменатель. Целая часть результата становится целой частью смешанного числа, а остаток — новым числителем.</p>
        <div className="tip"><Sparkles size={18} /><div><b>Пример</b><p>7 ÷ 3 = 2, остаток 1. Значит, 7/3 = 2 1/3.</p></div></div>
        <h2>Проверьте себя</h2>
        <p>После урока пройдите короткий тест. Результат сразу появится в личном кабинете.</p>
        <button className="primary" onClick={() => nav('/student/test/1')}>Перейти к тесту <ArrowRight size={18} /></button>
      </article>
      <aside className="lesson-side">
        <span>Прогресс по предмету</span><b>9 / 12</b><Progress value={75} tone="brand" /><small>Осталось 3 урока</small>
        <div className="lesson-side__note"><Target size={18} /><span>Цель: пройти тему до конца недели</span></div>
      </aside>
    </div>
  </Layout>
}

function Test({ onLogout }) {
  const nav = useNavigate()
  const [n, setN] = useState(0)
  const [answers, setAnswers] = useState({})
  const q = questions[n]
  const chosen = answers[n]

  const next = () => {
    if (n < questions.length - 1) {
      setN(n + 1)
      return
    }
    const score = questions.reduce((sum, item, index) => sum + (answers[index] === item.correct ? 2 : 0), 0)
    localStorage.setItem('seeu-demo-score', String(score))
    nav('/student/result/1')
  }

  return <Layout role="student" onLogout={onLogout} title="Тест">
    <div className="test-wrap">
      <div className="test-head"><div><span className="eyebrow">Математика • Урок 9</span><h1>Проверка знаний</h1></div><b>{n + 1} / {questions.length}</b></div>
      <Progress value={(n + 1) / questions.length * 100} tone="brand" />
      <article className="question-card">
        <span>Вопрос {n + 1}</span><h2>{q.q}</h2>
        <div className="answers">
          {q.a.map((a, i) => <button className={chosen === i ? 'selected' : ''} key={a} onClick={() => setAnswers({ ...answers, [n]: i })}><i>{String.fromCharCode(65 + i)}</i>{a}</button>)}
        </div>
        <div className="question-actions">
          <button className="ghost" disabled={n === 0} onClick={() => setN(n - 1)}><ArrowLeft size={17} />Назад</button>
          <button className="primary" disabled={chosen === undefined} onClick={next}>{n === questions.length - 1 ? 'Завершить' : 'Далее'}<ArrowRight size={17} /></button>
        </div>
      </article>
    </div>
  </Layout>
}

function Result({ onLogout }) {
  const nav = useNavigate()
  const score = Number(localStorage.getItem('seeu-demo-score') || 8)
  const percent = score * 10
  const title = score >= 8 ? 'Отличная работа!' : score >= 6 ? 'Хороший результат!' : 'Есть что повторить'

  return <Layout role="student" onLogout={onLogout} title="Результат">
    <div className="result-page">
      <div className="result-badge"><Trophy /></div>
      <span className="eyebrow">Тест завершён</span><h1>{title}</h1><p>Результат сохранён в демонстрационном кабинете ученика.</p>
      <div className="score"><b>{score}</b><span>/ 10</span></div>
      <div className="score-grid"><div><b>{percent}%</b><span>правильных ответов</span></div><div><b>4:12</b><span>время</span></div><div><b>1</b><span>попытка</span></div></div>
      <button className="primary" onClick={() => nav('/student')}>Вернуться на главную</button>
    </div>
  </Layout>
}

function statusFor(progress) {
  if (progress >= 85) return ['Отлично', 'green']
  if (progress >= 65) return ['Хорошо', 'violet']
  if (progress >= 55) return ['Стабильно', 'orange']
  return ['Нужна помощь', 'coral']
}

function StudentTable({ open }) {
  return <div className="table-wrap"><table><thead><tr><th>Ученик</th><th>Прогресс</th><th>Последний тест</th><th>Статус</th><th>Активность</th></tr></thead><tbody>
    {students.map((s, i) => {
      const status = statusFor(s.progress)
      return <tr key={s.name} onClick={i === 0 ? open : undefined}>
        <td><div className="student-cell"><span>{s.name.split(' ').map(x => x[0]).join('').slice(0, 2)}</span><b>{s.name}</b></div></td>
        <td><div className="table-progress"><Progress value={s.progress} tone={status[1]} /><b>{s.progress}%</b></div></td>
        <td><b>{s.test}</b></td><td><span className={'status status--' + status[1]}>{status[0]}</span></td><td>{s.activity}</td>
      </tr>
    })}
  </tbody></table></div>
}

function Teacher({ onLogout }) {
  const nav = useNavigate()
  return <Layout role="teacher" onLogout={onLogout} title="Главная">
    <section className="welcome-card welcome-card--teacher">
      <div className="welcome-copy"><span className="eyebrow">{currentDate()}</span><h1>{getGreeting()}, Елена!</h1><p>Сегодня 12 учеников завершили задания. В трёх случаях стоит обратить внимание на прогресс.</p></div>
      <div className="welcome-quote"><BarChart3 size={21} /><b>Всё важное<br />сразу видно.</b></div>
    </section>

    <div className="stats-grid">
      <Stat icon={UsersRound} value="45" label="Учеников" tone="violet" delta="+4 за неделю" />
      <Stat icon={LineChart} value="71%" label="Средний прогресс" tone="orange" delta="+6%" />
      <Stat icon={ClipboardCheck} value="18" label="Тестов сегодня" tone="coral" />
      <Stat icon={Trophy} value="8,1" label="Средний балл" tone="violet" />
    </div>

    <section>
      <div className="section-head"><div><h2>Мои классы</h2><p>Текущая активность учеников</p></div></div>
      <div className="class-grid">
        <article onClick={() => nav('/teacher/class/5a')}><div className="class-icon violet">5А</div><div><h3>5А класс</h3><p>24 ученика • Математика</p><Progress value={72} tone="violet" /><span>Средний прогресс <b>72%</b></span></div><ArrowRight size={19} /></article>
        <article><div className="class-icon orange">5Б</div><div><h3>5Б класс</h3><p>21 ученик • Математика</p><Progress value={66} tone="orange" /><span>Средний прогресс <b>66%</b></span></div><ArrowRight size={19} /></article>
      </div>
    </section>

    <section><div className="section-head"><div><h2>Последняя активность</h2><p>Нажмите на Александра Морозова для просмотра карточки</p></div></div><StudentTable open={() => nav('/teacher/student/1')} /></section>
  </Layout>
}

function TeacherClass({ onLogout }) {
  const nav = useNavigate()
  return <Layout role="teacher" onLogout={onLogout} title="5А класс">
    <button className="back" onClick={() => nav('/teacher')}><ArrowLeft size={17} />На главную</button>
    <section className="welcome-card welcome-card--class">
      <div className="welcome-copy"><span className="eyebrow">Математика</span><h1>5А класс</h1><p>24 ученика • программа 5 класса</p></div>
      <div className="class-progress"><span>Средний прогресс</span><b>72%</b><Progress value={72} tone="brand" /></div>
    </section>
    <div className="stats-grid"><Stat icon={UsersRound} value="24" label="Учеников" tone="violet" /><Stat icon={Sparkles} value="19" label="Активны сегодня" tone="orange" /><Stat icon={Trophy} value="8,2" label="Средний тест" tone="coral" /><Stat icon={Target} value="3" label="Нужна помощь" tone="violet" /></div>
    <section><div className="section-head"><div><h2>Ученики</h2><p>Прогресс и последние результаты</p></div></div><StudentTable open={() => nav('/teacher/student/1')} /></section>
  </Layout>
}

function TeacherStudent({ onLogout }) {
  const nav = useNavigate()
  return <Layout role="teacher" onLogout={onLogout} title="Карточка ученика">
    <button className="back" onClick={() => nav('/teacher/class/5a')}><ArrowLeft size={17} />К классу</button>
    <section className="student-profile-head">
      <div className="profile-avatar">АМ</div>
      <div><span className="eyebrow">5А класс</span><h1>Александр Морозов</h1><p>Последняя активность: сегодня, 14:25</p></div>
      <div className="overall"><b>64%</b><span>Общий прогресс</span><Progress value={64} tone="brand" /></div>
    </section>
    <div className="stats-grid"><Stat icon={BookOpen} value="16" label="Уроков пройдено" tone="violet" /><Stat icon={Trophy} value="8,0" label="Средний балл" tone="orange" /><Stat icon={GraduationCap} value="3" label="Предмета" tone="coral" /><Stat icon={ClipboardCheck} value="12" label="Тестов" tone="violet" /></div>
    <section><div className="section-head"><div><h2>Прогресс по предметам</h2></div></div><div className="subject-grid">{subjects.map(s => <SubjectCard key={s.id} subject={s} />)}</div></section>
  </Layout>
}

function App() {
  const [role, setRole] = useState(localStorage.getItem('seeu-demo-role') || '')
  const login = nextRole => { localStorage.setItem('seeu-demo-role', nextRole); setRole(nextRole) }
  const logout = () => { localStorage.removeItem('seeu-demo-role'); setRole('') }

  return <Routes>
    <Route path="/login" element={<Login onLogin={login} />} />
    <Route path="/student" element={role === 'student' ? <Student onLogout={logout} /> : <Navigate to="/login" replace />} />
    <Route path="/student/lesson/1" element={role === 'student' ? <Lesson onLogout={logout} /> : <Navigate to="/login" replace />} />
    <Route path="/student/test/1" element={role === 'student' ? <Test onLogout={logout} /> : <Navigate to="/login" replace />} />
    <Route path="/student/result/1" element={role === 'student' ? <Result onLogout={logout} /> : <Navigate to="/login" replace />} />
    <Route path="/teacher" element={role === 'teacher' ? <Teacher onLogout={logout} /> : <Navigate to="/login" replace />} />
    <Route path="/teacher/class/5a" element={role === 'teacher' ? <TeacherClass onLogout={logout} /> : <Navigate to="/login" replace />} />
    <Route path="/teacher/student/1" element={role === 'teacher' ? <TeacherStudent onLogout={logout} /> : <Navigate to="/login" replace />} />
    <Route path="*" element={<Navigate to={role ? '/' + role : '/login'} replace />} />
  </Routes>
}

createRoot(document.getElementById('root')).render(<HashRouter><App /></HashRouter>)
