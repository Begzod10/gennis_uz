from backend.app import *
from backend.models import *
from backend.functions.functions import *


@app.route('/charity/<int:student_id>', methods=['POST', 'GET'])
def charity(student_id):
    student = Students.query.filter(Students.id == student_id).first()
    accounting_period = AccountingPeriod.query.order_by(desc(AccountingPeriod.id)).first()
    if request.method == "POST":
        group_id = int(request.form.get('group_id'))
        discount_amount = int(request.form.get('discount'))
        add = StudentCharity(student_id=student_id, discount=discount_amount, group_id=group_id,
                             calendar_day=calendar_day.id, calendar_month=calendar_month.id,
                             calendar_year=calendar_year.id, account_period_id=accounting_period.id,
                             location_id=student.user.location_id)
        db.session.add(add)
        db.session.commit()
        flash('Студент успешно получил скидку!')
        return redirect(url_for('user_profile', user_id=student.user_id))
