from backend.app import *
from backend.models.models import *


@app.route('/new_students/<location_id>/<int:page>', methods=['POST', 'GET'])
def new_students(location_id, page):
    form = PhotoForm()
    user = get_current_user()
    subjects = Subjects.query.order_by('id').all()
    languages = EducationLanguage.query.order_by('id').all()
    location = Locations.query.filter(Locations.id == location_id).first()
    course_types = CourseTypes.query.order_by('id').all()
    groups = Groups.query.filter_by(location_id=location_id).order_by('id').all()
    locations = Locations.query.order_by('id').all()
    if request.method == "POST":
        subject_name = request.form.get('subject')
        education_language = request.form.get('education_language')
        language = EducationLanguage.query.filter_by(name=education_language).first()
        subject = Subjects.query.filter_by(name=subject_name).first()
        if subject and not language:
            user_list = []
            for st in subject.st:
                user_list.append(st.user_id)

            user_list = list(dict.fromkeys(user_list))
            students = Users.query.filter(Users.id.in_([user_id for user_id in user_list]),
                                          Users.student != None).paginate(
                page,
                per_page=20)
            result = Users.query.filter(Users.id.in_([user_id for user_id in user_list]),
                                        Users.student != None).count()
            return render_template('view_info/student_list_subject.html', users=students, user=user, form=form,
                                   location_id=location_id, subjects=subjects, languages=languages, result=result,
                                   subject_name=subject_name, education_language=education_language, location=location,
                                   course_types=course_types, groups=groups, locations=locations)
        elif language and not subject:
            language = EducationLanguage.query.filter_by(name=education_language).first()
            students = Users.query.filter(Users.education_language == language.id, Users.student != None).paginate(
                page,
                per_page=20)
            result = Users.query.filter(Users.education_language == language.id,
                                        Users.student != None).count()
            return render_template('view_info/student_list_subject.html', users=students, user=user, form=form,
                                   location_id=location_id, subjects=subjects, languages=languages, result=result,
                                   subject_name=subject_name, education_language=education_language, location=location,
                                   course_types=course_types, groups=groups, locations=locations)
        elif subject and language:
            subject = Subjects.query.filter_by(name=subject_name).first()
            user_list = []
            for st in subject.st:
                user_list.append(st.user_id)

            user_list = list(dict.fromkeys(user_list))
            students = Users.query.filter(Users.id.in_([user_id for user_id in user_list]),
                                          Users.student != None, Users.education_language == language.id).paginate(
                page,
                per_page=20)
            result = Users.query.filter(Users.id.in_([user_id for user_id in user_list]),
                                        Users.student != None,
                                        Users.education_language == language.id).count()
            return render_template('view_info/student_list_subject.html', users=students, user=user, form=form,
                                   location_id=location_id, subjects=subjects, languages=languages, result=result,
                                   subject_name=subject_name, education_language=education_language, location=location,
                                   course_types=course_types, groups=groups, locations=locations)

    students = Users.query.filter(and_(Users.location_id == location_id, Users.student != None)).paginate(page,
                                                                                                          per_page=20)

    return render_template('view_info/student_list_subject.html', users=students, user=user, form=form,
                           location_id=location_id, subjects=subjects, languages=languages, location=location,
                           course_types=course_types, groups=groups, locations=locations)


@app.route('/get_teachers/', methods=["POST"])
def get_teachers():
    info = []
    subject_name = request.get_json()['subject']

    teachers = db.session.query(Teachers).join(Teachers.subject).options(contains_eager(Teachers.subject)).filter(
        Subjects.name.like(f'%{subject_name}%')).all()

    for teacher in teachers:
        body = {}
        body['name'] = teacher.user.name
        body['surname'] = teacher.user.surname
        body['id'] = teacher.id
        body['location'] = teacher.user.location.name

        info.append(body)

    return jsonify(info)


@app.route('/get_price_course/', methods=['POST'])
def get_price_course():
    body = {}
    course_type = int(request.get_json()['course_type'])
    course = CourseTypes.query.filter_by(id=course_type).first()
    body['price'] = course.cost
    return jsonify(body)


@app.route('/students/<int:location_id>/<int:page>', methods=['POST', 'GET'])
def students(location_id, page):
    user = get_current_user()
    form = PhotoForm()

    user_list = db.session.query(Users).join(Users.student).options(contains_eager(Users.student)).filter(
        Students.group != None, Users.location_id == location_id).order_by('id').all()
    user_id = []
    for user in user_list:
        user_id.append(user.id)
    user_id = list(dict.fromkeys(user_id))
    students_list = Students.query.filter(Students.user_id.in_([user_id for user_id in user_id]),
                                          ).order_by('id').paginate(
        page,
        per_page=20)
    locations = Locations.query.order_by('id').all()
    languages = EducationLanguage.query.order_by('id').all()
    location = Locations.query.filter(Locations.id == location_id).first()
    if request.method == "POST":
        education_language = request.form.get('education_language')
        ed_language = EducationLanguage.query.filter_by(name=education_language).first()
        user_list = db.session.query(Users).join(Users.student).options(contains_eager(Users.student)).filter(
            Students.group != None, Users.location_id == location_id,
            Users.education_language == ed_language.id).order_by('id').all()
        user_id = []
        for user in user_list:
            user_id.append(user.id)
        user_id = list(dict.fromkeys(user_id))
        students_list = Students.query.filter(Students.user_id.in_([user_id for user_id in user_id]),
                                              ).order_by('id').paginate(
            page,
            per_page=20)
        return render_template('view_info/students.html', user=user, form=form, location_id=location_id,
                               students=students_list, locations=locations, location=location, languages=languages,
                               education_language=education_language)
    return render_template('view_info/students.html', user=user, form=form, location_id=location_id,
                           students=students_list, locations=locations, location=location, languages=languages)


@app.route('/new_groups/<int:location_id>/<int:page>', methods=['POST', 'GET'])
def new_groups(location_id, page):
    user = get_current_user()
    form = PhotoForm()
    status = False
    groups = Groups.query.filter_by(location_id=location_id, status=False).order_by('id').paginate(
        page,
        per_page=20)
    locations = Locations.query.order_by('id').all()
    location = Locations.query.filter(Locations.id == location_id).first()
    languages = EducationLanguage.query.order_by('id').all()
    subjects = Subjects.query.order_by('id').all()
    if request.method == 'POST':
        education_language = request.form.get('education_language')
        ed_language = EducationLanguage.query.filter_by(name=education_language).first()
        groups = Groups.query.filter_by(location_id=location_id, education_language=ed_language.id,
                                        status=False).order_by(
            'id').paginate(
            page,
            per_page=20)
        return render_template('view_info/new_groups.html', user=user, form=form, locations=locations,
                               location=location,
                               groups=groups, languages=languages, education_language=education_language,
                               subjects=subjects, status=status)
    return render_template('view_info/new_groups.html', user=user, form=form, locations=locations, location=location,
                           groups=groups, languages=languages, subjects=subjects, status=status)


@app.route('/groups/<int:location_id>/<int:page>', methods=['POST', 'GET'])
def groups(location_id, page):
    user = get_current_user()
    form = PhotoForm()
    status = True
    groups = Groups.query.filter_by(location_id=location_id, status=True).order_by('id').paginate(
        page,
        per_page=20)
    locations = Locations.query.order_by('id').all()
    location = Locations.query.filter(Locations.id == location_id).first()
    languages = EducationLanguage.query.order_by('id').all()
    subjects = Subjects.query.order_by('id').all()
    if request.method == 'POST':
        education_language = request.form.get('education_language')
        ed_language = EducationLanguage.query.filter_by(name=education_language).first()
        groups = Groups.query.filter_by(location_id=location_id, education_language=ed_language.id,
                                        status=True).order_by(
            'id').paginate(
            page,
            per_page=20)
        return render_template('view_info/groups.html', user=user, form=form, locations=locations, location=location,
                               groups=groups, languages=languages, education_language=education_language,
                               subjects=subjects, status=status)
    return render_template('view_info/groups.html', user=user, form=form, locations=locations, location=location,
                           groups=groups, languages=languages, subjects=subjects, status=status)


@app.route('/teachers/<int:location_id>/<int:page>', methods=['POST', 'GET'])
def teachers(location_id, page):
    user = get_current_user()
    form = PhotoForm()
    locations = Locations.query.order_by('id').all()
    location = Locations.query.filter(Locations.id == location_id).first()
    languages = EducationLanguage.query.order_by('id').all()
    teachers_list = db.session.query(Users).join(Users.teacher).options(contains_eager(Users.teacher)).filter(
        Teachers.group != None, Users.location_id == location_id).order_by(Users.id).paginate(
        page,
        per_page=20)
    if request.method == "POST":
        education_language = request.form.get('education_language')
        ed_language = EducationLanguage.query.filter_by(name=education_language).first()
        teachers_list = db.session.query(Users).join(Users.teacher).options(contains_eager(Users.teacher)).filter(
            Teachers.group != None, Users.location_id == location_id,
            Users.education_language == ed_language.id).order_by(Users.id).paginate(
            per_page=20)
        return render_template('view_info/Teachers.html', user=user, form=form, location=location, locations=locations,
                               languages=languages, teachers=teachers_list, education_language=education_language)
    return render_template('view_info/Teachers.html', user=user, form=form, location=location, locations=locations,
                           languages=languages, teachers=teachers_list)


@app.route('/staff_list/<int:location_id>/<int:page>', methods=['POST', 'GET'])
def staff_list(location_id, page):
    user = get_current_user()
    form = PhotoForm()
    locations = Locations.query.order_by('id').all()
    location = Locations.query.filter(Locations.id == location_id).first()
    languages = EducationLanguage.query.order_by('id').all()
    professions = Professions.query.order_by('id').all()
    staff_info = Users.query.filter(Users.location_id == location_id, Users.staff != None).order_by(Users.id).paginate(
        page,
        per_page=20)
    if request.method == "POST":
        profession = request.form.get('profession')
        profession_id = Professions.query.filter_by(name=profession).first()
        staff_info = db.session.query(Users).join(Users.staff).options(contains_eager(Users.staff)).filter(
            Staff.profession_id == profession_id.id,
            Users.location_id == location_id, Users.staff != None,
        ).order_by(Users.id).paginate(
            per_page=20)
        return render_template('view_info/staff_list.html', user=user, form=form, locations=locations,
                               location=location, professions=professions, profession=profession,
                               languages=languages, staff_info=staff_info)
    return render_template('view_info/staff_list.html', user=user, form=form, locations=locations, location=location,
                           languages=languages, staff_info=staff_info, professions=professions)


@app.route('/user_profile/<int:user_id>')
def user_profile(user_id):
    user = get_current_user()
    form = PhotoForm()
    student = Users.query.filter(Users.id == user_id).first()
    locations = Locations.query.order_by('id').all()
    student_get = Students.query.filter(Students.user_id == user_id).first()
    attendance_history = AttendanceHistoryStudent.query.filter(
        AttendanceHistoryStudent.student_id == student_get.id).filter(
        or_(AttendanceHistoryStudent.status == False, AttendanceHistoryStudent.status == None)).filter(
        AttendanceHistoryStudent.total_debt != None).all()
    return render_template('view_info/User_profile.html', user=user, form=form, st=student, student_get=student_get,
                           locations=locations, attendance_history=attendance_history, user_id=user_id)


@app.route('/check_password/<user_id>', methods=['POST'])
def check_password(user_id):
    body = {}
    body['checked'] = False
    password = request.get_json()['password']
    username = Users.query.filter_by(id=user_id).first()
    if username and check_password_hash(username.password, password):
        body['checked'] = True
    else:
        body['checked'] = False

    return jsonify(body)


@app.route('/group_profile/<int:group_id>')
def group_profile(group_id):
    user = get_current_user()
    form = PhotoForm()
    locations = Locations.query.order_by('id').all()
    group = Groups.query.filter_by(id=group_id).first()
    students_checked = Students.query.filter(Students.selected == True).order_by('id').all()
    for st in students_checked:
        Students.query.filter(Students.id == st.id).update({"selected": False})
        db.session.commit()
    return render_template('view_info/Inside group.html', locations=locations, user=user, form=form, group=group)


@app.route('/teacher_profile/<int:teacher_id>')
def teacher_profile(teacher_id):
    user = get_current_user()
    form = PhotoForm()
    locations = Locations.query.order_by('id').all()
    teacher = Users.query.filter(Users.id == teacher_id).first()
    teacher_attendance = TeacherSalary.query.filter(TeacherSalary.teacher_id == teacher_id).all()

    location_list = []
    for att in teacher_attendance:
        info = {
            "location_name": att.location.name,
            "location_id": att.location.id
        }
        location_list.append(info)
    new_location_list = []
    for gr in location_list:
        added_to_existing = False
        for merged in new_location_list:
            if merged['location_id'] == gr['location_id']:
                added_to_existing = True
                break
            if added_to_existing:
                break
        if not added_to_existing:
            new_location_list.append(gr)
    return render_template('view_info/Teacher profile.html', user=user, form=form, locations=locations, teacher=teacher,
                           new_location_list=new_location_list, teacher_id=teacher_id)


@app.route('/teacher_salary/<int:location_id>/<int:teacher_id>')
def teacher_salary(location_id, teacher_id):
    user = get_current_user()
    form = PhotoForm()
    locations = Locations.query.order_by('id').all()
    teacher = Users.query.filter(Users.id == teacher_id).first()
    teacher_attendance = TeacherSalary.query.filter(TeacherSalary.teacher_id == teacher_id,
                                                    TeacherSalary.location_id == location_id).order_by(
        desc(TeacherSalary.id)).all()
    return render_template('view_info/Teacher_salary.html', user=user, form=form, locations=locations, teacher=teacher,
                           teacher_id=teacher_id, teacher_attendance=teacher_attendance)


@app.route('/inside_teacher_salary/<int:salary_id>')
def inside_teacher_salary(salary_id):
    user = get_current_user()
    form = PhotoForm()
    locations = Locations.query.order_by('id').all()
    teacher_salary = TeacherSalary.query.filter(TeacherSalary.id == salary_id).first()
    teacher = Teachers.query.filter(Teachers.id == teacher_salary.teacher_id).first()
    return render_template('view_info/Teacher_salary_payment.html', user=user, form=form, locations=locations,
                           teacher_salary=teacher_salary, teacher=teacher, salary_id=salary_id)


@app.route('/staff_profile/<staff_id>')
def staff_profile(staff_id):
    user = get_current_user()
    form = PhotoForm()
    locations = Locations.query.order_by('id').all()
    staff_get = Users.query.filter(Users.id == staff_id).first()
    return render_template('view_info/staff_profile.html', user=user, form=form, staff_get=staff_get, staff_id=staff_id,
                           locations=locations)


@app.route('/staff_salary/<staff_id>')
def staff_salary(staff_id):
    user = get_current_user()
    form = PhotoForm()
    staff = Staff.query.filter(Staff.id == staff_id).first()
    staff_salary_info = StaffSalary.query.filter(StaffSalary.calendar_month == calendar_month.id,
                                                 StaffSalary.calendar_year == calendar_year.id,
                                                 StaffSalary.staff_id == staff_id).first()
    if not staff_salary_info:
        staff_salary_info = StaffSalary(calendar_month=calendar_month.id, calendar_year=calendar_year.id,
                                        total_salary=staff.salary, staff_id=staff_id,
                                        location_id=staff.user.location_id)
        db.session.add(staff_salary_info)
        db.session.commit()

    staff_salaries = StaffSalary.query.order_by(desc(StaffSalary.id)).all()
    locations = Locations.query.order_by('id').all()
    return render_template('view_info/staff_salary.html', user=user, form=form, staff_salaries=staff_salaries,
                           locations=locations)


@app.route('/inside_salary_staff/<int:salary_id>')
def inside_salary_staff(salary_id):
    user = get_current_user()
    form = PhotoForm()
    locations = Locations.query.order_by('id').all()
    staff_salary = StaffSalary.query.filter(StaffSalary.id == salary_id).first()
    staff = Staff.query.filter(Staff.id == staff_salary.staff_id).first()
    return render_template('view_info/inside_staff_salary.html', user=user, form=form, locations=locations,
                           staff_salary=staff_salary, staff=staff)
