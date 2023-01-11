import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';

interface CanSeeProps {
	children: React.ReactNode;
	permissions?: string[];
}

export function CanSee({ children, permissions }: CanSeeProps) {
	const useCanSeeComponent = usePermissions({ userPermissions: permissions });

	if (!useCanSeeComponent) {
		return null;
	}

	return <>{children}</>;
}
