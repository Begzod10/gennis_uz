from backend.app import *
from backend.models.models import *
from backend.functions.functions import *


@app.route('/salary_give_teacher/<salary_id>', methods=['POST'])
def salary_give_teacher(salary_id):
    teacher_salary = int(request.form.get('teacher_salary'))
    reason = request.form.get('reason')
    payment_type = request.form.get('payment_type')
    salary_sum = teacher_salary
    teacher_cash = TeacherSalary.query.filter(TeacherSalary.id == salary_id).first()
    payment_type_id = PaymentTypes.query.filter(PaymentTypes.name == payment_type).first()
    add = TeacherSalaries(payment_sum=teacher_salary, reason=reason, payment_type_id=payment_type_id.id,
                          salary_id=salary_id, teacher_id=teacher_cash.teacher_id, location_id=teacher_cash.location_id,
                          calendar_month=calendar_month.id, calendar_day=calendar_day.id,
                          calendar_year=calendar_year.id)
    db.session.add(add)
    db.session.commit()

    if not teacher_cash.remaining_salary:
        result = -teacher_cash.total_salary + teacher_salary
    else:
        result = -teacher_cash.remaining_salary + teacher_salary
    if teacher_cash.taken_money:
        taken_money = teacher_cash.taken_money + teacher_salary
    else:
        taken_money = teacher_salary

    if result < 0:
        remaining_salary = abs(result)
        TeacherSalary.query.filter(TeacherSalary.id == salary_id).update(
            {'remaining_salary': remaining_salary, 'taken_money': taken_money})
        db.session.commit()
    else:
        TeacherSalary.query.filter(TeacherSalary.id == salary_id).update(
            {'remaining_salary': 0, "taken_money": teacher_cash.total_salary, 'status': True})
        db.session.commit()

    while salary_sum > 0:
        attendance_teacher = AttendanceHistoryTeacher.query.filter(
            AttendanceHistoryTeacher.calendar_year == teacher_cash.calendar_year,
            AttendanceHistoryTeacher.calendar_month == teacher_cash.calendar_month,
            AttendanceHistoryTeacher.teacher_id == teacher_cash.teacher_id,
            AttendanceHistoryTeacher.status == False).order_by(desc(AttendanceHistoryTeacher.calendar_month)).first()
        if not attendance_teacher:
            break
        if not attendance_teacher.remaining_salary:
            result = -attendance_teacher.total_salary + salary_sum
        else:
            result = -attendance_teacher.remaining_salary + salary_sum
        if attendance_teacher.taken_money:
            taken_money = attendance_teacher.taken_money + salary_sum
        else:
            taken_money = salary_sum

        if result < 0:
            remaining_salary = abs(result)
            AttendanceHistoryTeacher.query.filter(AttendanceHistoryTeacher.calendar_year == teacher_cash.calendar_year,
                                                  AttendanceHistoryTeacher.calendar_month == teacher_cash.calendar_month,
                                                  AttendanceHistoryTeacher.teacher_id == teacher_cash.teacher_id,
                                                  AttendanceHistoryTeacher.status == False,
                                                  AttendanceHistoryTeacher.id == attendance_teacher.id).update(
                {'remaining_salary': remaining_salary, 'taken_money': taken_money})
            db.session.commit()
        else:
            AttendanceHistoryTeacher.query.filter(AttendanceHistoryTeacher.calendar_year == teacher_cash.calendar_year,
                                                  AttendanceHistoryTeacher.calendar_month == teacher_cash.calendar_month,
                                                  AttendanceHistoryTeacher.teacher_id == teacher_cash.teacher_id,
                                                  AttendanceHistoryTeacher.status == False,
                                                  AttendanceHistoryTeacher.id == attendance_teacher.id).update(
                {'remaining_salary': 0, "taken_money": attendance_teacher.total_salary, 'status': True})
            db.session.commit()
        salary_sum = result
        print(salary_sum)
    return redirect(url_for('inside_teacher_salary', salary_id=salary_id))


@app.route('/staff_salary_give/<int:salary_id>', methods=["POST"])
def staff_salary_give(salary_id):
    reason = request.form.get('reason')
    staff_salary = int(request.form.get('staff_salary'))
    payment_type = request.form.get('payment_type')
    staff_salary_info = StaffSalary.query.filter(StaffSalary.id == salary_id).first()
    payment_type_id = PaymentTypes.query.filter(PaymentTypes.name == payment_type).first()
    add = StaffSalaries(payment_sum=staff_salary, reason=reason, payment_type_id=payment_type_id.id,
                        salary_id=salary_id,
                        location_id=staff_salary_info.location_id, calendar_day=calendar_day.id,
                        calendar_month=calendar_month.id, calendar_year=calendar_year.id,
                        staff_id=staff_salary_info.staff_id)
    db.session.add(add)
    db.session.commit()
    if not staff_salary_info.remaining_salary:
        result = -staff_salary_info.total_salary + staff_salary
    else:
        result = -staff_salary_info.remaining_salary + staff_salary
    if staff_salary_info.taken_money:
        taken_money = staff_salary_info.taken_money + staff_salary
    else:
        taken_money = staff_salary
    if result < 0:
        result = abs(result)
        StaffSalary.query.filter(StaffSalary.id == salary_id).update(
            {'remaining_salary': result, 'taken_money': taken_money})
        db.session.commit()
    else:
        StaffSalary.query.filter(StaffSalary.id == salary_id).update(
            {'remaining_salary': 0, 'taken_money': staff_salary_info.total_salary, 'status': True})
        db.session.commit()
    return redirect(url_for('inside_salary_staff', salary_id=salary_id))
