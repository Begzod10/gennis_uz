from ..app import *
from werkzeug.security import generate_password_hash, check_password_hash
from backend.functions.functions import *
import uuid
from datetime import datetime, timedelta


@app.route('/')
def hello_world():
    refreshdatas()
    return 'Hello World!'


@app.route('/home', methods=['POST', 'GET'])
def home():
    refreshdatas()
    user = get_current_user()
    locations = Locations.query.order_by('id').all()
    return render_template('basic_routes/new_home.html', user=user, locations=locations)


@app.route('/login', methods=['POST', 'GET'])
def login():
    user = get_current_user()
    refreshdatas()
    if request.method == "POST":
        username = request.form.get('username')
        password = request.form.get('password')
        username_sign = Users.query.filter_by(username=username).first()
        if username_sign and check_password_hash(username_sign.password, password):
            session['user'] = username_sign.username
            user = get_current_user()
            flash(f"Добро пожаловать {user.name}")
            return redirect(url_for('home'))
        else:
            flash("Error code")
            return redirect(url_for('login'))
    return render_template('basic_routes/login.html', user=user)


@app.route('/logout')
def log_out():
    user = get_current_user()
    session.pop('user', None)
    session.pop('teacher', None)
    return redirect(url_for('hello_world'))


@app.route('/register', methods=['POST', 'GET'])
def register():
    refreshdatas()
    user = get_current_user()
    if request.method == 'POST':
        name = request.form.get('name').lower()
        surname = request.form.get('surname').lower()
        location = request.form.get('location2')
        father_name = request.form.get('father_name')
        username = request.form.get('username').lower()
        password = request.form.get('con_password')
        phone = request.form.get('phone')
        subject_1 = request.form.get('subject_1')
        subject_2 = request.form.get('subject_2')
        subject_3 = request.form.get('subject_3')
        comment = request.form.get('comment')
        education_language = request.form.get('education_language')
        language = EducationLanguage.query.filter_by(name=education_language).first()
        password = generate_password_hash(password, method='sha256')
        location = Locations.query.filter_by(name=location).first()
        id = uuid.uuid1()
        user_id = id.hex[0:15]
        birth_year = int(request.form.get('birth_year'))
        birth_month = int(request.form.get('birth_month'))
        birth_day = int(request.form.get('birth_day'))
        a = datetime.today().year
        age = a - birth_year

        ball_time = hour2 + timedelta(minutes=-5)
        add = Users(name=name, surname=surname, password=password, education_language=language.id,
                    location_id=location.id, user_id=user_id, username=username, born_day=birth_day,
                    born_month=birth_month, comment=comment, calendar_day=calendar_day.id,
                    calendar_month=calendar_month.id, calendar_year=calendar_year.id,
                    born_year=birth_year, age=age, father_name=father_name, balance=0)
        db.session.add(add)

        db.session.commit()
        student = Students(user_id=add.id, ball_time=ball_time)
        db.session.add(student)
        db.session.commit()
        subject1 = Subjects.query.filter_by(name=subject_1).first()
        subject2 = Subjects.query.filter_by(name=subject_2).first()
        subject3 = Subjects.query.filter_by(name=subject_3).first()
        if subject1:
            student.subject.append(subject1)
        if subject2:
            student.subject.append(subject2)
        if subject3:
            student.subject.append(subject3)
        db.session.commit()
        add_phone = PhoneList(phone=phone, user_id=add.id)
        db.session.add(add_phone)
        db.session.commit()
        if user:
            flash("Вы успешно зарегистрировали студента")
        else:
            flash('Вы успешно зарегистрировались' + " " + name)
        return redirect(url_for('home'))
    subjects = Subjects.query.all()
    locations = Locations.query.order_by('id').all()
    languages = EducationLanguage.query.order_by('id').all()
    return render_template('basic_routes/register_student.html', locations=locations, languages=languages,
                           subjects=subjects)


@app.route('/register_teacher', methods=['POST', 'GET'])
def register_teacher():
    locations = Locations.query.order_by('id').all()
    subjects = Subjects.query.all()
    languages = EducationLanguage.query.order_by('id').all()
    if request.method == "POST":
        teacher_name = request.form.get('name').lower()
        teacher_surname = request.form.get('surname').lower()
        father_name = request.form.get('father_name')
        teacher_location = request.form.get('location2')
        teacher_username = request.form.get('username').lower()
        confirm_password = request.form.get('con_password')
        teacher_phone = request.form.get('phone')
        birth_day = int(request.form.get('birth_day'))
        birth_month = int(request.form.get('birth_month'))
        birth_year = int(request.form.get('birth_year'))
        subject_1 = request.form.get('subject_1')
        subject_2 = request.form.get('subject_2')
        subject_3 = request.form.get('subject_3')
        comment = request.form.get('comment')
        education_language = request.form.get('education_language')
        a = datetime.today().year
        age = a - birth_year
        id = uuid.uuid1()
        user_id = id.hex[0:15]
        hash = generate_password_hash(confirm_password, method='sha256')
        location = Locations.query.filter_by(name=teacher_location).first()
        language = EducationLanguage.query.filter_by(name=education_language).first()
        add = Users(name=teacher_name, surname=teacher_surname, username=teacher_username, password=hash,
                    education_language=language.id, born_day=birth_day, born_month=birth_month,
                    calendar_day=calendar_day.id,
                    calendar_month=calendar_month.id, calendar_year=calendar_year.id,
                    born_year=birth_year, location_id=location.id, age=age, user_id=user_id, comment=comment,
                    father_name=father_name, balance=0)
        db.session.add(add)
        db.session.commit()
        subject1 = Subjects.query.filter_by(name=subject_1).first()
        subject2 = Subjects.query.filter_by(name=subject_2).first()
        subject3 = Subjects.query.filter_by(name=subject_3).first()
        teacher = Teachers(user_id=add.id)
        db.session.add(teacher)
        db.session.commit()
        if subject1:
            teacher.subject.append(subject1)
        if subject2:
            teacher.subject.append(subject2)
        if subject3:
            teacher.subject.append(subject3)
        db.session.commit()
        add_phone = PhoneList(phone=teacher_phone)
        db.session.add(add_phone)
        db.session.commit()
        flash("Вы успешно зарегистрировали учителя")
        return redirect(url_for('home'))
    return render_template('basic_routes/register_teacher.html', locations=locations, subjects=subjects,
                           languages=languages)


@app.route('/register_staff', methods=['POST', 'GET'])
def register_staff():
    professions = Professions.query.order_by('id').all()
    locations = Locations.query.order_by('id').all()
    subjects = Subjects.query.all()
    languages = EducationLanguage.query.order_by('id').all()
    if request.method == "POST":
        teacher_name = request.form.get('name').lower()
        teacher_surname = request.form.get('surname').lower()
        teacher_location = request.form.get('location2')
        father_name = request.form.get('father_name')
        teacher_username = request.form.get('username').lower()
        confirm_password = request.form.get('con_password')
        teacher_phone = request.form.get('phone')
        birth_day = int(request.form.get('birth_day'))
        birth_month = int(request.form.get('birth_month'))
        birth_year = int(request.form.get('birth_year'))
        subject_1 = request.form.get('subject_1')
        subject_2 = request.form.get('subject_2')
        subject_3 = request.form.get('subject_3')
        comment = request.form.get('comment')
        education_language = request.form.get('education_language')
        a = datetime.today().year
        age = a - birth_year
        id = uuid.uuid1()
        user_id = id.hex[0:15]
        hash = generate_password_hash(confirm_password, method='sha256')
        location = Locations.query.filter_by(name=teacher_location).first()
        language = EducationLanguage.query.filter_by(name=education_language).first()
        add = Users(name=teacher_name, surname=teacher_surname, username=teacher_username, password=hash,
                    education_language=language.id, born_day=birth_day, born_month=birth_month,
                    calendar_day=calendar_day.id,
                    calendar_month=calendar_month.id, calendar_year=calendar_year.id,
                    born_year=birth_year, location_id=location.id, age=age, user_id=user_id, comment=comment,
                    father_name=father_name, balance=0)
        db.session.add(add)
        db.session.commit()
        subject1 = Professions.query.filter_by(name=subject_1).first()
        subject2 = Professions.query.filter_by(name=subject_2).first()
        subject3 = Professions.query.filter_by(name=subject_3).first()
        teacher = Staff(user_id=add.id, profession_id=subject1.id)
        db.session.add(teacher)
        db.session.commit()

        add_phone = PhoneList(phone=teacher_phone)
        db.session.add(add_phone)
        db.session.commit()
        flash("Вы успешно зарегистрировали сотрудника")
        return redirect(url_for('home'))
    return render_template('basic_routes/register_stuff.html', locations=locations, subjects=subjects,
                           languages=languages, professions=professions)
