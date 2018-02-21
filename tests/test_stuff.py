import unittest


class BasicsTestCase(unittest.TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_equal(self):
        self.assertTrue(5 == 5)

