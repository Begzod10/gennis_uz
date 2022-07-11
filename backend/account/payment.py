from backend.app import *
from backend.models.models import *
from datetime import datetime
from dateutil.relativedelta import relativedelta, MO
from backend.functions.functions import *


@app.route('/get_payment/<int:user_id>/<status>', methods=['POST'])
def get_payment(user_id, status):
    today = datetime.today()
    if status == "True":
        status = True
    else:
        status = False
    new_year = datetime.strftime(today, "%Y")
    new_year = datetime.strptime(new_year, "%Y")
    new_month = datetime.strftime(today, "%Y-%m")
    new_month = datetime.strptime(new_month, "%Y-%m")
    new_today = datetime.strftime(today, "%Y-%m-%d")
    new_today = datetime.strptime(new_today, "%Y-%m-%d")
    calendar_year = CalendarYear.query.filter(CalendarYear.date == new_year).first()

    calendar_month = CalendarMonth.query.filter(CalendarMonth.date == new_month,
                                                CalendarMonth.year_id == calendar_year.id).first()
    calendar_day = CalendarDay.query.filter(CalendarDay.date == new_today,
                                            CalendarDay.month_id == calendar_month.id).first()

    refreshdatas()
    accounting_period = AccountingPeriod.query.order_by(desc(AccountingPeriod.id)).first()
    type_payment = request.form.get('type_payment')
    payment_sum = int(request.form.get('payment_sum'))
    student = Students.query.filter(Students.user_id == user_id).first()
    attendance_history_id = int(request.form.get('group_id'))
    attendance_history = AttendanceHistoryStudent.query.filter(
        AttendanceHistoryStudent.id == attendance_history_id).first()
    group = Groups.query.filter(Groups.id == attendance_history.group_id).first()

    attendance = Attendance.query.filter(
        Attendance.group_id == group.id,
        Attendance.calendar_month == attendance_history.calendar_month,
        Attendance.calendar_year == attendance_history.calendar_year,
        Attendance.student_id == attendance_history.student_id).first()
    attendance_day = AttendanceDays.query.filter(AttendanceDays.attendance_id == attendance.id).first()
    if type_payment:
        payment_type = PaymentTypes.query.filter(PaymentTypes.name == type_payment).first()
    else:
        payment_type = PaymentTypes.query.first()
    all_payments = payment_sum

    if not attendance_history.remaining_debt:

        result = all_payments + attendance_history.total_debt
    else:
        result = all_payments + attendance_history.remaining_debt
    all_payments = result

    student_debt = abs(attendance_history.total_debt)

    if all_payments < 0:
        AttendanceHistoryStudent.query.filter(
            AttendanceHistoryStudent.id == attendance_history_id,
            AttendanceHistoryStudent.student_id == student.id).update({'remaining_debt': all_payments})
        db.session.commit()
        attendance_history = AttendanceHistoryStudent.query.filter(
            AttendanceHistoryStudent.student_id == student.id,
            AttendanceHistoryStudent.status == False, AttendanceHistoryStudent.id == attendance_history_id).first()
        student_debt = abs(attendance_history.total_debt)
        remaining_debt = abs(attendance_history.remaining_debt)
        payment = student_debt - remaining_debt
        AttendanceHistoryStudent.query.filter(
            AttendanceHistoryStudent.student_id == student.id,
            AttendanceHistoryStudent.status == False, AttendanceHistoryStudent.id == attendance_history_id).update(
            {'remaining_debt': all_payments, 'payment': payment})
        db.session.commit()
        payment = StudentPayments(student_id=student.id, attendance_history_id=attendance_history_id,
                                  group_id=attendance_history.group_id, location_id=attendance_history.location_id,
                                  calendar_day=calendar_day.id, calendar_month=calendar_month.id,
                                  calendar_year=attendance_history.calendar_year, payment_type_id=payment_type.id,
                                  payment_sum=payment_sum, account_period_id=accounting_period.id, payment=status)
        db.session.add(payment)
        db.session.commit()
    else:
        AttendanceHistoryStudent.query.filter(
            AttendanceHistoryStudent.id == attendance_history_id,
            AttendanceHistoryStudent.student_id == student.id).update(
            {'status': True, 'remaining_debt': 0, 'payment': student_debt})
        db.session.commit()
        payments = StudentPayments.query.filter(StudentPayments.student_id == student.id,
                                                StudentPayments.attendance_history_id == attendance_history_id,
                                                StudentPayments.group_id == attendance_history.group_id,
                                                StudentPayments.location_id == attendance_history.location_id,
                                                StudentPayments.calendar_month == attendance_history.calendar_month,
                                                StudentPayments.calendar_year == attendance_history.calendar_year).all()
        residue_payment = payment_sum - all_payments
        payment = StudentPayments(student_id=student.id, attendance_history_id=attendance_history_id,
                                  group_id=attendance_history.group_id, location_id=attendance_history.location_id,
                                  calendar_day=calendar_day.id, calendar_month=calendar_month.id,
                                  calendar_year=attendance_history.calendar_year, payment_type_id=payment_type.id,
                                  payment_sum=residue_payment, account_period_id=accounting_period.id, payment=status)
        db.session.add(payment)
        db.session.commit()

        attendance_histories = AttendanceHistoryStudent.query.filter(
            AttendanceHistoryStudent.calendar_month == attendance_history.calendar_month,
            AttendanceHistoryStudent.calendar_year == attendance_history.calendar_year,
            AttendanceHistoryStudent.group_id == attendance_history.group_id).all()
        salary_payment = 0
        total_discount = 0
        for pay in attendance_histories:
            if pay.payment:
                salary_payment += pay.payment
            if pay.total_discount:
                total_discount += pay.total_discount
        salary_payment = salary_payment + total_discount
        salary_from_payment = round(salary_payment / attendance_day.balance_per_day) * attendance_day.salary_per_day

        AttendanceHistoryTeacher.query.filter(
            AttendanceHistoryTeacher.calendar_month == attendance_history.calendar_month,
            AttendanceHistoryTeacher.calendar_year == attendance_history.calendar_year,
            AttendanceHistoryTeacher.group_id == attendance_history.group_id,
            AttendanceHistoryTeacher.teacher_id == attendance.group.teacher_id).update(
            {'salary_from_payment': salary_from_payment})
        db.session.commit()

        attendance_salaries = AttendanceHistoryTeacher.query.filter(
            AttendanceHistoryTeacher.location_id == attendance_history.location_id,
            AttendanceHistoryTeacher.teacher_id == attendance_history.group.teacher_id,
            AttendanceHistoryTeacher.calendar_month == attendance_history.calendar_month,
            AttendanceHistoryTeacher.calendar_year == attendance_history.calendar_year).all()
        all_payment_salaries = 0
        for sal in attendance_salaries:
            if sal.salary_from_payment:
                all_payment_salaries += sal.salary_from_payment
        TeacherSalary.query.filter(TeacherSalary.location_id == attendance.location_id,
                                   TeacherSalary.calendar_month == attendance_history.calendar_month,
                                   TeacherSalary.calendar_year == attendance_history.calendar_year).update(
            {'salary_from_payment': all_payment_salaries})
        db.session.commit()
    while all_payments > 0:
        attendance_history = AttendanceHistoryStudent.query.filter(
            AttendanceHistoryStudent.student_id == student.id,
            AttendanceHistoryStudent.status == False).first()

        if not attendance_history and all_payments > 0:
            attendance_history = db.session.query(AttendanceHistoryStudent).join(
                AttendanceHistoryStudent.month).options(contains_eager(AttendanceHistoryStudent.month)).filter(
                AttendanceHistoryStudent.student_id == student.id).order_by(desc(CalendarMonth.date)).first()
            month = attendance_history.month.date
            year = attendance_history.year.date
            new_month = month + relativedelta(months=1)
            calendar_month = CalendarMonth.query.filter(CalendarMonth.date == new_month).first()
            calendar_year = CalendarYear.query.filter(CalendarYear.date == attendance_history.year.date).first()
            if datetime.strftime(new_month, "%m") == "01":
                new_year = year + relativedelta(year=1)
                calendar_year = CalendarYear.query.filter(CalendarYear.date == new_year).first()
                if not calendar_year:
                    calendar_year = CalendarYear(date=new_year)
                    db.session.add(calendar_year)
                    db.session.commit()
            if not calendar_month:
                calendar_month = CalendarMonth(date=new_month, year_id=calendar_year.id)
                db.session.add(calendar_month)
                db.session.commit()
            add = AttendanceHistoryStudent(student_id=student.id, group_id=attendance_history.group_id,
                                           subject_id=attendance_history.subject_id,
                                           location_id=attendance_history.location_id,
                                           calendar_month=calendar_month.id, calendar_year=calendar_year.id,
                                           payment=all_payments)
            db.session.add(add)
            db.session.commit()
            today = datetime.today()

            new_month = datetime.strftime(today, "%Y-%m")
            new_month = datetime.strptime(new_month, "%Y-%m")

            calendar_month = CalendarMonth.query.filter(CalendarMonth.date == new_month,
                                                        CalendarMonth.year_id == calendar_year.id).first()

            payment = StudentPayments(student_id=student.id, attendance_history_id=add.id,
                                      group_id=attendance_history.group_id, location_id=attendance_history.location_id,
                                      calendar_day=calendar_day.id, calendar_month=calendar_month.id, payment=status,
                                      calendar_year=calendar_year.id, payment_type_id=payment_type.id,
                                      payment_sum=all_payments, account_period_id=accounting_period.id)
            db.session.add(payment)
            db.session.commit()
            break
        if attendance_history.total_debt:
            student_debt = abs(attendance_history.total_debt)
            if not attendance_history.remaining_debt:

                result = all_payments + attendance_history.total_debt
            else:
                result = all_payments + attendance_history.remaining_debt
            all_payments = result

            attendance_salary = AttendanceHistoryTeacher.query.filter(
                AttendanceHistoryTeacher.calendar_month == attendance_history.calendar_month,
                AttendanceHistoryTeacher.calendar_year == attendance_history.calendar_year,
                AttendanceHistoryTeacher.group_id == attendance_history.group_id,
                AttendanceHistoryTeacher.teacher_id == attendance_history.group.teacher_id).first()
            attendance = Attendance.query.filter(Attendance.teacher_id == attendance_salary.teacher_id,
                                                 Attendance.group_id == attendance_history.group_id,
                                                 Attendance.calendar_month == attendance_salary.calendar_month,
                                                 Attendance.calendar_year == attendance_salary.calendar_year,
                                                 Attendance.student_id == attendance_history.student_id).order_by(
                desc(Attendance.id)).first()
            if all_payments < 0:
                AttendanceHistoryStudent.query.filter(
                    AttendanceHistoryStudent.student_id == student.id,
                    AttendanceHistoryStudent.status == False).update(
                    {'remaining_debt': all_payments})
                db.session.commit()
                attendance_history = AttendanceHistoryStudent.query.filter(
                    AttendanceHistoryStudent.student_id == student.id,
                    AttendanceHistoryStudent.status == False).first()
                student_debt = abs(attendance_history.total_debt)
                remaining_debt = abs(attendance_history.remaining_debt)
                payment = student_debt - remaining_debt

                AttendanceHistoryStudent.query.filter(
                    AttendanceHistoryStudent.student_id == student.id,
                    AttendanceHistoryStudent.status == False).update(
                    {'remaining_debt': all_payments, 'payment': payment})
                db.session.commit()
                add = StudentPayments(student_id=student.id, attendance_history_id=attendance_history.id,
                                      group_id=attendance_history.group_id,
                                      location_id=attendance_history.location_id,
                                      account_period_id=accounting_period.id,
                                      calendar_day=calendar_day.id,
                                      calendar_month=calendar_month.id,
                                      calendar_year=attendance_history.calendar_year,
                                      payment_type_id=payment_type.id,
                                      payment_sum=payment, payment=status)
                db.session.add(add)
                db.session.commit()
                break
            else:
                AttendanceHistoryStudent.query.filter(
                    AttendanceHistoryStudent.student_id == student.id,
                    AttendanceHistoryStudent.status == False).update(
                    {'status': True, 'remaining_debt': 0, 'payment': student_debt})
                db.session.commit()
                payments = StudentPayments.query.filter(StudentPayments.student_id == student.id,
                                                        StudentPayments.attendance_history_id == attendance_history_id,
                                                        StudentPayments.group_id == attendance_history.group_id,
                                                        StudentPayments.location_id == attendance_history.location_id,
                                                        StudentPayments.calendar_month == attendance_history.calendar_month,
                                                        StudentPayments.calendar_year == attendance_history.calendar_year).all()
                payment = StudentPayments(student_id=student.id, attendance_history_id=attendance_history.id,
                                          group_id=attendance_history.group_id,
                                          location_id=attendance_history.location_id,
                                          calendar_day=calendar_day.id,
                                          calendar_month=calendar_month.id,
                                          calendar_year=attendance_history.calendar_year,
                                          payment_type_id=payment_type.id, payment=status,
                                          payment_sum=all_payments, account_period_id=accounting_period.id)
                db.session.add(payment)
                db.session.commit()

                attendance_histories = AttendanceHistoryStudent.query.filter(
                    AttendanceHistoryStudent.calendar_month == attendance_history.calendar_month,
                    AttendanceHistoryStudent.calendar_year == attendance_history.calendar_year,
                    AttendanceHistoryStudent.group_id == attendance_history.group_id).all()
                salary_payment = 0
                total_discount = 0
                for pay in attendance_histories:
                    salary_payment += pay.payment
                    if pay.total_discount:
                        total_discount += pay.total_discount
                salary_payment = salary_payment + total_discount
                salary_from_payment = round(salary_payment / attendance.balance_per_day) * attendance.salary_per_day

                AttendanceHistoryTeacher.query.filter(
                    AttendanceHistoryTeacher.calendar_month == attendance_history.calendar_month,
                    AttendanceHistoryTeacher.calendar_year == attendance_history.calendar_year,
                    AttendanceHistoryTeacher.group_id == attendance_history.group_id,
                    AttendanceHistoryTeacher.teacher_id == attendance.group.teacher_id).update(
                    {'salary_from_payment': salary_from_payment})
                db.session.commit()
                attendance_salaries = AttendanceHistoryTeacher.query.filter(
                    AttendanceHistoryTeacher.location_id == attendance_history.location_id,
                    AttendanceHistoryTeacher.teacher_id == attendance_history.group.teacher_id,
                    AttendanceHistoryTeacher.calendar_month == attendance_history.calendar_month,
                    AttendanceHistoryTeacher.calendar_year == attendance_history.calendar_year).all()
                all_payment_salaries = 0
                for sal in attendance_salaries:
                    all_payment_salaries += sal.salary_from_payment
                TeacherSalary.query.filter(TeacherSalary.location_id == attendance.location_id,
                                           TeacherSalary.calendar_month == attendance_history.calendar_month,
                                           TeacherSalary.calendar_year == attendance_history.calendar_year).update(
                    {'salary_from_payment': all_payment_salaries})
                db.session.commit()
            all_payments = result
        else:
            attendance_history = AttendanceHistoryStudent.query.filter(
                AttendanceHistoryStudent.student_id == student.id,
                AttendanceHistoryStudent.status == False, AttendanceHistoryStudent.total_debt == None).first()
            total_payment = attendance_history.payment + all_payments
            AttendanceHistoryStudent.query.filter(AttendanceHistoryStudent.id == attendance_history.id).update(
                {'payment': total_payment})
            db.session.commit()

            payment = StudentPayments(student_id=student.id, attendance_history_id=attendance_history.id,
                                      group_id=attendance_history.group_id, location_id=attendance_history.location_id,
                                      calendar_day=calendar_day.id, calendar_month=calendar_month.id,
                                      calendar_year=attendance_history.calendar_year, payment_type_id=payment_type.id,
                                      payment_sum=all_payments, account_period_id=accounting_period.id, payment=status)
            db.session.add(payment)
            db.session.commit()
            all_payments = 0

    today = datetime.today()
    new_year = datetime.strftime(today, "%Y")
    new_year = datetime.strptime(new_year, "%Y")
    new_month = datetime.strftime(today, "%Y-%m")
    new_month = datetime.strptime(new_month, "%Y-%m")
    calendar_year = CalendarYear.query.filter(CalendarYear.date == new_year).first()

    calendar_month = CalendarMonth.query.filter(CalendarMonth.date == new_month,
                                                CalendarMonth.year_id == calendar_year.id).first()

    accounting_info = AccountingInfo.query.filter(AccountingInfo.payment_type_id == payment_type.id,
                                                  AccountingInfo.location_id == group.location_id,
                                                  AccountingInfo.calendar_month == calendar_month.id,
                                                  AccountingInfo.calendar_year == calendar_year.id,
                                                  AccountingInfo.account_period_id == accounting_period.id).first()
    if status:
        if not accounting_info:
            accounting_info = AccountingInfo(payment_type_id=payment.payment_type_id, location_id=group.location_id,
                                             all_payments=payment_sum, calendar_month=calendar_month.id,
                                             calendar_year=calendar_year.id, account_period_id=accounting_period.id)
            db.session.add(accounting_info)
            db.session.commit()
        else:
            if accounting_info.all_payments:
                all_payments = accounting_info.all_payments + payment_sum
            else:
                all_payments = payment_sum
            AccountingInfo.query.filter(AccountingInfo.id == accounting_info.id).update(
                {'all_payments': all_payments})
            db.session.commit()
            update_account(accounting_info.id)
    # else:
    #     if not accounting_info:
    #         accounting_info = AccountingInfo(payment_type_id=payment.payment_type_id, location_id=group.location_id,
    #                                          all_discount=payment_sum, calendar_month=calendar_month.id,
    #                                          calendar_year=calendar_year.id, account_period_id=accounting_period.id)
    #         db.session.add(accounting_info)
    #         db.session.commit()
    #     else:
    #         if accounting_info.all_discount:
    #             all_discount = accounting_info.all_discount + payment_sum
    #         else:
    #             all_discount = payment_sum
    #         AccountingInfo.query.filter(AccountingInfo.id == accounting_info.id).update(
    #             {'all_discount': all_discount})
    #         db.session.commit()
    #         update_account(accounting_info.id)
    flash('Payment was successful')
    return redirect(url_for('user_profile', user_id=user_id))
