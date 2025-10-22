from rest_framework import permissions

class IsWardenRole(permissions.BasePermission):
    """
    Allows access only to users with role='WARDEN'
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'WARDEN')
