from backend.app import *
from backend.models.models import *


@app.route('/search_groups/<int:location_id>', methods=['POST'])
def search_groups(location_id):
    input_value = request.get_json()['input_value']
    search_type = request.get_json()['search_type']
    status = request.get_json()['status']
    info = []
    body = {}
    if search_type == "name":
        groups = Groups.query.filter(Groups.name.ilike("%" + input_value + "%"),
                                     Groups.location_id == location_id, Groups.status == status).order_by('id').all()
        if groups:
            for gr in groups:
                body['name'] = gr.name
                for teacher in gr.teacher:
                    body['teacher_name'] = teacher.user.name
                    body['teacher_surname'] = teacher.user.surname
                body['subject'] = gr.subject.name
                body['course_type'] = gr.course_type.name
                body['cost'] = gr.course_type.cost
                info.append(body)
    else:
        teachers = Users.query.filter(Users.name.ilike("%" + input_value + "%"),
                                      ).order_by('id').all()
        user_id = []
        print(teachers)
        for teach in teachers:
            for teacher in teach.teacher:
                user_id.append(teacher.id)
        user_id = list(dict.fromkeys(user_id))

        groups = db.session.query(Groups).join(Groups.teacher).options(contains_eager(Groups.teacher)).filter(
            Teachers.id.in_([index for index in user_id]), Groups.location_id == location_id,
                                                           Groups.status == status).order_by('id').all()

        if groups:
            for gr in groups:
                body['name'] = gr.name
                for teacher in gr.teacher:
                    body['teacher_name'] = teacher.user.name
                    body['teacher_surname'] = teacher.user.surname
                body['subject'] = gr.subject.name
                body['course_type'] = gr.course_type.name
                body['cost'] = gr.course_type.cost
                info.append(body)
    return jsonify(info)


@app.route('/subject_groups/<int:location_id>', methods=['POST'])
def subject_groups(location_id):
    info = []
    body = {}
    subject_select = request.get_json()['subject_select']
    status = request.get_json()['status']
    subject = Subjects.query.filter(Subjects.id == subject_select).first()
    groups = Groups.query.filter(Groups.subject_id == subject.id, Groups.location_id == location_id,
                                 Groups.status == status).order_by(
        'id').all()
    if groups:
        for gr in groups:
            body['name'] = gr.name
            for teacher in gr.teacher:
                body['teacher_name'] = teacher.user.name
                body['teacher_surname'] = teacher.user.surname
            body['subject'] = gr.subject.name
            body['course_type'] = gr.course_type.name
            body['cost'] = gr.course_type.cost
            info.append(body)
    return jsonify(info)


@app.route('/search_student_info/<int:location_id>', methods=['POST', 'GET'])
def search_student_info(location_id):
    body = {}
    info = []
    value = request.get_json()['value']
    search_type = request.get_json()['search_type']
    if search_type == "name":
        users = db.session.query(Users).join(Users.student).options(contains_eager(Users.student)).filter(
            Students.group != None, Users.location_id == location_id, Users.name.ilike("%" + value + "%")).order_by(
            'id').all()
        user_id = []
        for user in users:
            user_id.append(user.id)
        user_id = list(dict.fromkeys(user_id))
        students_list = Students.query.filter(Students.user_id.in_([user_id for user_id in user_id]),
                                              ).order_by('id').all()

        for st in students_list:
            body['id'] = st.user.id
            body['name'] = st.user.name
            body['surname'] = st.user.surname
            body['username'] = st.user.username
            body['photo_profile'] = st.user.photo_profile
            body['balance'] = st.balance
            info.append(body)
    elif search_type == "surname":
        users = db.session.query(Users).join(Users.student).options(contains_eager(Users.student)).filter(
            Students.group != None, Users.location_id == location_id, Users.surname.ilike("%" + value + "%")).order_by(
            'id').all()
        user_id = []
        for user in users:
            user_id.append(user.id)
        user_id = list(dict.fromkeys(user_id))
        students_list = Students.query.filter(Students.user_id.in_([user_id for user_id in user_id]),
                                              ).order_by('id').all()

        for st in students_list:
            body['id'] = st.user.id
            body['name'] = st.user.name
            body['surname'] = st.user.surname
            body['username'] = st.user.username
            body['photo_profile'] = st.user.photo_profile
            body['balance'] = st.balance
            info.append(body)
    else:
        users = db.session.query(Users).join(Users.student).options(contains_eager(Users.student)).filter(
            Students.group != None, Users.location_id == location_id, Users.username.ilike("%" + value + "%")).order_by(
            'id').all()
        user_id = []
        for user in users:
            user_id.append(user.id)
        user_id = list(dict.fromkeys(user_id))
        students_list = Students.query.filter(Students.user_id.in_([user_id for user_id in user_id]),
                                              ).order_by('id').all()

        for st in students_list:
            body['id'] = st.user.id
            body['name'] = st.user.name
            body['surname'] = st.user.surname
            body['username'] = st.user.username
            body['photo_profile'] = st.user.photo_profile
            body['balance'] = st.balance
            info.append(body)
    return jsonify(info)


@app.route('/search_info/<location_id>', methods=['POST'])
def search_info(location_id):
    info = []
    get_info = request.get_json()['info']

    search_type = request.get_json()['search_type']
    if search_type == "name":
        users = db.session.query(Students).join(Students.user).options(contains_eager(Students.user)).filter(
            Users.name.ilike("%" + get_info + "%"), Users.location_id == location_id).order_by('id').all()

        body = {}
        list_subject = []
        for st in users:
            body['id'] = st.id
            body['username'] = st.user.username
            body['name'] = st.user.name
            body['surname'] = st.user.surname
            for subject in st.subject:
                list_subject.append(subject.name)
            body['subjects'] = list_subject
            body['photo_profile'] = st.user.photo_profile
            body['comment'] = st.user.comment
            body['age'] = st.user.age
            body['data_joined'] = st.user.data_joined
            info.append(body)
    elif search_type == "surname":
        users = db.session.query(Students).join(Students.user).options(contains_eager(Students.user)).filter(
            Users.surname.ilike("%" + get_info + "%"), Users.location_id == location_id).order_by('id').all()

        body = {}
        list_subject = []
        for st in users:
            body['id'] = st.id
            body['username'] = st.user.username
            body['name'] = st.user.name
            body['surname'] = st.user.surname
            for subject in st.subject:
                list_subject.append(subject.name)
            body['subjects'] = list_subject
            body['photo_profile'] = st.user.photo_profile
            body['comment'] = st.user.comment
            body['age'] = st.user.age
            body['data_joined'] = st.user.data_joined
            info.append(body)
    else:
        users = db.session.query(Students).join(Students.user).options(contains_eager(Students.user)).filter(
            Users.username.ilike("%" + get_info + "%"), Users.location_id == location_id).order_by('id').all()

        body = {}
        list_subject = []
        for st in users:
            body['id'] = st.id
            body['username'] = st.user.username
            body['name'] = st.user.name
            body['surname'] = st.user.surname
            for subject in st.subject:
                list_subject.append(subject.name)
            body['subjects'] = list_subject
            body['photo_profile'] = st.user.photo_profile
            body['comment'] = st.user.comment
            body['age'] = st.user.age
            body['data_joined'] = st.user.data_joined
            info.append(body)
    sorted_info = []
    for gr in info:
        added_to_existing = False
        for merged in sorted_info:
            if merged['id'] == gr['id']:
                added_to_existing = True
                break
            if added_to_existing:
                break
        if not added_to_existing:
            sorted_info.append(gr)

    return jsonify(sorted_info)


@app.route('/search_age/<location_id>', methods=['POST'])
def search_age(location_id):
    info = []
    age_ot = int(request.get_json()['age_ot'])
    age_do = int(request.get_json()['age_do'])
    users = db.session.query(Students).join(Students.user).options(contains_eager(Students.user)).filter(
        Users.age >= age_ot, Users.age <= age_do, Users.location_id == location_id).order_by('id').all()
    body = {}
    list_subject = []

    for st in users:
        body['username'] = st.user.username
        body['name'] = st.user.name
        body['surname'] = st.user.surname
        for subject in st.subject:
            list_subject.append(subject.name)
        body['subjects'] = list_subject
        body['photo_profile'] = st.user.photo_profile
        body['comment'] = st.user.comment
        body['age'] = st.user.age
        body['data_joined'] = st.user.data_joined
        info.append(body)

    return jsonify(info)
