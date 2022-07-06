from backend.app import *
from backend.functions.functions import *
from backend.functions.functions import *
from backend.models.models import *
from backend.functions.debt_salary_update import *

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
    discount = StudentCharity.query.filter(StudentCharity.group_id == group_id,
                                           StudentCharity.student_id == student_id).first()
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
    Students.query.filter(Students.id == student_id).update({"ball_time": ball_time})
    subject = Subjects.query.filter(Subjects.id == group.subject_id).first()
    attendance = Attendance.query.filter(Attendance.student_id == student_id,
                                         Attendance.calendar_year == calendar_year.id,
                                         Attendance.location_id == group.location_id,
                                         Attendance.calendar_month == calendar_month.id,
                                         Attendance.teacher_id == group.teacher_id,
                                         Attendance.group_id == group.id, Attendance.subject_id == subject.id,
                                         Attendance.course_id == course_type.id).first()
    if not attendance:
        attendance = Attendance(student_id=student_id, calendar_year=calendar_year.id, location_id=group.location_id,
                                calendar_month=calendar_month.id, teacher_id=teacher.id, group_id=group_id,
                                course_id=course_type.id, subject_id=subject.id)
        db.session.add(attendance)
        db.session.commit()

    exist_attendance = AttendanceDays.query.filter(AttendanceDays.student_id == student_id,
                                                   AttendanceDays.calendar_day == calendar_day.id,
                                                   AttendanceDays.group_id == group_id,
                                                   AttendanceDays.attendance_id == attendance.id).first()
    if exist_attendance:
        flash("Этот ученик уже получил оценку")
        return redirect(url_for('attendance', group_id=group_id, month=months))

    months = int(months)

    if type_attendance == "absent":
        attendance_add = AttendanceDays(teacher_id=teacher.id, student_id=student_id,
                                        calendar_day=calendar_day.id,
                                        status=0, balance_per_day=balance_per_day,
                                        balance_with_discount=balance_with_discount,
                                        salary_per_day=salary_per_day, group_id=group_id, location_id=group.location_id,
                                        discount_per_day=discount_per_day)
        db.session.add(attendance_add)
        db.session.commit()
    else:
        homework = int(request.form.get('homework'))
        dictionary = int(request.form.get('dictionary'))
        active = int(request.form.get('active'))
        average_ball = round((homework + dictionary + active) / subject.ball_number)
        attendance_add = AttendanceDays(student_id=student_id, attendance_id=attendance.id,
                                        dictionary=dictionary,
                                        calendar_day=calendar_day.id,
                                        status=1, balance_per_day=balance_per_day, homework=homework,
                                        average_ball=average_ball, activeness=active, group_id=group_id,
                                        location_id=group.location_id, teacher_id=teacher.id,
                                        balance_with_discount=balance_with_discount,
                                        salary_per_day=salary_per_day,
                                        discount_per_day=discount_per_day)
        db.session.add(attendance_add)
        db.session.commit()

    salary_debt(student_id=student_id, group_id=group_id, main_attendance=attendance.id,
                attendance_id=attendance_add.id, status_attendance=False,
                calendar_day=calendar_day, calendar_month=calendar_month, calendar_year=calendar_year)
    flash('Студент набрал баллы')
    return redirect(url_for('attendance', group_id=group_id, month=months))


@app.route('/attendance_delete/<int:attendance_id>/<int:student_id>/<int:group_id>/<int:main_attendance>')
def attendance_delete(attendance_id, student_id, group_id, main_attendance):
    salary_debt(student_id=student_id, group_id=group_id, attendance_id=attendance_id, status_attendance=True,
                calendar_day=calendar_day, calendar_month=calendar_month, calendar_year=calendar_year,
                main_attendance=main_attendance)
    return redirect(url_for('student_attendances', student_id=student_id, group_id=group_id))
