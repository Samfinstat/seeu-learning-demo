import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, BarChart3, Bell, BookOpen, CheckCircle2, ClipboardCheck,
  GraduationCap, Home, LineChart, LockKeyhole, LogOut, Mail, Menu, MessageCircle,
  PlayCircle, School, Search, Settings, Sparkles, Target, Trophy, UsersRound, X
} from 'lucide-react'
import './styles.css'

const LOGO = 'data:image/png;base64,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'

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

function Brand({ compact = false }) {
  return <div className={'brand' + (compact ? ' brand--compact' : '')}>
    <img src={LOGO} alt="SeeU" className="brand__logo" />
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
      <div className="login-footer"><a href="https://see-u.app" target="_blank" rel="noreferrer">see-u.app</a><span>Люди. Знания. Возможности.</span></div>
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
        <img src={LOGO} alt="" />
        <div><b>SeeU</b><span>Больше возможностей в экосистеме</span></div>
        <a href="https://see-u.app" target="_blank" rel="noreferrer">see-u.app <ArrowRight size={14} /></a>
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
      <footer className="app-footer"><span>SeeU Learning — личный помощник для обучения</span><a href="https://see-u.app" target="_blank" rel="noreferrer">see-u.app</a></footer>
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
