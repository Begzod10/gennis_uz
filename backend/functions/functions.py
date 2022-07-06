from backend.app import *
from calendar import monthrange
from backend.models.models import *
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta, MO

today = datetime.today()
hour = datetime.strftime(today, "%Y/%m/%d/%H/%M")
hour2 = datetime.strptime(hour, "%Y/%m/%d/%H/%M")
new_year = datetime.strftime(today, "%Y")
new_year = datetime.strptime(new_year, "%Y")
new_month = datetime.strftime(today, "%Y-%m")
new_month = datetime.strptime(new_month, "%Y-%m")
new_today = datetime.strftime(today, "%Y-%m-%d")
new_today = datetime.strptime(new_today, "%Y-%m-%d")


def refreshdatas():
    calendar_year = CalendarYear.query.filter(CalendarYear.date == new_year).first()
    if not calendar_year:
        calendar_year = CalendarYear(date=new_year)
        db.session.add(calendar_year)
        db.session.commit()

    calendar_month = CalendarMonth.query.filter(CalendarMonth.date == new_month,
                                                CalendarMonth.year_id == calendar_year.id).first()

    if not calendar_month:
        calendar_month = CalendarMonth(date=new_month, year_id=calendar_year.id)
        db.session.add(calendar_month)
        db.session.commit()

    calendar_day = CalendarDay.query.filter(CalendarDay.date == new_today,
                                            CalendarDay.month_id == calendar_month.id).first()

    if not calendar_day:
        calendar_day = CalendarDay(date=new_today, month_id=calendar_month.id)
        db.session.add(calendar_day)
        db.session.commit()
    update_period()
    account_period = AccountingPeriod.query.order_by(desc(AccountingPeriod.id)).first()
    CalendarDay.query.filter(CalendarDay.id == calendar_day.id).update({'account_period_id': account_period.id})
    db.session.commit()


calendar_year = CalendarYear.query.filter(CalendarYear.date == new_year).first()

calendar_month = CalendarMonth.query.filter(CalendarMonth.date == new_month,
                                            CalendarMonth.year_id == calendar_year.id).first()
calendar_day = CalendarDay.query.filter(CalendarDay.date == new_today,
                                        CalendarDay.month_id == calendar_month.id).first()


# refreshdatas()

def update_period():
    accounting_period = AccountingPeriod.query.order_by(desc(AccountingPeriod.id)).first()
    old_from_date = accounting_period.from_date
    old_to_date = accounting_period.to_date
    new_from_date = old_from_date + relativedelta(months=1)
    new_to_date = old_to_date + relativedelta(months=1)
    if calendar_day:
        if calendar_day.date > accounting_period.to_date:
            accounting_period = AccountingPeriod(from_date=new_from_date, to_date=new_to_date)
            db.session.add(accounting_period)
            db.session.commit()


def get_current_user():
    user_result = None
    if 'user' in session:
        user = session['user']
        user = Users.query.filter_by(username=user).first()
        user_result = user

    return user_result


def number_of_days_in_month(year, month):
    return monthrange(year, month)[1]


#
def update_account(account_id):
    accounting_info = AccountingInfo.query.filter(AccountingInfo.id == account_id).first()
    all_payments = 0
    teachers_salaries = 0
    all_staff_salaries = 0
    all_overhead = 0
    all_capital = 0
    if accounting_info.all_payments:
        all_payments = accounting_info.all_payments
    if accounting_info.all_teacher_salaries:
        teachers_salaries = accounting_info.all_teacher_salaries
    if accounting_info.all_staff_salaries:
        all_staff_salaries = accounting_info.all_staff_salaries
    if accounting_info.all_overhead:
        all_overhead = accounting_info.all_overhead
    if accounting_info.all_capital:
        all_capital = accounting_info.all_capital
    result = all_payments - (teachers_salaries + all_staff_salaries + all_overhead + all_capital)

    AccountingInfo.query.filter(AccountingInfo.id == accounting_info.id).update(
        {'current_cash': result})
    db.session.commit()
