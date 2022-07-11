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
    accounting_period = AccountingPeriod.query.order_by(desc(AccountingPeriod.id)).first()
    add = TeacherSalaries(payment_sum=teacher_salary, reason=reason, payment_type_id=payment_type_id.id,
                          teacher_id=teacher_cash.teacher_id, location_id=teacher_cash.location_id,
                          calendar_month=calendar_month.id, calendar_day=calendar_day.id,
                          calendar_year=calendar_year.id, account_period_id=accounting_period.id,
                          salary_location_id=teacher_cash.id)
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

        if result < 0:
            remaining_salary = abs(result)
            AttendanceHistoryTeacher.query.filter(AttendanceHistoryTeacher.id == attendance_teacher.id).update(
                {'remaining_salary': remaining_salary})
            db.session.commit()
            taken_money = attendance_teacher.salary_from_payment - attendance_teacher.remaining_salary
            AttendanceHistoryTeacher.query.filter(AttendanceHistoryTeacher.id == attendance_teacher.id).update(
                {'taken_money': taken_money})
            db.session.commit()
            payment_sum = attendance_teacher.total_salary - remaining_salary
            add_salary = TeacherSalaryGroup(payment_sum=payment_sum, reason=reason, payment_type_id=payment_type_id.id,
                                            salary_location_id=teacher_cash.id, teacher_id=teacher_cash.teacher_id,
                                            location_id=teacher_cash.location_id, calendar_day=calendar_day.id,
                                            calendar_month=calendar_month.id, calendar_year=calendar_year.id,
                                            account_period_id=accounting_period.id,
                                            group_id=attendance_teacher.group_id, main_salary_id=add.id,
                                            attendance_history=attendance_teacher.id
                                            )
            db.session.add(add_salary)
            db.session.commit()
        else:
            AttendanceHistoryTeacher.query.filter(AttendanceHistoryTeacher.id == attendance_teacher.id).update(
                {'remaining_salary': 0, "taken_money": attendance_teacher.total_salary, 'status': True})
            db.session.commit()
            add_salary = TeacherSalaryGroup(payment_sum=attendance_teacher.total_salary, reason=reason,
                                            payment_type_id=payment_type_id.id,
                                            salary_location_id=teacher_cash.id, teacher_id=teacher_cash.teacher_id,
                                            location_id=teacher_cash.location_id, calendar_day=calendar_day.id,
                                            calendar_month=calendar_month.id, calendar_year=calendar_year.id,
                                            account_period_id=accounting_period.id,
                                            group_id=attendance_teacher.group_id, main_salary_id=add.id,
                                            attendance_history=attendance_teacher.id
                                            )
            db.session.add(add_salary)
            db.session.commit()
        salary_sum = result
    accounting_info = AccountingInfo.query.filter(AccountingInfo.payment_type_id == payment_type_id.id,
                                                  AccountingInfo.location_id == add.location_id,
                                                  AccountingInfo.calendar_month == calendar_month.id,
                                                  AccountingInfo.calendar_year == calendar_year.id,
                                                  AccountingInfo.account_period_id == accounting_period.id).first()
    if not accounting_info:
        accounting_info = AccountingInfo(payment_type_id=payment_type_id.id, location_id=add.location_id,
                                         all_staff_salaries=teacher_salary, calendar_month=calendar_month.id,
                                         calendar_year=calendar_year.id, account_period_id=accounting_period.id)
        db.session.add(accounting_info)
        db.session.commit()
    else:

        if accounting_info.all_teacher_salaries:
            teachers_salaries = accounting_info.all_teacher_salaries + teacher_salary
        else:
            teachers_salaries = teacher_salary
        AccountingInfo.query.filter(AccountingInfo.id == accounting_info.id).update({
            'all_teacher_salaries': teachers_salaries
        })
        db.session.commit()
        update_account(accounting_info.id)

    return redirect(url_for('inside_teacher_salary', salary_id=salary_id))


@app.route('/delete_salary_teacher/<int:salary_id>/<location>')
def delete_salary_teacher(salary_id, location):
    refreshdatas()
    teacher_salary = TeacherSalaries.query.filter(TeacherSalaries.id == salary_id).first()
    teacher = Teachers.query.filter(Teachers.id == teacher_salary.teacher_id).first()
    teacher_cash = TeacherSalary.query.filter(TeacherSalary.id == teacher_salary.salary_location_id,
                                              TeacherSalary.teacher_id == teacher.id,
                                              TeacherSalary.location_id == teacher_salary.location_id,
                                              TeacherSalary.salary_from_payment != None,
                                              TeacherSalary.taken_money != None).first()
    result = teacher_cash.taken_money - teacher_salary.payment_sum

    remaining_salary = teacher_cash.total_salary - result
    if remaining_salary == teacher_cash.total_salary:
        remaining_salary = 0
    TeacherSalary.query.filter(TeacherSalary.id == teacher_cash.id).update(
        {"taken_money": result, "remaining_salary": remaining_salary, "status": False})

    salary = teacher_salary.payment_sum
    while salary > 0:
        attendance_teacher = AttendanceHistoryTeacher.query.filter(
            AttendanceHistoryTeacher.calendar_year == teacher_cash.calendar_year,
            AttendanceHistoryTeacher.calendar_month == teacher_cash.calendar_month,
            AttendanceHistoryTeacher.teacher_id == teacher_cash.teacher_id,
            AttendanceHistoryTeacher.location_id == teacher_cash.location_id).order_by(
            desc(AttendanceHistoryTeacher.calendar_month, AttendanceHistoryTeacher.salary_from_payment != None,
                 AttendanceHistoryTeacher.taken_money != None)).first()
        if not attendance_teacher:
            attendance_teacher = AttendanceHistoryTeacher.query.filter(
                AttendanceHistoryTeacher.calendar_year == teacher_cash.calendar_year,
                AttendanceHistoryTeacher.calendar_month == teacher_cash.calendar_month,
                AttendanceHistoryTeacher.teacher_id == teacher_cash.teacher_id,
                AttendanceHistoryTeacher.location_id == teacher_cash.location_id).order_by(
                desc(AttendanceHistoryTeacher.calendar_month)).filter(
                or_(AttendanceHistoryTeacher.salary_from_payment != None,
                    AttendanceHistoryTeacher.taken_money != None)).first()
        print(attendance_teacher.taken_money)
        salary_attendance = TeacherSalaryGroup.query.filter(TeacherSalaryGroup.main_salary_id == teacher_salary.id,
                                                            TeacherSalaryGroup.attendance_history == attendance_teacher.id,
                                                            TeacherSalaryGroup.salary_location_id == teacher_cash.id,
                                                            TeacherSalaryGroup.location_id == teacher_cash.location_id,
                                                            TeacherSalaryGroup.calendar_day == teacher_salary.calendar_day,
                                                            TeacherSalaryGroup.calendar_month == teacher_salary.calendar_month,
                                                            TeacherSalaryGroup.calendar_year == teacher_salary.calendar_year,
                                                            TeacherSalaryGroup.account_period_id == teacher_salary.account_period_id,
                                                            TeacherSalaryGroup.teacher_id == teacher_salary.teacher_id,
                                                            TeacherSalaryGroup.payment_sum <= attendance_teacher.taken_money).first()
        print(salary_attendance.payment_sum)
        result = attendance_teacher.taken_money - salary_attendance.payment_sum
        if result:
            remaining_salary = attendance_teacher.total_salary - result
        else:
            remaining_salary = 0
        AttendanceHistoryTeacher.query.filter(AttendanceHistoryTeacher.id == attendance_teacher.id).update({
            "remaining_salary": remaining_salary,
            "taken_money": result,
            "status": False})
        db.session.delete(salary_attendance)
        db.session.commit()

        salary = salary - salary_attendance.payment_sum
        print(salary)
    accounting_info = AccountingInfo.query.filter(AccountingInfo.payment_type_id == teacher_salary.payment_type_id,
                                                  AccountingInfo.location_id == teacher_salary.location_id,
                                                  AccountingInfo.calendar_month == calendar_month.id,
                                                  AccountingInfo.calendar_year == calendar_year.id,
                                                  AccountingInfo.account_period_id == teacher_salary.account_period_id).first()
    if not accounting_info:
        accounting_info = AccountingInfo(payment_type_id=teacher_salary.payment_type_id,
                                         location_id=teacher_salary.location_id,
                                         all_staff_salaries=-teacher_salary.payment_sum,
                                         calendar_month=calendar_month.id,
                                         calendar_year=calendar_year.id,
                                         account_period_id=teacher_salary.account_period_id)
        db.session.add(accounting_info)
        db.session.commit()
    else:

        if accounting_info.all_teacher_salaries:
            teachers_salaries = accounting_info.all_teacher_salaries - teacher_salary.payment_sum
        else:
            teachers_salaries = -teacher_salary.payment_sum
        AccountingInfo.query.filter(AccountingInfo.id == accounting_info.id).update({
            'all_teacher_salaries': teachers_salaries
        })
        db.session.commit()
        update_account(accounting_info.id)
    deleted_salary = DeletedTeacherSalaries(payment_sum=teacher_salary.payment_sum, reason=teacher_salary.reason,
                                            payment_type_id=teacher_salary.payment_type_id,
                                            teacher_id=teacher_cash.teacher_id, location_id=teacher_cash.location_id,
                                            calendar_month=teacher_salary.calendar_month,
                                            calendar_day=teacher_salary.calendar_day,
                                            calendar_year=teacher_salary.calendar_year,
                                            account_period_id=teacher_salary.account_period_id,
                                            salary_location_id=teacher_salary.salary_location_id,
                                            deleted_date=calendar_day.date)
    db.session.add(deleted_salary)
    db.session.commit()
    db.session.delete(teacher_salary)
    db.session.commit()
    if location == "account":
        return redirect(url_for('account_info', page=1, location=accounting_info.location_id))
    else:
        return redirect(url_for('inside_teacher_salary', salary_id=teacher_cash.id))


@app.route('/staff_salary_give/<int:salary_id>', methods=["POST"])
def staff_salary_give(salary_id):
    reason = request.form.get('reason')
    staff_salary = int(request.form.get('staff_salary'))
    payment_type = request.form.get('payment_type')
    staff_salary_info = StaffSalary.query.filter(StaffSalary.id == salary_id).first()
    staff = Staff.query.filter(Staff.id == staff_salary_info.staff_id).first()
    accounting_period = AccountingPeriod.query.order_by(desc(AccountingPeriod.id)).first()
    print(payment_type)
    payment_type_id = PaymentTypes.query.filter(PaymentTypes.name == payment_type).first()
    add = StaffSalaries(payment_sum=staff_salary, reason=reason, payment_type_id=payment_type_id.id,
                        salary_id=salary_id, profession_id=staff.profession_id,
                        location_id=staff_salary_info.location_id, calendar_day=calendar_day.id,
                        calendar_month=calendar_month.id, calendar_year=calendar_year.id,
                        staff_id=staff_salary_info.staff_id, account_period_id=accounting_period.id)
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
    accounting_info = AccountingInfo.query.filter(AccountingInfo.payment_type_id == payment_type_id.id,
                                                  AccountingInfo.location_id == add.location_id,
                                                  AccountingInfo.calendar_month == calendar_month.id,
                                                  AccountingInfo.calendar_year == calendar_year.id,
                                                  AccountingInfo.account_period_id == accounting_period.id).first()
    if not accounting_info:
        accounting_info = AccountingInfo(payment_type_id=payment_type_id.id, location_id=add.location_id,
                                         all_staff_salaries=staff_salary, calendar_month=calendar_month.id,
                                         calendar_year=calendar_year.id, account_period_id=accounting_period.id)
        db.session.add(accounting_info)
        db.session.commit()
    else:
        if accounting_info.all_staff_salaries:

            all_staff_salaries = accounting_info.all_staff_salaries + staff_salary
        else:
            all_staff_salaries = staff_salary
        AccountingInfo.query.filter(AccountingInfo.id == accounting_info.id).update(
            {'all_staff_salaries': all_staff_salaries})
        db.session.commit()
        update_account(accounting_info.id)
    return redirect(url_for('inside_salary_staff', salary_id=salary_id))


@app.route('/delete_staff_salary/<salary_id>', )
def delete_staff_salary(salary_id):
    staff_salary = StaffSalaries.query.filter(StaffSalaries.id == salary_id).first()
    staff_cash = StaffSalary.query.filter(StaffSalary.id == staff_salary.salary_id).first()
    staff = Staff.query.filter(Staff.id == staff_cash.staff_id).first()
    result = staff_cash.taken_money - staff_salary.payment_sum
    remaining_salary = staff_cash.total_salary - result
    StaffSalary.query.filter(StaffSalary.id == staff_cash.id).update(
        {'remaining_salary': remaining_salary, "taken_money": result})
    db.session.commit()
    accounting_info = AccountingInfo.query.filter(AccountingInfo.payment_type_id == staff_salary.payment_type_id,
                                                  AccountingInfo.location_id == staff_salary.location_id,
                                                  AccountingInfo.calendar_month == calendar_month.id,
                                                  AccountingInfo.calendar_year == calendar_year.id,
                                                  AccountingInfo.account_period_id == staff_salary.account_period_id).first()
    if not accounting_info:
        accounting_info = AccountingInfo(payment_type_id=staff_salary.payment_type_id,
                                         location_id=staff_salary.location_id,
                                         all_staff_salaries=-staff_salary.payment_sum, calendar_month=calendar_month.id,
                                         calendar_year=calendar_year.id,
                                         account_period_id=staff_salary.account_period_id)
        db.session.add(accounting_info)
        db.session.commit()
    else:
        if accounting_info.all_staff_salaries:

            all_staff_salaries = accounting_info.all_staff_salaries - staff_salary.payment_sum
        else:
            all_staff_salaries = -staff_salary.payment_sum
        AccountingInfo.query.filter(AccountingInfo.id == accounting_info.id).update(
            {'all_staff_salaries': all_staff_salaries})
        db.session.commit()
    deleted_salary = DeletedStaffSalaries(payment_sum=staff_salary.payment_sum, reason=staff_salary.reason,
                                          payment_type_id=staff_salary.payment_type_id,
                                          salary_id=staff_cash.id, profession_id=staff.profession_id,
                                          location_id=staff_salary.location_id, calendar_day=calendar_day.id,
                                          calendar_month=calendar_month.id, calendar_year=calendar_year.id,
                                          staff_id=staff_cash.staff_id, deleted_date=calendar_day.date,
                                          reason_deleted="reason qoshish kere frontendga",
                                          account_period_id=staff_salary.account_period_id)
    db.session.add(deleted_salary)
    db.session.commit()
    db.session.delete(staff_salary)
    db.session.commit()
    update_account(accounting_info.id)
    flash("Payment was successfully deleted")
    return redirect(url_for('inside_salary_staff', salary_id=staff_cash.id))
