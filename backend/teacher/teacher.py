from backend.app import *
from backend.functions.functions import *
from backend.functions.functions import *
from backend.models.models import *

current_month = datetime.now().month
old_month = datetime.now().month - 1
current_year = datetime.now().year
current_day = datetime.now().day
now = datetime.now()
month = datetime.now().month


@app.route('/teacher_groups')
def teacher_groups():
    user = get_current_user()
    form = PhotoForm()
    locations = Locations.query.order_by('id').all()
    return render_template('teacher/Teacher groups.html', form=form, user=user, locations=locations)


@app.route('/teach_inside_group/<int:group_id>')
def teach_inside_group(group_id):
    user = get_current_user()
    form = PhotoForm()
    locations = Locations.query.order_by('id').all()
    group = Groups.query.filter(Groups.id == group_id).first()
    return render_template('teacher/teacher inside group.html', group=group, user=user, form=form, month=month,
                           locations=locations)


@app.route('/attendance/<int:group_id>/<int:month>', methods=['POST', 'GET'])
def attendance(group_id, month):
    user = get_current_user()
    form = PhotoForm()
    group = Groups.query.filter(Groups.id == group_id).first()
    today = datetime.today()
    hour = datetime.strftime(today, "%Y/%m/%d/%H/%M")
    hour2 = datetime.strptime(hour, "%Y/%m/%d/%H/%M")
    locations = Locations.query.order_by('id').all()
    calendar = CalendarDay.query.filter(CalendarDay.date == today).first()

    day_list = []

    number_days = number_of_days_in_month(current_year, current_month)
    for num in range(1, number_days + 1):
        day_list.append(num)

    return render_template('teacher/Teacher give score.html', user=user, group=group, form=form, group_id=group_id,
                           hour2=hour2, day_list=day_list, current_month=current_month, current_day=current_day,
                           old_month=old_month, month=month, locations=locations)


@app.route('/make_attendance/<int:group_id>/<int:student_id>', methods=['POST'])
def make_attendance(group_id, student_id):
    user = get_current_user()
    teacher = Teachers.query.filter(Teachers.user_id == user.id).first()
    group = Groups.query.filter(Groups.id == group_id).first()
    discount = StudentDiscount.query.filter(StudentDiscount.group_id == group_id,
                                            StudentDiscount.student_id == student_id).first()
    type_attendance = request.form.get('type_attendance')
    today = datetime.today()
    hour = datetime.strftime(today, "%Y/%m/%d/%H/%M")
    hour2 = datetime.strptime(hour, "%Y/%m/%d/%H/%M")
    course_type = CourseTypes.query.filter(CourseTypes.id == group.course_type_id).first()
    months = request.form.get('months')
    days = request.form.get('days')
    if not months:
        months = month
    current_month = str(current_year) + "-" + str(months)
    new_month = datetime.strptime(current_month, "%Y-%m")
    date_day = str(current_year) + "-" + str(months) + "-" + str(days)
    date_month = str(current_year) + "-" + str(months)
    date_year = str(current_year)
    date_day = datetime.strptime(date_day, "%Y-%m-%d")
    date_month = datetime.strptime(date_month, "%Y-%m")
    date_year = datetime.strptime(date_year, "%Y")
    calendar_day = CalendarDay.query.filter(CalendarDay.date == date_day).first()
    calendar_month = CalendarMonth.query.filter(CalendarMonth.date == date_month).first()
    calendar_year = CalendarYear.query.filter(CalendarYear.date == date_year).first()
    if not calendar_year:
        calendar_year = CalendarMonth(date=date_year)
        db.session.add(calendar_year)
        db.session.commit()
    if not calendar_month:
        calendar_month = CalendarMonth(date=date_month, year_id=calendar_year.id)
        db.session.add(calendar_month)
        db.session.commit()
    if not calendar_day:
        calendar_day = CalendarDay(date=date_day, month_id=calendar_month.id)
        db.session.add(calendar_day)
        db.session.commit()
    balance_with_discount = 0
    discount_per_day = 0
    if discount:
        balance_with_discount = round(
            (course_type.cost / group.attendance_days) - (discount.discount / group.attendance_days))
        discount_per_day = round(discount.discount / group.attendance_days)

    balance_per_day = round(course_type.cost / group.attendance_days)
    salary_per_day = round(group.teacher_salary / group.attendance_days)
    ball_time = hour2 + timedelta(minutes=1)
    subject = Subjects.query.filter(Subjects.id == group.subject_id).first()
    exist_attendance = Attendance.query.filter(Attendance.student_id == student_id,
                                               Attendance.calendar_day == calendar_day.id,
                                               Attendance.calendar_month == calendar_month.id,
                                               Attendance.calendar_year == calendar_year.id,
                                               Attendance.group_id == group_id,
                                               Attendance.subject_id == subject.id).first()
    if exist_attendance:
        flash("Этот ученик уже получил оценку")
        return redirect(url_for('attendance', group_id=group_id, month=months))

    months = int(months)

    if type_attendance == "absent":
        attendance_add = Attendance(subject_id=group.subject_id, teacher_id=teacher.id, student_id=student_id,
                                    group_id=group_id, calendar_day=calendar_day.id, course_id=group.course_type_id,
                                    status=False, balance_per_day=balance_per_day, calendar_month=calendar_month.id,
                                    calendar_year=calendar_year.id, balance_with_discount=balance_with_discount,
                                    salary_per_day=salary_per_day, location_id=group.location_id,
                                    discount_per_day=discount_per_day)
        db.session.add(attendance_add)
        db.session.commit()
    else:
        homework = int(request.form.get('homework'))
        dictionary = int(request.form.get('dictionary'))
        active = int(request.form.get('active'))
        average_ball = round((homework + dictionary + active) / subject.ball_number)
        attendance_add = Attendance(subject_id=group.subject_id, teacher_id=teacher.id, student_id=student_id,
                                    group_id=group_id, calendar_day=calendar_day.id, course_id=group.course_type_id,
                                    status=True, balance_per_day=balance_per_day, homework=homework,
                                    average_ball=average_ball, activeness=active, calendar_month=calendar_month.id,
                                    calendar_year=calendar_year.id, balance_with_discount=balance_with_discount,
                                    salary_per_day=salary_per_day, location_id=group.location_id,
                                    discount_per_day=discount_per_day)
        db.session.add(attendance_add)
        db.session.commit()
    attendance_history_student = AttendanceHistoryStudent.query.filter(
        AttendanceHistoryStudent.calendar_month == calendar_month.id,
        AttendanceHistoryStudent.student_id == student_id,
        AttendanceHistoryStudent.group_id == group_id,
        AttendanceHistoryStudent.subject_id == subject.id,
        AttendanceHistoryStudent.location_id == group.location_id).first()
    attendance_student_balance = db.session.query(Attendance).join(Attendance.day).options(contains_eager(
        Attendance.day)).filter(extract("year", CalendarDay.date) == current_year,
                                extract("month", CalendarDay.date) == months,
                                Attendance.student_id == student_id, Attendance.group_id == group_id,
                                Attendance.location_id == group.location_id).all()

    total_balance = 0
    total_discount = 0
    for balance in attendance_student_balance:
        if not balance.balance_with_discount:
            total_balance += balance.balance_per_day
        else:
            total_balance += balance.balance_with_discount
        if balance.discount_per_day:
            total_discount = balance.discount_per_day
    if attendance_history_student and attendance_history_student.payment:
        remaining_debt = total_balance - attendance_history_student.payment
        AttendanceHistoryStudent.query.filter(AttendanceHistoryStudent.calendar_month == calendar_month.id,
                                              AttendanceHistoryStudent.calendar_year == calendar_year.id,
                                              AttendanceHistoryStudent.student_id == student_id,
                                              AttendanceHistoryStudent.group_id == group_id,
                                              AttendanceHistoryStudent.subject_id == subject.id,
                                              AttendanceHistoryStudent.location_id == group.location_id
                                              ).update({'remaining_debt': -remaining_debt})

    attendance_student_present = db.session.query(Attendance).join(Attendance.day).options(contains_eager(
        Attendance.day)).filter(extract("year", CalendarDay.date) == current_year,
                                extract("month", CalendarDay.date) == months,
                                Attendance.student_id == student_id, Attendance.group_id == group_id,
                                Attendance.status == True, Attendance.location_id == group.location_id).count()
    attendance_student_absent = db.session.query(Attendance).join(Attendance.day).options(contains_eager(
        Attendance.day)).filter(extract("year", CalendarDay.date) == current_year,
                                extract("month", CalendarDay.date) == months,
                                Attendance.student_id == student_id, Attendance.group_id == group_id,
                                Attendance.status == False, Attendance.location_id == group.location_id).count()

    attendance_student_balls = db.session.query(Attendance).join(Attendance.day).options(contains_eager(
        Attendance.day)).filter(extract("year", CalendarDay.date) == current_year,
                                extract("month", CalendarDay.date) == months,
                                Attendance.student_id == student_id, Attendance.group_id == group_id,
                                Attendance.status == True, Attendance.location_id == group.location_id).all()
    total_average = 0
    for ball in attendance_student_balls:
        total_average += ball.average_ball
    if len(attendance_student_balls) != 0:
        total_average = round(total_average / len(attendance_student_balls))
    if not attendance_history_student:
        add = AttendanceHistoryStudent(student_id=student_id, subject_id=subject.id, group_id=group_id,
                                       total_debt=-total_balance, present_days=attendance_student_present,
                                       absent_days=attendance_student_absent, average_ball=total_average,
                                       location_id=group.location_id, calendar_month=calendar_month.id,
                                       calendar_year=calendar_year.id, total_discount=total_discount)
        db.session.add(add)
        db.session.commit()
    else:
        AttendanceHistoryStudent.query.filter(AttendanceHistoryStudent.calendar_month == calendar_month.id,
                                              AttendanceHistoryStudent.calendar_year == calendar_year.id,
                                              AttendanceHistoryStudent.student_id == student_id,
                                              AttendanceHistoryStudent.group_id == group_id,
                                              AttendanceHistoryStudent.subject_id == subject.id,
                                              AttendanceHistoryStudent.location_id == group.location_id
                                              ).update(
            {"total_debt": -total_balance, "present_days": attendance_student_present,
             "absent_days": attendance_student_absent, "average_ball": total_average, 'total_discount': total_discount
             })
        db.session.commit()
    attendance_history_student = AttendanceHistoryStudent.query.filter(
        AttendanceHistoryStudent.calendar_month == calendar_month.id,
        AttendanceHistoryStudent.student_id == student_id,
        AttendanceHistoryStudent.group_id == group_id,
        AttendanceHistoryStudent.subject_id == subject.id,
        AttendanceHistoryStudent.location_id == group.location_id).first()

    if attendance_history_student.remaining_debt and attendance_history_student.remaining_debt < 0:
        AttendanceHistoryStudent.query.filter(
            AttendanceHistoryStudent.calendar_month == calendar_month.id,
            AttendanceHistoryStudent.student_id == student_id,
            AttendanceHistoryStudent.group_id == group_id,
            AttendanceHistoryStudent.subject_id == subject.id,
            AttendanceHistoryStudent.location_id == group.location_id).update({'status': False})
        db.session.commit()
    debts = 0
    payments = 0
    debt_list = AttendanceHistoryStudent.query.filter(AttendanceHistoryStudent.student_id == student_id,
                                                      AttendanceHistoryStudent.calendar_month == calendar_month.id,
                                                      AttendanceHistoryStudent.calendar_year == calendar_year.id).all()
    for debt in debt_list:
        if debt.total_debt:
            debts += debt.total_debt
        if debt.payment:
            payments += debt.payment
    # result = payments - debts
    student = Students.query.filter(Students.id == student_id).first()
    Students.query.filter(Students.id == student_id).update({"ball_time": ball_time})
    # Users.query.filter(Users.id == student.user_id).update({'balance': -result})
    db.session.commit()
    attendance_teacher = AttendanceHistoryTeacher.query.filter(
        AttendanceHistoryTeacher.calendar_month == calendar_month.id,
        AttendanceHistoryTeacher.teacher_id == teacher.id,
        AttendanceHistoryTeacher.group_id == group_id,
        AttendanceHistoryTeacher.subject_id == subject.id,
        AttendanceHistoryTeacher.location_id == group.location_id).first()
    attendance_teacher_salary = db.session.query(Attendance).join(Attendance.day).options(contains_eager(
        Attendance.day)).filter(extract("year", CalendarDay.date) == current_year,
                                extract("month", CalendarDay.date) == months,
                                Attendance.teacher_id == teacher.id, Attendance.group_id == group_id,
                                Attendance.location_id == group.location_id).all()
    total_salary = 0
    for salary in attendance_teacher_salary:
        total_salary += salary.salary_per_day
    if not attendance_teacher:
        attendance_teacher = AttendanceHistoryTeacher(teacher_id=teacher.id, group_id=group_id,
                                                      subject_id=subject.id, total_salary=total_salary,
                                                      location_id=group.location_id, calendar_month=calendar_month.id,
                                                      calendar_year=calendar_year.id)
        db.session.add(attendance_teacher)
        db.session.commit()
    else:
        AttendanceHistoryTeacher.query.filter(AttendanceHistoryTeacher.calendar_month == calendar_month.id,
                                              AttendanceHistoryTeacher.calendar_year == calendar_year.id,
                                              AttendanceHistoryTeacher.teacher_id == teacher.id,
                                              AttendanceHistoryTeacher.group_id == group_id,
                                              AttendanceHistoryTeacher.subject_id == subject.id,
                                              AttendanceHistoryTeacher.location_id == group.location_id).update(
            {"total_salary": total_salary, 'status': False})
        db.session.commit()
    attendance_teacher = AttendanceHistoryTeacher.query.filter(
        AttendanceHistoryTeacher.calendar_month == calendar_month.id,
        AttendanceHistoryTeacher.teacher_id == teacher.id,
        AttendanceHistoryTeacher.group_id == group_id,
        AttendanceHistoryTeacher.subject_id == subject.id,
        AttendanceHistoryTeacher.location_id == group.location_id).first()
    if attendance_teacher.taken_money:
        remaining_salary = attendance_teacher.total_salary - attendance_teacher.taken_money
        AttendanceHistoryTeacher.query.filter(
            AttendanceHistoryTeacher.calendar_month == calendar_month.id,
            AttendanceHistoryTeacher.teacher_id == teacher.id,
            AttendanceHistoryTeacher.group_id == group_id,
            AttendanceHistoryTeacher.subject_id == subject.id,
            AttendanceHistoryTeacher.location_id == group.location_id).update({'remaining_salary': remaining_salary})
        db.session.commit()
    salary_history = AttendanceHistoryTeacher.query.filter(
        AttendanceHistoryTeacher.calendar_month == calendar_month.id,
        AttendanceHistoryTeacher.calendar_year == calendar_year.id,
        AttendanceHistoryTeacher.teacher_id == teacher.id, AttendanceHistoryTeacher.location_id == group.location_id,
    ).all()

    salary_location_total = 0
    for salary in salary_history:
        salary_location_total += salary.total_salary
    salary_location = TeacherSalary.query.filter(TeacherSalary.location_id == group.location_id,
                                                 TeacherSalary.teacher_id == teacher.id,
                                                 TeacherSalary.calendar_year == calendar_year.id,
                                                 TeacherSalary.calendar_month == calendar_month.id).first()
    if not salary_location:
        salary_location = TeacherSalary(location_id=group.location_id,
                                        teacher_id=teacher.id,
                                        calendar_month=calendar_month.id,
                                        calendar_year=calendar_year.id,
                                        total_salary=salary_location_total)
        db.session.add(salary_location)
        db.session.commit()
    else:
        TeacherSalary.query.filter(TeacherSalary.location_id == group.location_id,
                                   TeacherSalary.teacher_id == teacher.id,
                                   TeacherSalary.calendar_year == calendar_year.id,
                                   TeacherSalary.calendar_month == calendar_month.id,
                                   ).update({"total_salary": salary_location_total, 'status': False})
        db.session.commit()
    salary_location = TeacherSalary.query.filter(TeacherSalary.location_id == group.location_id,
                                                 TeacherSalary.teacher_id == teacher.id,
                                                 TeacherSalary.calendar_year == calendar_year.id,
                                                 TeacherSalary.calendar_month == calendar_month.id).first()
    if salary_location.taken_money:
        remaining_salary = salary_location.total_salary - salary_location.taken_money
        TeacherSalary.query.filter(TeacherSalary.location_id == group.location_id,
                                   TeacherSalary.teacher_id == teacher.id,
                                   TeacherSalary.calendar_year == calendar_year.id,
                                   TeacherSalary.calendar_month == calendar_month.id).update(
            {'remaining_salary': remaining_salary})
        db.session.commit()
    # salaries = 0
    # taken_salaries = 0
    # salary_list = AttendanceHistoryTeacher.query.filter(AttendanceHistoryTeacher.teacher_id == teacher.id).all()
    # for salary in salary_list:
    #     salaries += salary.total_salary
    #     if salary.taken_money:
    #         taken_salaries += salary.taken_money
    # result = salaries - taken_salaries
    # Users.query.filter(Users.id == teacher.user_id).update({'balance': result})
    # db.session.commit()
    flash('Студент набрал баллы')
    return redirect(url_for('attendance', group_id=group_id, month=months))
