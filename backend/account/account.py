from backend.app import *
from backend.functions.functions import *
from backend.models.models import *
from backend.teacher.teacher import *


@app.route('/account_info/<int:page>/<int:location>', methods=['GET', 'POST'])
def account_info(page, location):
    user = get_current_user()
    form = PhotoForm()
    locations = Locations.query.order_by('id').all()
    location_name = Locations.query.filter(Locations.id == location).first()
    today = datetime.today()
    year = datetime.strftime(today, "%Y")
    month = datetime.strftime(today, "%m")
    day = datetime.strftime(today, "%d")
    year = datetime.strptime(year, "%Y")
    month = datetime.strptime(month, "%m")
    day = datetime.strptime(day, "%d")
    payment_types = PaymentTypes.query.order_by(PaymentTypes.id).all()
    payment_types_first = PaymentTypes.query.order_by(PaymentTypes.id).first()
    close_filter = "opened"
    result = 0
    if request.method == "GET":
        current_year = CalendarYear.query.filter(CalendarYear.date == new_year).first()
        current_month = CalendarMonth.query.filter(CalendarMonth.year_id == current_year.id,
                                                   CalendarMonth.date == new_month).first()
        current_day = CalendarDay.query.filter(CalendarDay.month_id == current_month.id,
                                               CalendarDay.date == new_today).first()
        account_period = AccountingPeriod.query.order_by(desc(AccountingPeriod.id)).first()
        account_period_list = AccountingPeriod.query.order_by(desc(AccountingPeriod.id)).all()
        accounting_info = AccountingInfo.query.filter(AccountingInfo.account_period_id == account_period.id,
                                                      AccountingInfo.payment_type_id == payment_types_first.id).first()
        if accounting_info and accounting_info.all_payments:
            result = accounting_info.all_payments

        year_id_list = []
        month_list = []
        day_list = []
        for year_id in account_period_list:
            year_id_list.append(year_id.year_id)
            month_list.append(year_id.month_id)
            for day_id in year_id.day:
                day_list.append(day_id.id)
        year_id_list = list(dict.fromkeys(year_id_list))
        month_list = list(dict.fromkeys(month_list))
        day_list = list(dict.fromkeys(day_list))
        other_years = CalendarYear.query.filter(CalendarYear.id != account_period.year_id, CalendarYear.id.in_(
            [year_id for year_id in year_id_list])).order_by(
            CalendarYear.date).all()

        other_months = CalendarMonth.query.filter(CalendarMonth.date != current_month.date,
                                                  CalendarMonth.year_id == current_year.id,
                                                  CalendarMonth.id.in_(
                                                      [month_id for month_id in month_list])
                                                  ).order_by(
            CalendarMonth.date).all()
        other_days = CalendarDay.query.filter(CalendarDay.date != current_day.date,
                                              CalendarDay.month_id == current_month.id,
                                              CalendarDay.id.in_(
                                                  [day_id for day_id in day_list])
                                              ).order_by(CalendarDay.date).all()
        student_payments = StudentPayments.query.filter(
            StudentPayments.account_period_id == account_period.id,
            StudentPayments.payment_type_id == payment_types_first.id, StudentPayments.payment == True).paginate(
            page,
            per_page=50)
        accounting_type = "Оплата студентов"
        return render_template('account_folder/Accounting.html', user=user, form=form, location=location,
                               current_day=current_day, current_month=current_month, current_year=current_year,
                               other_months=other_months, other_years=other_years, other_days=other_days,
                               student_payments=student_payments, locations=locations, location_name=location_name,
                               accounting_type=accounting_type, day=day, month=month, year=year,
                               close_filter=close_filter, result=result, accounting_info=accounting_info,
                               payment_type=payment_types_first.name, payment_types=payment_types)
    elif request.method == "POST":
        payment_type = request.form.get('payment_type')
        payment_type = PaymentTypes.query.filter(PaymentTypes.name == payment_type).first()
        year = request.form.get('year')
        month = request.form.get('month')
        day = request.form.get('day')
        close_filter = request.form.get('close_filter')

        date = str(year) + "-" + str(month) + "-" + str(day)
        date = datetime.strptime(date, "%Y-%m-%d")
        year = datetime.strftime(date, "%Y")
        month = datetime.strftime(date, "%Y-%m")
        day = datetime.strftime(date, "%Y-%m-%d")

        year = datetime.strptime(year, "%Y")
        month = datetime.strptime(month, "%Y-%m")
        day = datetime.strptime(day, "%Y-%m-%d")
        current_year = CalendarYear.query.filter(CalendarYear.date == year).first()

        current_month = CalendarMonth.query.filter(CalendarMonth.year_id == current_year.id,
                                                   CalendarMonth.date == month).first()
        current_day = CalendarDay.query.filter(CalendarDay.month_id == current_month.id,
                                               CalendarDay.date == day).first()

        account_period = AccountingPeriod.query.order_by(desc(AccountingPeriod.id)).first()
        account_period_list = AccountingPeriod.query.order_by(desc(AccountingPeriod.id)).all()
        accounting_info = AccountingInfo.query.filter(AccountingInfo.account_period_id == account_period.id,
                                                      AccountingInfo.payment_type_id == payment_type.id).first()

        year_id_list = []
        month_list = []
        day_list = []
        for year_id in account_period_list:
            year_id_list.append(year_id.year_id)
            month_list.append(year_id.month_id)
            for day_id in year_id.day:
                day_list.append(day_id.id)
        year_id_list = list(dict.fromkeys(year_id_list))
        month_list = list(dict.fromkeys(month_list))
        day_list = list(dict.fromkeys(day_list))
        other_years = CalendarYear.query.filter(CalendarYear.id != account_period.year_id, CalendarYear.id.in_(
            [year_id for year_id in year_id_list])).order_by(
            CalendarYear.date).all()

        other_months = CalendarMonth.query.filter(CalendarMonth.date != current_month.date,
                                                  CalendarMonth.year_id == current_year.id,
                                                  CalendarMonth.id.in_(
                                                      [month_id for month_id in month_list])
                                                  ).order_by(
            CalendarMonth.date).all()
        other_days = CalendarDay.query.filter(CalendarDay.date != current_day.date,
                                              CalendarDay.month_id == current_month.id,
                                              CalendarDay.id.in_(
                                                  [day_id for day_id in day_list])
                                              ).order_by(CalendarDay.date).all()

        accounting_type = request.form.get('accounting_type')

        if accounting_type == "Оплата студентов":

            student_payments = StudentPayments.query.filter(
                StudentPayments.account_period_id == account_period.id,
                StudentPayments.payment_type_id == payment_type.id, StudentPayments.payment == True).paginate(
                page,
                per_page=50)
            if accounting_info and accounting_info.all_payments:
                result = accounting_info.all_payments
            return render_template('account_folder/Accounting.html', user=user, form=form, location=location,
                                   current_day=current_day, current_month=current_month, current_year=current_year,
                                   other_months=other_months, other_years=other_years, other_days=other_days,
                                   student_payments=student_payments, accounting_type=accounting_type,
                                   result=result, accounting_info=accounting_info,
                                   locations=locations, location_name=location_name, year=year, month=month, day=day,
                                   payment_types=payment_types, payment_type=payment_type.name,
                                   close_filter=close_filter)
        elif accounting_type == "Зарплаты":
            type_salary = request.form.get('type_salary')
            if not type_salary:
                type_salary = "teacher"
            if type_salary == "teacher":
                teacher_salaries = TeacherSalaries.query.filter(
                    TeacherSalaries.account_period_id == account_period.id,
                    TeacherSalaries.payment_type_id == payment_type.id
                ).paginate(
                    page,
                    per_page=50)
                if accounting_info and accounting_info.all_teacher_salaries:
                    result = accounting_info.all_teacher_salaries
                return render_template('account_folder/Accounting.html', user=user, form=form, location=location,
                                       current_day=current_day, current_month=current_month, current_year=current_year,
                                       other_months=other_months, other_years=other_years, other_days=other_days,
                                       teacher_salaries=teacher_salaries, accounting_type=accounting_type,
                                       locations=locations, location_name=location_name, year=year, month=month,
                                       day=day, type_salary=type_salary, accounting_info=accounting_info,
                                       payment_types=payment_types, payment_type=payment_type.name,
                                       close_filter=close_filter, result=result)
            else:
                professions = Professions.query.order_by('id').all()
                job = request.form.get('job')
                profession = Professions.query.first()
                if accounting_info and accounting_info.all_staff_salaries:
                    result = accounting_info.all_staff_salaries
                if not job:
                    job = profession.id
                else:
                    job = int(job)
                job = Professions.query.filter(Professions.id == job).first()
                staff_salaries = StaffSalaries.query.filter(
                    StaffSalaries.account_period_id == account_period.id,
                    StaffSalaries.payment_type_id == payment_type.id
                ).paginate(
                    page,
                    per_page=50)

                return render_template('account_folder/Accounting.html', user=user, form=form, location=location,
                                       current_day=current_day, current_month=current_month, current_year=current_year,
                                       other_months=other_months, other_years=other_years, other_days=other_days,
                                       staff_salaries=staff_salaries, accounting_type=accounting_type,
                                       locations=locations, location_name=location_name, year=year, month=month,
                                       day=day, type_salary=type_salary, professions=professions,
                                       payment_types=payment_types, payment_type=payment_type.name,
                                       close_filter=close_filter, job=job, result=result,
                                       accounting_info=accounting_info)
        elif accounting_type == "Накладные расходы":
            overhead = Overhead.query.filter(Overhead.account_period_id == account_period.id,
                                             Overhead.payment_type_id == payment_type.id).paginate(
                page,
                per_page=50)
            if accounting_info and accounting_info.all_overhead:
                result = accounting_info.all_overhead
            overhead_months = CalendarMonth.query.filter(
                CalendarMonth.year_id == current_year.id,
                CalendarMonth.id.in_(
                    [month_id for month_id in month_list])
            ).order_by(
                CalendarMonth.date).all()
            overhead_days = CalendarDay.query.filter(
                CalendarDay.month_id == current_month.id,
                CalendarDay.id.in_(
                    [day_id for day_id in day_list])
            ).order_by(CalendarDay.date).all()
            return render_template('account_folder/Accounting.html', user=user, form=form, location=location,
                                   current_day=current_day, current_month=current_month, current_year=current_year,
                                   other_months=other_months, other_years=other_years, other_days=other_days,
                                   overhead=overhead, accounting_type=accounting_type,
                                   locations=locations, location_name=location_name, year=year, month=month,
                                   day=day, overhead_months=overhead_months, overhead_days=overhead_days,
                                   payment_types=payment_types, payment_type=payment_type.name,
                                   close_filter=close_filter, result=result,
                                   accounting_info=accounting_info)
        elif accounting_type == "Список скидок":

            student_discounts = StudentPayments.query.filter(
                StudentPayments.account_period_id == account_period.id, StudentPayments.payment == False).paginate(
                page,
                per_page=50)
            return render_template('account_folder/Accounting.html', user=user, form=form, location=location,
                                   current_day=current_day, current_month=current_month, current_year=current_year,
                                   other_months=other_months, other_years=other_years, other_days=other_days,
                                   student_discounts=student_discounts, accounting_type=accounting_type,
                                   locations=locations, location_name=location_name, year=year, month=month,
                                   day=day, payment_types=payment_types, payment_type=payment_type.name,
                                   close_filter=close_filter, result=result,
                                   accounting_info=accounting_info)


@app.route('/delete_payment/<int:payment_id>')
def delete_payment(payment_id):
    payment = StudentPayments.query.filter(StudentPayments.id == payment_id).first()
    attendance_history = AttendanceHistoryStudent.query.filter(
        AttendanceHistoryStudent.id == payment.attendance_history_id).first()
    group = Groups.query.filter(Groups.id == attendance_history.group_id).first()

    attendance = Attendance.query.filter(Attendance.location_id == group.location_id,
                                         Attendance.calendar_year == payment.calendar_year,
                                         Attendance.calendar_month == payment.calendar_month,
                                         Attendance.student_id == payment.student_id, Attendance.group_id == group.id,
                                         Attendance.teacher_id == group.teacher_id).first()
    attendance_days = AttendanceDays.query.filter(AttendanceDays.attendance_id == attendance.id,
                                                  AttendanceDays.teacher_id == group.teacher_id,
                                                  AttendanceDays.student_id == payment.student_id).first()
    attendance_teacher = AttendanceHistoryTeacher.query.filter(AttendanceHistoryTeacher.teacher_id == group.teacher_id,
                                                               AttendanceHistoryTeacher.calendar_month == payment.calendar_month,
                                                               AttendanceHistoryTeacher.calendar_year == payment.calendar_year,
                                                               AttendanceHistoryTeacher.group_id == group.id,
                                                               AttendanceHistoryTeacher.location_id == group.location_id).first()

    if abs(attendance_history.total_debt) == attendance_history.payment:
        result = (attendance_history.payment / attendance_days.balance_per_day * attendance_days.salary_per_day)
        result = attendance_teacher.salary_from_payment - result
        AttendanceHistoryTeacher.query.filter(AttendanceHistoryTeacher.id == attendance_teacher.id).update(
            {'salary_from_payment': result})
        TeacherSalary.query.filter(TeacherSalary.calendar_month == payment.calendar_month,
                                   TeacherSalary.calendar_year == payment.calendar_year,
                                   TeacherSalary.teacher_id == group.teacher_id,
                                   TeacherSalary.location_id == group.location_id).update(
            {'salary_from_payment': result})
        db.session.commit()

    result = attendance_history.payment - payment.payment_sum
    remaining_debt = attendance_history.total_debt + result
    if remaining_debt == attendance_history.total_debt:
        remaining_debt = None
    AttendanceHistoryStudent.query.filter(AttendanceHistoryStudent.id == attendance_history.id).update(
        {'payment': result, 'remaining_debt': remaining_debt})
    deleted_payment = DeletedStudentPayments(student_id=payment.id, attendance_history_id=payment.attendance_history_id,
                                             group_id=payment.group_id, location_id=payment.location_id,
                                             calendar_day=payment.calendar_day, calendar_month=payment.calendar_month,
                                             calendar_year=payment.calendar_year,
                                             payment_type_id=payment.payment_type_id,
                                             payment_sum=payment.payment_sum,
                                             account_period_id=payment.account_period_id,
                                             payment=payment.payment)
    db.session.add(deleted_payment)
    db.session.commit()
    db.session.delete(payment)
    db.session.commit()

    accounting_info = AccountingInfo.query.filter(AccountingInfo.payment_type_id == payment.payment_type_id,
                                                  AccountingInfo.location_id == group.location_id,
                                                  AccountingInfo.calendar_month == calendar_month.id,
                                                  AccountingInfo.calendar_year == calendar_year.id).first()
    if not accounting_info:
        accounting_info = AccountingInfo(payment_type_id=payment.payment_type_id, location_id=group.location_id,
                                         all_payments=-payment.payment_sum, calendar_month=calendar_month.id,
                                         calendar_year=calendar_year.id)
        db.session.add(accounting_info)
        db.session.commit()
    else:
        if accounting_info.all_payments:
            all_payments = accounting_info.all_payments - payment.payment_sum
        else:
            all_payments = -payment.payment_sum
        AccountingInfo.query.filter(AccountingInfo.id == accounting_info.id).update(
            {'all_payments': all_payments})
        db.session.commit()
        update_account(accounting_info.id)

    return redirect(url_for('account_info', page=1, location=attendance_history.location_id))


@app.route('/period_details', methods=['POST', 'GET'])
def period_details():
    user = get_current_user()
    form = PhotoForm()
    locations = Locations.query.order_by('id').all()
    if request.method == "POST":
        from_date = request.form.get('from')
        to_date = request.form.get('to')
        from_date = datetime.strptime(from_date, '%Y-%m-%d')
        to_date = datetime.strptime(to_date, '%Y-%m-%d')
        if not AccountingPeriod.query.filter(AccountingPeriod.from_date == from_date,
                                             AccountingPeriod.to_date == to_date
                                             ).first():
            add = AccountingPeriod(from_date=from_date, to_date=to_date, year_id=calendar_year.id)
            db.session.add(add)
            db.session.commit()
        flash('Period was updated')
        return redirect(url_for('period_details'))
    return render_template('account_folder/account_period.html', user=user, form=form, locations=locations)
