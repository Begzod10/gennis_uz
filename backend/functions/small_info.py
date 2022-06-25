from backend.app import *
from backend.functions import *
from backend.models.models import *


@app.route('/add_subject', methods=['POST', 'GET'])
def add_subject():
    user = get_current_user()
    form = PhotoForm(meta={'csrf': False})
    if request.method == "POST":
        subject = request.form.get('subject')
        if Subjects.query.filter_by(name=subject).first():
            flash(f'Этот {subject} предметь уже добавлена')
        else:
            add = Subjects(name=subject)
            db.session.add(add)
            db.session.commit()
            flash('Предметь успешно добавлен')
        return redirect(url_for('add_subject'))
    subjects = Subjects.query.all()
    return render_template('basic_routes/subject.html', user=user, form=form, subjects=subjects)


@app.route('/delete_subject/<int:subject_id>')
def delete_subject(subject_id):
    user = get_current_user()
    Subjects.query.filter_by(id=subject_id).delete()
    db.session.commit()
    flash('Предметь успешно удалена')
    return redirect(url_for('add_subject'))


@app.route('/edit_subject/<int:subject_id>', methods=['POST'])
def edit_subject(subject_id):
    user = get_current_user()
    subject = request.form.get('subject')
    Subjects.query.filter_by(id=subject_id).update({'name': subject})
    db.session.commit()
    flash('Название предмета успешно изменена')
    return redirect(url_for('add_subject'))


@app.route('/create_location', methods=['POST', 'GET'])
def create_location():
    user = get_current_user()
    form = PhotoForm(meta={'csrf': False})
    if request.method == "POST":
        location = request.form.get('location')

        if Locations.query.filter_by(name=location).first():
            flash(f'Этот {location} предметь уже добавлена')
        else:
            add = Locations(name=location, calendar_day=calendar_day.id, calendar_month=calendar_month.id,
                            calendar_year=calendar_year.id)
            db.session.add(add)
            db.session.commit()
            flash('Предметь успешно добавлен')
        return redirect(url_for('create_location'))
    subjects = Subjects.query.all()
    locations = Locations.query.order_by('id').all()
    return render_template('basic_routes/location.html', user=user, form=form, subjects=subjects, locations=locations)


@app.route('/delete_location/<int:subject_id>')
def delete_location(subject_id):
    user = get_current_user()
    Locations.query.filter_by(id=subject_id).delete()
    db.session.commit()
    flash('Предметь успешно удалена')
    return redirect(url_for('create_location'))


@app.route('/edit_location/<int:subject_id>', methods=['POST'])
def edit_location(subject_id):
    user = get_current_user()
    location = request.form.get('location')
    Locations.query.filter_by(id=subject_id).update({'name': location})
    db.session.commit()
    flash('Название предмета успешно изменена')
    return redirect(url_for('create_location'))


@app.route('/add_course_type', methods=['POST', 'GET'])
def add_course_type():
    user = get_current_user()
    if request.method == "POST":
        course_type = request.form.get('course_type')
        course_cost = int(request.form.get('course_cost'))
        add = CourseTypes(name=course_type, cost=course_cost)
        db.session.add(add)
        db.session.commit()
        return redirect(url_for('add_course_type'))
    course_types = CourseTypes.query.order_by('id').all()
    return render_template('basic_routes/course_types.html', user=user, course_types=course_types)


@app.route('/edit_course_type/<int:course_id>', methods=['POST'])
def edit_course_type(course_id):
    print(course_id)
    course_type = request.form.get('course_type')
    course_cost = int(request.form.get('course_cost'))
    CourseTypes.query.filter(CourseTypes.id == course_id).update({"name": course_type, "cost": course_cost})
    db.session.commit()
    return redirect(url_for('add_course_type'))


@app.route('/delete_course_type/<int:course_id>')
def delete_course_type(course_id):
    user = get_current_user()
    CourseTypes.query.filter_by(id=course_id).delete()
    db.session.commit()
    # flash('Предметь успешно удалена')
    return redirect(url_for('add_course_type'))
