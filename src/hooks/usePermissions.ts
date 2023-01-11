import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

type usePermissionsParams = {
	userPermissions?: string[];
};

export function usePermissions({ userPermissions }: usePermissionsParams) {
	const { isSigned, isAdmin } = useContext(AuthContext);

	if (!isSigned) {
		return false;
	}

	if (!isAdmin) {
		return false;
	}

	if (userPermissions?.length > 0) {
		const hasAllPermissions = userPermissions.some((permission) => {
			return permission.includes(permission);
		});

		if (!hasAllPermissions) {
			return false;
		}
	}

	return true;
}
