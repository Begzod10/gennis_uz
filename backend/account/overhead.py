from backend.app import *
from backend.functions.functions import *
from backend.models.models import *


@app.route('/add_overhead/<int:location_id>', methods=['POST'])
def add_overhead(location_id):
    body = {}
    account_period = AccountingPeriod.query.order_by(desc(AccountingPeriod.id)).first()
    month = request.get_json()['month']

    day = request.get_json()['day']
    type_of_data = request.get_json()['type_of_data']
    sum = int(request.get_json()['sum'])
    name_item = request.get_json()['name_item']
    payment_type = PaymentTypes.query.filter(PaymentTypes.name == type_of_data).first()
    month = datetime.strptime(month, "%Y-%m")
    day = datetime.strptime(day, "%Y-%m-%d")
    calendar_month = CalendarMonth.query.filter(CalendarMonth.date == month).first()
    calendar_day = CalendarDay.query.filter(CalendarDay.date == day).first()
    add = Overhead(item_sum=sum, item_name=name_item, payment_type_id=payment_type.id, location_id=location_id,
                   calendar_day=calendar_day.id, calendar_month=calendar_month.id, calendar_year=calendar_year.id,
                   account_period_id=account_period.id)
    db.session.add(add)
    db.session.commit()
    accounting_info = AccountingInfo.query.filter(AccountingInfo.payment_type_id == payment_type.id,
                                                  AccountingInfo.location_id == add.location_id,
                                                  AccountingInfo.calendar_month == calendar_month.id,
                                                  AccountingInfo.calendar_year == calendar_year.id,
                                                  AccountingInfo.account_period_id == account_period.id).first()
    if not accounting_info:
        accounting_info = AccountingInfo(payment_type_id=payment_type.id, location_id=add.location_id,
                                         all_overhead=sum, calendar_month=calendar_month.id,
                                         calendar_year=calendar_year.id, account_period_id=account_period.id)
        db.session.add(accounting_info)
        db.session.commit()
    else:

        if accounting_info.all_overhead:
            all_overhead = accounting_info.all_overhead + sum
        else:
            all_overhead = sum
        AccountingInfo.query.filter(AccountingInfo.id == accounting_info.id).update({
            'all_overhead': all_overhead
        })
        db.session.commit()
        update_account(accounting_info.id)
    return jsonify(body)


@app.route('/delete_overhead/<overhead_id>')
def delete_overhead(overhead_id):
    overhead = Overhead.query.filter(Overhead.id == overhead_id).first()
    account_period = AccountingPeriod.query.order_by(desc(AccountingPeriod.id)).first()
    payment_type = PaymentTypes.query.filter(PaymentTypes.id == overhead.payment_type_id).first()

    accounting_info = AccountingInfo.query.filter(AccountingInfo.payment_type_id == payment_type.id,
                                                  AccountingInfo.location_id == overhead.location_id,
                                                  AccountingInfo.calendar_month == calendar_month.id,
                                                  AccountingInfo.calendar_year == calendar_year.id,
                                                  AccountingInfo.account_period_id == account_period.id).first()
    if not accounting_info:
        accounting_info = AccountingInfo(payment_type_id=payment_type.id, location_id=overhead.location_id,
                                         all_overhead=-overhead.item_sum, calendar_month=calendar_month.id,
                                         calendar_year=calendar_year.id, account_period_id=account_period.id)
        db.session.add(accounting_info)
        db.session.commit()
    else:

        if accounting_info.all_overhead:
            all_overhead = accounting_info.all_overhead - overhead.item_sum
        else:
            all_overhead = -overhead
        AccountingInfo.query.filter(AccountingInfo.id == accounting_info.id).update({
            'all_overhead': all_overhead
        })
        db.session.commit()
        update_account(accounting_info.id)
    db.session.delete(overhead)
    db.session.commit()
    flash("Overhead item was successfully deleted")
    return redirect(url_for('account_info', page=1, location=overhead.location_id))
