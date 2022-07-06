from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import String, Integer, Boolean, Column, ForeignKey, DateTime, or_, and_, desc, func, ARRAY, JSON, \
    extract
from sqlalchemy.orm import contains_eager
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func, functions

db = SQLAlchemy()


def db_setup(app):
    app.config.from_object('backend.models.config')
    db.app = app
    db.init_app(app)
    migrate = Migrate(app, db)
    return db


class CalendarYear(db.Model):
    __tablename__ = "calendaryear"
    id = Column(Integer, primary_key=True)
    date = Column(DateTime)
    users = db.relationship("Users", backref="year", order_by="Users.id")
    groups = db.relationship("Groups", backref="year", order_by="Groups.id")
    attendance_history_student = relationship("AttendanceHistoryStudent", backref="year",
                                              order_by="AttendanceHistoryStudent.id")
    attendance_history_teacher = relationship("AttendanceHistoryTeacher", backref="year",
                                              order_by="AttendanceHistoryTeacher.id")
    month = relationship("CalendarMonth", backref="year", order_by="CalendarMonth.id")
    accounting_period = relationship("AccountingPeriod", backref="year", order_by="AccountingPeriod.id")
    teacher_salary_id = relationship("TeacherSalary", backref="year", order_by="TeacherSalary.id")
    attendance = relationship("Attendance", backref="year", order_by="Attendance.id")
    location = relationship('Locations', backref="year", order_by="Locations.id")
    student_payment = relationship('StudentPayments', backref="year", order_by="StudentPayments.id")
    teacher_cash = relationship('TeacherSalaries', backref="year", order_by="TeacherSalaries.id")
    charity = relationship('StudentCharity', backref="year", order_by="StudentCharity.id")
    stuff_salary = relationship('StaffSalary', backref="year", order_by="StaffSalary.id")
    staff_given_salary = relationship("StaffSalaries", backref="year", order_by="StaffSalaries.id")
    overhead_data = relationship('Overhead', backref="year", order_by="Overhead.id")
    accounting = relationship("AccountingInfo", backref="year", order_by="AccountingInfo.id")


class CalendarMonth(db.Model):
    __tablename__ = "calendarmonth"
    id = Column(Integer, primary_key=True)
    date = Column(DateTime)
    users = db.relationship("Users", backref="month", order_by="Users.id")
    groups = db.relationship("Groups", backref="month", order_by="Groups.id")
    attendance_history_student = relationship("AttendanceHistoryStudent", backref="month",
                                              order_by="AttendanceHistoryStudent.id")
    attendance_history_teacher = relationship("AttendanceHistoryTeacher", backref="month",
                                              order_by="AttendanceHistoryTeacher.id")
    teacher_salary_id = relationship("TeacherSalary", backref="month", order_by="TeacherSalary.id")
    year_id = Column(Integer, ForeignKey('calendaryear.id'))
    day = relationship('CalendarDay', backref="month", order_by="CalendarDay.id")
    attendance = relationship("Attendance", backref="month", order_by="Attendance.id")
    location = relationship('Locations', backref="month", order_by="Locations.id")
    student_payment = relationship('StudentPayments', backref="month", order_by="StudentPayments.id")
    teacher_cash = relationship('TeacherSalaries', backref="month", order_by="TeacherSalaries.id")
    charity = relationship('StudentCharity', backref="month", order_by="StudentCharity.id")
    stuff_salary = relationship('StaffSalary', backref="month", order_by="StaffSalary.id")
    staff_given_salary = relationship("StaffSalaries", backref="month", order_by="StaffSalaries.id")
    overhead_data = relationship('Overhead', backref="month", order_by="Overhead.id")
    accounting = relationship("AccountingInfo", backref="month", order_by="AccountingInfo.id")


class AccountingPeriod(db.Model):
    __tablename__ = "accountingperiod"
    id = Column(Integer, primary_key=True)
    from_date = Column(DateTime)
    to_date = Column(DateTime)
    student_payments = relationship("StudentPayments", backref="period", order_by="StudentPayments.id")
    teacher_salaries = relationship("TeacherSalaries", backref="period", order_by="TeacherSalaries.id")
    staff_salaries = relationship("StaffSalaries", backref="period", order_by="StaffSalaries.id")
    overhead = relationship("Overhead", backref="period", order_by="Overhead.id")
    day = relationship('CalendarDay', backref="period", order_by="CalendarDay.id")
    charity = relationship('StudentCharity', backref="period", order_by="StudentCharity.id")
    year_id = Column(Integer, ForeignKey('calendaryear.id'))
    month_id = Column(Integer, ForeignKey('calendarmonth.id'))


class CalendarDay(db.Model):
    __tablename__ = "calendarday"
    id = Column(Integer, primary_key=True)
    date = Column(DateTime)
    month_id = Column(Integer, ForeignKey('calendarmonth.id'))
    users = db.relationship("Users", backref="day", order_by="Users.id")
    groups = db.relationship("Groups", backref="day", order_by="Groups.id")
    attendance = relationship("AttendanceDays", backref="day", order_by="AttendanceDays.id")
    location = relationship('Locations', backref="day", order_by="Locations.id")
    student_payment = relationship('StudentPayments', backref="day", order_by="StudentPayments.id")
    teacher_cash = relationship('TeacherSalaries', backref="day", order_by="TeacherSalaries.id")
    charity = relationship('StudentCharity', backref="day", order_by="StudentCharity.id")
    staff_given_salary = relationship("StaffSalaries", backref="day", order_by="StaffSalaries.id")
    overhead_data = relationship('Overhead', backref="day", order_by="Overhead.id")
    account_period_id = Column(Integer, ForeignKey('accountingperiod.id'))


class Locations(db.Model):
    __tablename__ = "locations"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    users = relationship('Users', backref="location", order_by="Users.id")
    groups = relationship("Groups", backref="location", order_by="Groups.id")
    attendance = relationship("Attendance", backref="location", order_by="Attendance.id")
    attendance_student = relationship("AttendanceHistoryStudent", backref="location",
                                      order_by="AttendanceHistoryStudent.id")
    attendance_teacher = relationship("AttendanceHistoryTeacher", backref="location",
                                      order_by="AttendanceHistoryTeacher.id")
    student_payment = relationship('StudentPayments', backref="location", order_by="StudentPayments.id")
    teacher_cash = relationship('TeacherSalaries', backref="location", order_by="TeacherSalaries.id")
    attendance_location = relationship("TeacherSalary", backref="location", order_by="TeacherSalary.id")
    stuff_salary = relationship('StaffSalary', backref="location", order_by="StaffSalary.id")
    staff_given_salary = relationship("StaffSalaries", backref="location", order_by="StaffSalaries.id")
    calendar_day = Column(Integer, ForeignKey("calendarday.id"))
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))
    overhead_data = relationship('Overhead', backref="location", order_by="Overhead.id")
    attendance_days_get = relationship("AttendanceDays", backref="location", order_by="AttendanceDays.id")
    accounting = relationship("AccountingInfo", backref="location", order_by="AccountingInfo.id")
    charity = relationship('StudentCharity', backref="location", order_by="StudentCharity.id")


class EducationLanguage(db.Model):
    __tablename__ = "educationlanguage"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    user = relationship("Users", backref="language", order_by="Users.id")
    groups = relationship("Groups", backref="language", order_by="Groups.id")


class Users(db.Model):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    location_id = Column(Integer, ForeignKey('locations.id'))
    password = Column(String, nullable=False)
    student = relationship("Students", backref="user", order_by="Students.id")
    teacher = relationship("Teachers", backref='user', order_by="Teachers.id")
    phone = relationship("PhoneList", backref='user', order_by="PhoneList.id")
    education_language = Column(Integer, ForeignKey('educationlanguage.id'))
    staff = relationship("Staff", backref="user", order_by="Staff.id")
    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    username = Column(String)
    user_id = Column(String)
    director = Column(Boolean)
    photo_profile = Column(String)
    born_day = Column(Integer)
    born_month = Column(Integer)
    born_year = Column(Integer)
    age = Column(Integer)
    comment = Column(String)
    father_name = Column(String)
    balance = Column(Integer)
    calendar_day = Column(Integer, ForeignKey("calendarday.id"))
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))


class PhoneList(db.Model):
    __tablename__ = "phonelist"
    id = Column(Integer, primary_key=True)
    phone = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))


class Staff(db.Model):
    __tablename__ = "staff"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    profession_id = Column(Integer, ForeignKey('professions.id'))
    stuff_salary = relationship('StaffSalary', backref="staff", order_by="StaffSalary.id")
    staff_given_salary = relationship("StaffSalaries", backref="staff", order_by="StaffSalaries.id")
    salary = Column(Integer)


class CourseTypes(db.Model):
    __tablename__ = "coursetypes"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    cost = Column(Integer)
    group = relationship("Groups", backref="course_type", order_by="Groups.id")
    attendance = relationship("Attendance", backref="course_type", order_by="Attendance.id")


class Students(db.Model):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    subject = relationship('Subjects', secondary="student_subject", backref="student", order_by="Subjects.id")
    group = relationship('Groups', secondary="student_group", backref="student", order_by="Groups.id")
    ball_time = Column(DateTime)
    selected = Column(Boolean)
    attendance = relationship("Attendance", backref="student", order_by="Attendance.id")
    student_payment = relationship('StudentPayments', backref="student", order_by="StudentPayments.id")
    attendance_history = relationship("AttendanceHistoryStudent", backref="student",
                                      order_by="AttendanceHistoryStudent.id")
    charity = relationship('StudentCharity', backref="student", order_by="StudentCharity.id")
    history_group = relationship('StudentHistoryGroups', backref="student", order_by="StudentHistoryGroups.id")


class Teachers(db.Model):
    __tablename__ = "teachers"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    subject = relationship('Subjects', secondary="teacher_subject", backref="teacher", order_by="Subjects.id")
    group = relationship('Groups', secondary="teacher_group", backref="teacher", order_by="Groups.id")
    attendance = relationship("Attendance", backref="teacher", order_by="Attendance.id")
    attendance_history = relationship("AttendanceHistoryTeacher", backref="teacher",
                                      order_by="AttendanceHistoryTeacher.id")
    attendance_location = relationship("TeacherSalary", backref="teacher", order_by="TeacherSalary.id")
    history_group = relationship('StudentHistoryGroups', backref="teacher", order_by="StudentHistoryGroups.id")
    teacher_cash = relationship('TeacherSalaries', backref="teacher", order_by="TeacherSalaries.id")
    attendance_days_get = relationship("AttendanceDays", backref="teacher", order_by="AttendanceDays.id")


db.Table('student_subject',
         db.Column('student_id', db.Integer, db.ForeignKey('students.id')),
         db.Column('subject_id', db.Integer, db.ForeignKey('subjects.id'))
         )

db.Table('teacher_subject',
         db.Column('teacher_id', db.Integer, db.ForeignKey('teachers.id')),
         db.Column('subject_id', db.Integer, db.ForeignKey('subjects.id'))
         )


class Subjects(db.Model):
    __tablename__ = "subjects"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    ball_number = Column(Integer)
    group = relationship("Groups", backref="subject", order_by="Groups.id")
    attendance = relationship("Attendance", backref="subject", order_by="Attendance.id")
    attendance_history_student = relationship("AttendanceHistoryStudent", backref="subject",
                                              order_by="AttendanceHistoryStudent.id")
    attendance_history_teacher = relationship("AttendanceHistoryTeacher", backref="subject",
                                              order_by="AttendanceHistoryTeacher.id")
    subject_level = relationship('SubjectLevels', backref="subject", order_by="SubjectLevels.id")


class SubjectLevels(db.Model):
    __tablename__ = "subjectlevels"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    subject_id = Column(Integer, ForeignKey('subjects.id'))


db.Table('student_group',
         db.Column('student_id', db.Integer, db.ForeignKey('students.id')),
         db.Column('group_id', db.Integer, db.ForeignKey('groups.id'))
         )

db.Table('teacher_group',
         db.Column('teacher_id', db.Integer, db.ForeignKey('teachers.id')),
         db.Column('group_id', db.Integer, db.ForeignKey('groups.id'))
         )


class Groups(db.Model):
    __tablename__ = "groups"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    course_type_id = Column(Integer, ForeignKey('coursetypes.id'))
    subject_id = Column(Integer, ForeignKey('subjects.id'))
    teacher_salary = Column(Integer)
    location_id = Column(Integer, ForeignKey('locations.id'))
    status = Column(Boolean, default=False)
    education_language = Column(Integer, ForeignKey('educationlanguage.id'))
    calendar_day = Column(Integer, ForeignKey("calendarday.id"))
    attendance = relationship("Attendance", backref="group", order_by="Attendance.id")
    attendance_days = Column(Integer)
    attendance_history_student = relationship("AttendanceHistoryStudent", backref="group",
                                              order_by="AttendanceHistoryStudent.id")
    attendance_history_teacher = relationship("AttendanceHistoryTeacher", backref="group",
                                              order_by="AttendanceHistoryTeacher.id")
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))
    student_payment = relationship('StudentPayments', backref="group", order_by="StudentPayments.id")
    teacher_id = Column(Integer)
    charity = relationship('StudentCharity', backref="group", order_by="StudentCharity.id")
    history_group = relationship('StudentHistoryGroups', backref="group", order_by="StudentHistoryGroups.id")
    attendance_days_get = relationship("AttendanceDays", backref="group", order_by="AttendanceDays.id")


class StudentHistoryGroups(db.Model):
    __tablename__ = "studenthistorygroups"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey('students.id'))
    group_id = Column(Integer, ForeignKey('groups.id'))
    teacher_id = Column(Integer, ForeignKey('teachers.id'))
    joined_day = Column(DateTime)
    left_day = Column(DateTime)


class Professions(db.Model):
    __tablename__ = "professions"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    staff = db.relationship("Staff", backref="profession", order_by="Staff.id")
    staff_salaries = db.relationship("StaffSalaries", backref="profession", order_by="StaffSalaries.id")


class Attendance(db.Model):
    __tablename__ = "attendance"
    id = Column(Integer, primary_key=True)
    subject_id = Column(Integer, ForeignKey('subjects.id'))
    student_id = Column(Integer, ForeignKey('students.id'))
    teacher_id = Column(Integer, ForeignKey('teachers.id'))
    group_id = Column(Integer, ForeignKey('groups.id'))
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))
    course_id = Column(Integer, ForeignKey('coursetypes.id'))
    location_id = Column(Integer, ForeignKey('locations.id'))
    attendance_days_get = relationship("AttendanceDays", backref="attendance", order_by="AttendanceDays.calendar_day")


class AttendanceDays(db.Model):
    __tablename__ = "attendancedays"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey('students.id'))
    attendance_id = Column(Integer, ForeignKey('attendance.id'))
    calendar_day = Column(Integer, ForeignKey('calendarday.id'))
    status = Column(Integer, default=False)
    activeness = Column(Integer)
    dictionary = Column(Integer)
    homework = Column(Integer)
    average_ball = Column(Integer)
    balance_per_day = Column(Integer)
    salary_per_day = Column(Integer)
    balance_with_discount = Column(Integer)
    discount_per_day = Column(Integer)
    location_id = Column(Integer, ForeignKey('locations.id'))
    teacher_id = Column(Integer, ForeignKey('teachers.id'))
    group_id = Column(Integer, ForeignKey('groups.id'))


class StudentCharity(db.Model):
    __tablename__ = "studentcharity"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey('students.id'))
    discount = Column(Integer)
    group_id = Column(Integer, ForeignKey('groups.id'))
    calendar_day = Column(Integer, ForeignKey('calendarday.id'))
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))
    account_period_id = Column(Integer, ForeignKey('accountingperiod.id'))
    location_id = Column(Integer, ForeignKey('locations.id'))


class AttendanceHistoryStudent(db.Model):
    __tablename__ = "attendancehistorystudent"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey('students.id'))
    total_debt = Column(Integer)
    subject_id = Column(Integer, ForeignKey('subjects.id'))
    group_id = Column(Integer, ForeignKey('groups.id'))
    present_days = Column(Integer)
    absent_days = Column(Integer)
    average_ball = Column(Integer)
    payment = Column(Integer, default=0)
    remaining_debt = Column(Integer)
    location_id = Column(Integer, ForeignKey('locations.id'))
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))
    status = Column(Boolean, default=False)
    student_payment = relationship('StudentPayments', backref="attendance_history", order_by="StudentPayments.id")
    total_discount = Column(Integer)


class AttendanceHistoryTeacher(db.Model):
    __tablename__ = "attendancehistoryteacher"
    id = Column(Integer, primary_key=True)
    teacher_id = Column(Integer, ForeignKey('teachers.id'))
    total_salary = Column(Integer)
    subject_id = Column(Integer, ForeignKey('subjects.id'))
    group_id = Column(Integer, ForeignKey('groups.id'))
    taken_money = Column(Integer)
    remaining_salary = Column(Integer)
    salary_from_payment = Column(Integer)
    location_id = Column(Integer, ForeignKey('locations.id'))
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))
    status = Column(Boolean, default=False)


class TeacherSalary(db.Model):
    __tablename__ = "teachersalary"
    id = Column(Integer, primary_key=True)
    teacher_id = Column(Integer, ForeignKey('teachers.id'))
    total_salary = Column(Integer)
    remaining_salary = Column(Integer)
    location_id = Column(Integer, ForeignKey('locations.id'))
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))
    status = Column(Boolean, default=False)
    salary_from_payment = Column(Integer)
    teacher_cash = relationship('TeacherSalaries', backref="salary", order_by="TeacherSalaries.id")
    taken_money = Column(Integer)


class StaffSalary(db.Model):
    __tablename__ = "staffsalary"
    id = Column(Integer, primary_key=True)
    staff_id = Column(Integer, ForeignKey('staff.id'))
    total_salary = Column(Integer)
    remaining_salary = Column(Integer)
    location_id = Column(Integer, ForeignKey('locations.id'))
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))
    status = Column(Boolean, default=False)
    taken_money = Column(Integer)
    staff_given_salary = relationship("StaffSalaries", backref="staff_salary", order_by="StaffSalaries.id")


# accounting


class PaymentTypes(db.Model):
    __tablename__ = "paymenttypes"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    student_payments = relationship('StudentPayments', backref="payment_type", order_by="StudentPayments.id")
    teacher_salaries = relationship('TeacherSalaries', backref="payment_type", order_by="TeacherSalaries.id")
    overhead_data = relationship('Overhead', backref="payment_type", order_by="Overhead.id")
    accounting = relationship("AccountingInfo", backref="payment_type", order_by="AccountingInfo.id")


class StudentPayments(db.Model):
    __tablename__ = "studentpayments"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey('students.id'))
    attendance_history_id = Column(Integer, ForeignKey('attendancehistorystudent.id'))
    group_id = Column(Integer, ForeignKey('groups.id'))
    location_id = Column(Integer, ForeignKey('locations.id'))
    calendar_day = Column(Integer, ForeignKey('calendarday.id'))
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))
    payment_sum = Column(Integer)
    payment_type_id = Column(Integer, ForeignKey('paymenttypes.id'))
    account_period_id = Column(Integer, ForeignKey('accountingperiod.id'))
    payment = Column(Boolean)


class DeletedStudentPayments(db.Model):
    __tablename__ = "deletedstudentpayments"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey('students.id'))
    attendance_history_id = Column(Integer, ForeignKey('attendancehistorystudent.id'))
    group_id = Column(Integer, ForeignKey('groups.id'))
    location_id = Column(Integer, ForeignKey('locations.id'))
    calendar_day = Column(Integer, ForeignKey('calendarday.id'))
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))
    payment_sum = Column(Integer)
    payment_type_id = Column(Integer, ForeignKey('paymenttypes.id'))
    account_period_id = Column(Integer, ForeignKey('accountingperiod.id'))
    payment = Column(Boolean)


class TeacherSalaries(db.Model):
    __tablename__ = "teachersalaries"
    id = Column(Integer, primary_key=True)
    payment_sum = Column(Integer)
    reason = Column(String)
    payment_type_id = Column(Integer, ForeignKey('paymenttypes.id'))
    salary_id = Column(Integer, ForeignKey('teachersalary.id'))
    teacher_id = Column(Integer, ForeignKey('teachers.id'))
    location_id = Column(Integer, ForeignKey('locations.id'))
    calendar_day = Column(Integer, ForeignKey('calendarday.id'))
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))
    account_period_id = Column(Integer, ForeignKey('accountingperiod.id'))


class StaffSalaries(db.Model):
    __tablename__ = "staffsalaries"
    id = Column(Integer, primary_key=True)
    payment_sum = Column(Integer)
    reason = Column(String)
    payment_type_id = Column(Integer, ForeignKey('paymenttypes.id'))
    salary_id = Column(Integer, ForeignKey('staffsalary.id'))
    staff_id = Column(Integer, ForeignKey('staff.id'))
    location_id = Column(Integer, ForeignKey('locations.id'))
    calendar_day = Column(Integer, ForeignKey('calendarday.id'))
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))
    profession_id = Column(Integer, ForeignKey("professions.id"))
    account_period_id = Column(Integer, ForeignKey('accountingperiod.id'))


class Overhead(db.Model):
    __tablename__ = "overhead"
    id = Column(Integer, primary_key=True)
    item_sum = Column(Integer)
    item_name = Column(String)
    payment_type_id = Column(Integer, ForeignKey('paymenttypes.id'))
    location_id = Column(Integer, ForeignKey('locations.id'))
    calendar_day = Column(Integer, ForeignKey('calendarday.id'))
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))
    account_period_id = Column(Integer, ForeignKey('accountingperiod.id'))


class AccountingInfo(db.Model):
    __tablename__ = "accountinginfo"
    id = Column(Integer, primary_key=True)
    calendar_month = Column(Integer, ForeignKey("calendarmonth.id"))
    calendar_year = Column(Integer, ForeignKey("calendaryear.id"))
    payment_type_id = Column(Integer, ForeignKey('paymenttypes.id'))
    location_id = Column(Integer, ForeignKey('locations.id'))
    all_payments = Column(Integer)
    all_teacher_salaries = Column(Integer)
    all_staff_salaries = Column(Integer)
    all_overhead = Column(Integer)
    all_capital = Column(Integer)
    current_cash = Column(Integer)
    old_cash = Column(Integer)
    all_discount = Column(Integer)
    account_period_id = Column(Integer, ForeignKey('accountingperiod.id'))
