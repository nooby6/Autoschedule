from flask import Flask # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_login import LoginManager # type: ignore

db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'

    with app.app_context():
        from .routes import main
        app.register_blueprint(main)

        from .auth import auth as auth_blueprint
        app.register_blueprint(auth_blueprint)

        db.create_all()

    return app
