from flask import render_template
from . import db
from .models import User, Attendance

@app.route('/')
def index():
    return render_template('index.html')

