from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User

class PlainTextPasswordBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(username=username)
            if user.password == password:  # ✅ Compare plain text password
                return user
        except User.DoesNotExist:
            return None
