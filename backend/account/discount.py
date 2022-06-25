from backend.app import *
from backend.models import *
from backend.functions.functions import *


@app.route('/discount/<int:student_id>', methods=['POST', 'GET'])
def discount(student_id):
    student = Students.query.filter(Students.id == student_id).first()
    if request.method == "POST":
        group_id = int(request.form.get('group_id'))
        discount_amount = int(request.form.get('discount'))
        add = StudentDiscount(student_id=student_id, discount=discount_amount, group_id=group_id,
                              calendar_day=calendar_day.id, calendar_month=calendar_month.id,
                              calendar_year=calendar_year.id)
        db.session.add(add)
        db.session.commit()
        flash('Студент успешно получил скидку!')
        return redirect(url_for('user_profile', user_id=student.user_id))
