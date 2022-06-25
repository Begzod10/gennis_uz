from backend.app import *
from backend.models.models import *
from backend.functions.functions import *

@app.route('/prepare_create/<int:location_id>', methods=['POST'])
def prepare_create(location_id):
    if request.method == "POST":
        subject_name = request.form.get('subject_name')
        teacher = int(request.form.get('teacher'))
        group_name = request.form.get('group_name')
        type_of_course = request.form.get('type_of_course')
        price = request.form.get('price')
        teacher_salary = request.form.get('teacher_salary')
        return redirect(url_for('create_group', teacher=teacher, group_name=group_name,
                                type_of_course=type_of_course, price=price, teacher_salary=teacher_salary,
                                subject_name=subject_name, location_id=location_id))


@app.route(
    '/create_group/<int:teacher>/<group_name>/<type_of_course>/<int:price>/<int:teacher_salary>/<subject_name>/<int:location_id>',
    methods=['POST', 'GET'])
def create_group(teacher, group_name, type_of_course, price, teacher_salary, subject_name, location_id):
    teacher_get = Teachers.query.filter(Teachers.id == teacher).first()
    if request.method == "POST":
        subject_get = Subjects.query.filter(Subjects.name == subject_name).first()
        location_get = Locations.query.filter(Locations.id == location_id).first()

        course_type_get = CourseTypes.query.filter(CourseTypes.id == type_of_course).first()
        add = Groups(name=group_name, course_type_id=course_type_get.id, subject_id=subject_get.id,
                     teacher_salary=teacher_salary, location_id=location_get.id, calendar_day=calendar_day.id,
                     calendar_month=calendar_month.id, calendar_year=calendar_year.id,
                     education_language=teacher_get.user.education_language, teacher_id=teacher)
        db.session.add(add)
        db.session.commit()

        teacher_get.group.append(add)
        students_checked = Students.query.filter(Students.selected == True).order_by('id').all()
        for st in students_checked:
            for sub in st.subject:
                if sub.name == subject_get.name:
                    st.subject.remove(subject_get)
            st.group.append(add)
            group_history = StudentHistoryGroups(teacher_id=teacher, student_id=st.id, group_id=add.id,
                                                 joined_day=calendar_day.date)
            db.session.add(group_history)
            db.session.commit()
        db.session.commit()
        flash('Guruh yaratildi')
        return redirect(url_for('home'))
    if request.method == "GET":
        user = get_current_user()
        form = PhotoForm()
        students = db.session.query(Students).join(Students.subject).options(contains_eager(Students.subject)).filter(
            Subjects.name.like(f'%{subject_name}%')).join(Students.user).options(contains_eager(Students.user)).filter(
            Users.education_language == teacher_get.user.education_language).all()
        students_checked = Students.query.filter(Students.selected == True).order_by('id').all()
        for st in students_checked:
            Students.query.filter(Students.id == st.id).update({"selected": False})
            db.session.commit()
        locations = Locations.query.order_by('id').all()
        return render_template('group/create_group.html', user=user, form=form, teacher=teacher,
                               type_of_course=type_of_course, price=price, teacher_salary=teacher_salary,
                               group_name=group_name, info=students, location_id=location_id, locations=locations,
                               subject_name=subject_name)


@app.route('/chosen_student/<int:check_id>', methods=["POST"])
def check1(check_id):
    completed = request.get_json()['completed']
    Students.query.filter_by(id=check_id).update({'selected': completed})
    db.session.commit()
    return "Yes"


@app.route('/prepare_add_group', methods=['POST'])
def prepare_add_group():
    group_id = request.form.get('group_id')
    return redirect(url_for('add_group', group_id=group_id))


@app.route('/join_group/<int:group_id>', methods=['POST', 'GET'])
def add_group(group_id):
    if request.method == "POST":
        group = Groups.query.filter(Groups.id == group_id).first()
        subject_get = Subjects.query.filter(Subjects.id == group.subject_id).first()

        students_checked = Students.query.filter(Students.selected == True).order_by('id').all()
        for st in students_checked:
            for sub in st.subject:
                if sub.name == subject_get.name:
                    st.subject.remove(subject_get)
            st.group.append(group)
            group_history = StudentHistoryGroups(teacher_id=group.teacher_id, student_id=st.id, group_id=group.id,
                                                 joined_day=calendar_day.date)
            db.session.add(group_history)
            db.session.commit()
        db.session.commit()
        flash("O'quvhci qo'shildi guruhga")
        return redirect(url_for('home'))
    if request.method == "GET":
        user = get_current_user()
        form = PhotoForm()
        group = Groups.query.filter(Groups.id == group_id).first()
        subject = Subjects.query.filter(Subjects.id == group.subject_id).first()
        students = db.session.query(Students).join(Students.subject).options(contains_eager(Students.subject)).filter(
            Subjects.name.like(f'%{subject.name}%')).all()
        students_checked = Students.query.filter(Students.selected == True).order_by('id').all()
        for st in students_checked:
            Students.query.filter(Students.id == st.id).update({"selected": False})
            db.session.commit()

        locations = Locations.query.order_by('id').all()
        return render_template('group/add_group.html', form=form, user=user, group_id=group_id, info=students,
                               locations=locations)


@app.route('/show_groups/<int:group_id>', methods=['POST', 'GET'])
def show_groups(group_id):
    user = get_current_user()
    form = PhotoForm()
    locations = Locations.query.order_by('id').all()
    group = Groups.query.filter(Groups.id == group_id).first()
    new_groups = Groups.query.filter(Groups.id != group.id, Groups.location_id == group.location_id,
                                     Groups.status == True).all()
    old_group_id = group_id
    return render_template('group/move to groups list.html', user=user, form=form, locations=locations,
                           new_groups=new_groups, old_group_id=old_group_id)


@app.route('/move_group/<int:new_group_id>/<int:old_group_id>', methods=['POST', 'GET'])
def move_group(new_group_id, old_group_id):
    new_group = Groups.query.filter(Groups.id == new_group_id).first()
    old_group = Groups.query.filter(Groups.id == old_group_id).first()
    user = get_current_user()
    students_checked = Students.query.filter(Students.selected == True).order_by('id').all()
    for st in students_checked:
        if old_group in st.group:
            st.group.remove(old_group)
        st.group.append(new_group)
        StudentHistoryGroups.query.filter(StudentHistoryGroups.group_id == old_group.id,
                                          StudentHistoryGroups.student_id == st.id,
                                          StudentHistoryGroups.teacher_id == old_group.teacher_id).update(
            {'left_day': calendar_day.date})
        db.session.commit()
        group_history = StudentHistoryGroups(teacher_id=new_group.teacher_id, student_id=st.id, group_id=new_group.id,
                                             joined_day=calendar_day.date)
        db.session.add(group_history)
        db.session.commit()
    db.session.commit()
    flash('Student has been added to a new group')
    return redirect(url_for('group_profile', group_id=new_group.id))
