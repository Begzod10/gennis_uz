from backend.app import *
from calendar import monthrange
from backend.models.models import *
from datetime import datetime

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


calendar_year = CalendarYear.query.filter(CalendarYear.date == new_year).first()

calendar_month = CalendarMonth.query.filter(CalendarMonth.date == new_month,
                                            CalendarMonth.year_id == calendar_year.id).first()
calendar_day = CalendarDay.query.filter(CalendarDay.date == new_today,
                                        CalendarDay.month_id == calendar_month.id).first()


def get_current_user():
    user_result = None
    if 'user' in session:
        user = session['user']
        user = Users.query.filter_by(username=user).first()
        user_result = user

    return user_result


def number_of_days_in_month(year, month):
    return monthrange(year, month)[1]
