from backend.app import *
from backend.models import *


def salary_debt(student_id, group_id, attendance_id, status_attendance, calendar_day, calendar_month, calendar_year,
                main_attendance):
    group = Groups.query.filter(Groups.id == group_id).first()
    subject = Subjects.query.filter(Subjects.id == group.subject_id).first()
    teacher = Teachers.query.filter(Teachers.id == group.teacher_id).first()
    attendance = Attendance.query.filter(Attendance.id == main_attendance).first()
    attendancedays = AttendanceDays.query.filter(AttendanceDays.id == attendance_id).first()
    months = int(attendance.month.date.strftime('%m'))
    current_year = int(attendance.year.date.strftime('%Y'))
    if status_attendance == True:
        db.session.delete(attendancedays)
        db.session.commit()
    attendance_history_student = AttendanceHistoryStudent.query.filter(
        AttendanceHistoryStudent.calendar_month == calendar_month.id,
        AttendanceHistoryStudent.student_id == student_id,
        AttendanceHistoryStudent.group_id == group_id,
        AttendanceHistoryStudent.subject_id == subject.id,
        AttendanceHistoryStudent.location_id == group.location_id).first()
    attendance_student_balance = db.session.query(AttendanceDays).join(AttendanceDays.day).options(contains_eager(
        AttendanceDays.day)).filter(extract("year", CalendarDay.date) == current_year,
                                    extract("month", CalendarDay.date) == months,
                                    AttendanceDays.student_id == student_id, Attendance.group_id == group_id,
                                    AttendanceDays.location_id == group.location_id).all()

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

    attendance_student_present = db.session.query(AttendanceDays).join(AttendanceDays.day).options(contains_eager(
        AttendanceDays.day)).filter(extract("year", CalendarDay.date) == current_year,
                                    extract("month", CalendarDay.date) == months,
                                    AttendanceDays.student_id == student_id, AttendanceDays.group_id == group_id,
                                    AttendanceDays.status == 1,
                                    AttendanceDays.location_id == group.location_id).count()
    attendance_student_absent = db.session.query(Attendance).join(AttendanceDays.day).options(contains_eager(
        AttendanceDays.day)).filter(extract("year", CalendarDay.date) == current_year,
                                    extract("month", CalendarDay.date) == months,
                                    AttendanceDays.student_id == student_id, AttendanceDays.group_id == group_id,
                                    AttendanceDays.status == 0,
                                    AttendanceDays.location_id == group.location_id).count()

    attendance_student_balls = db.session.query(AttendanceDays).join(AttendanceDays.day).options(contains_eager(
        AttendanceDays.day)).filter(extract("year", CalendarDay.date) == current_year,
                                    extract("month", CalendarDay.date) == months,
                                    AttendanceDays.student_id == student_id, AttendanceDays.group_id == group_id,
                                    AttendanceDays.status == 1,
                                    AttendanceDays.location_id == group.location_id).all()
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
        AttendanceHistoryStudent.calendar_year == calendar_year.id,
        AttendanceHistoryStudent.student_id == student_id,
        AttendanceHistoryStudent.group_id == group_id,
        AttendanceHistoryStudent.subject_id == subject.id,
        AttendanceHistoryStudent.location_id == group.location_id).first()

    if attendance_history_student.payment and attendance_history_student.payment >= abs(
            attendance_history_student.total_debt):
        AttendanceHistoryStudent.query.filter(
            AttendanceHistoryStudent.calendar_month == attendance_history_student.calendar_month,
            AttendanceHistoryStudent.calendar_year == attendance_history_student.calendar_year,
            AttendanceHistoryStudent.student_id == student_id,
            AttendanceHistoryStudent.group_id == group_id,
            AttendanceHistoryStudent.subject_id == subject.id,
            AttendanceHistoryStudent.location_id == group.location_id).update({'status': True})
        db.session.commit()
    else:
        AttendanceHistoryStudent.query.filter(
            AttendanceHistoryStudent.calendar_month == attendance_history_student.calendar_month,
            AttendanceHistoryStudent.calendar_year == attendance_history_student.calendar_year,
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

    # Users.query.filter(Users.id == student.user_id).update({'balance': -result})

    attendance_teacher = AttendanceHistoryTeacher.query.filter(
        AttendanceHistoryTeacher.calendar_month == calendar_month.id,
        AttendanceHistoryTeacher.teacher_id == teacher.id,
        AttendanceHistoryTeacher.group_id == group_id,
        AttendanceHistoryTeacher.subject_id == subject.id,
        AttendanceHistoryTeacher.location_id == group.location_id).first()
    attendance_teacher_salary = db.session.query(AttendanceDays).join(AttendanceDays.day).options(contains_eager(
        AttendanceDays.day)).filter(extract("year", CalendarDay.date) == current_year,
                                extract("month", CalendarDay.date) == months,
                                AttendanceDays.teacher_id == teacher.id, AttendanceDays.group_id == group_id,
                                AttendanceDays.location_id == group.location_id).all()
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
    status = False
    if attendance_teacher and attendance_teacher.taken_money:
        if attendance_teacher.taken_money >= attendance_teacher.total_salary:
            status = True
        else:
            status = False
    AttendanceHistoryTeacher.query.filter(
        AttendanceHistoryTeacher.calendar_month == calendar_month.id,
        AttendanceHistoryTeacher.teacher_id == teacher.id,
        AttendanceHistoryTeacher.group_id == group_id,
        AttendanceHistoryTeacher.subject_id == subject.id,
        AttendanceHistoryTeacher.location_id == group.location_id).update({"status": status})
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
    status = False
    if salary_location and salary_location.taken_money:
        if salary_location.taken_money >= salary_location.total_salary:
            status = True
        else:
            status = False

    TeacherSalary.query.filter(TeacherSalary.location_id == group.location_id,
                               TeacherSalary.teacher_id == teacher.id,
                               TeacherSalary.calendar_year == calendar_year.id,
                               TeacherSalary.calendar_month == calendar_month.id).update({'status': status})
    db.session.commit()
