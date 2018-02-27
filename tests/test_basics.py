import unittest
import os
from flask_testing import TestCase
from flask import current_app
from app import create_app, db


class BasicsTestCase(TestCase):
    def create_app(self):
        return create_app(os.environ.get('CONFIG') or 'config.TestingConfig')

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()


    def test_app_exists(self):
        self.assertFalse(current_app is None)


if __name__ == '__main__':
    unittest.run()
