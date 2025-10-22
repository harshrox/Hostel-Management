from rest_framework import routers
from .views import StudentRecordViewSet

router = routers.DefaultRouter()
router.register(r'student-records', StudentRecordViewSet)

urlpatterns = router.urls
