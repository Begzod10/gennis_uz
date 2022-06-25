from flask import Flask, redirect, request, render_template, url_for, session, flash, jsonify
from backend.models import *
import os
from flask_migrate import Migrate
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired
from backend.models.models import *

app = Flask(__name__)

app.config.from_object('backend.models.config')
db = db_setup(app)
migrate = Migrate(app, db)


class PhotoForm(FlaskForm):
    image = FileField('photo', validators=[FileRequired()])


from backend.routes.base_routes import *
from backend.functions.small_info import *
from backend.view_infos.view_infos import *
from backend.search_tools.search import *
from backend.group_functions.create_group import *
from backend.teacher.teacher import *
from backend.account.payment import *
from backend.account.discount import *
from backend.account.salary_give import *

if __name__ == '__main__':
    app.run()
