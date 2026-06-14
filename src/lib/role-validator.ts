import { AppError } from "./app-error";
import HttpStatusCode from "./http-status-code";

const roleMask = {
  CUSTOMER: 1 << 0,
  RECEPTIONIST: 1 << 1,
  MANAGER: 1 << 2,
  HR_MANAGER: 1 << 3,
  SALES_MANAGER: 1 << 4,
  IT_ADMIN: 1 << 5,
  ADMIN: 1 << 6,
} as const;

type RoleName = keyof typeof roleMask;

function hasRole({
  allowedRolesMask,
  role,
}: {
  allowedRolesMask: number;
  role: number;
}) {
  return (allowedRolesMask & role) !== 0;
}

function toRoleMask({ role }: { role: string }) {
  if (role in roleMask) {
    return roleMask[role as RoleName];
  }

  console.error(`[Programmatic error] Invalid role: ${role}`);
  process.exit(1);
}

function authorizeRole({
  role,
  allowedRolesMask,
  message,
}: {
  role: number;
  allowedRolesMask: number;
  message: string;
}) {
  if (!hasRole({ allowedRolesMask, role })) {
    throw new AppError({
      message,
      statusCode: HttpStatusCode.UNAUTHORIZED,
      isOperational: true,
    });
  }
}

function authorizeCustomer({ role }: { role: number }) {
  authorizeRole({
    role,
    allowedRolesMask: roleMask.CUSTOMER,
    message: "Unauthorized: Customer access required",
  });
}

function authorizeReceptionist({ role }: { role: number }) {
  authorizeRole({
    role,
    allowedRolesMask: roleMask.RECEPTIONIST,
    message: "Unauthorized: Receptionist access required",
  });
}

function authorizeManager({ role }: { role: number }) {
  authorizeRole({
    role,
    allowedRolesMask: roleMask.MANAGER,
    message: "Unauthorized: Manager access required",
  });
}

function authorizeHrManager({ role }: { role: number }) {
  authorizeRole({
    role,
    allowedRolesMask: roleMask.HR_MANAGER,
    message: "Unauthorized: HR manager access required",
  });
}

function authorizeSalesManager({ role }: { role: number }) {
  authorizeRole({
    role,
    allowedRolesMask: roleMask.SALES_MANAGER,
    message: "Unauthorized: Sales manager access required",
  });
}

function authorizeItAdmin({ role }: { role: number }) {
  authorizeRole({
    role,
    allowedRolesMask: roleMask.IT_ADMIN,
    message: "Unauthorized: IT admin access required",
  });
}

function authorizeAnyManager({ role }: { role: number }) {
  authorizeRole({
    role,
    allowedRolesMask:
      roleMask.MANAGER |
      roleMask.HR_MANAGER |
      roleMask.SALES_MANAGER |
      roleMask.IT_ADMIN,
    message: "Unauthorized: Manager access required",
  });
}

function authorizeStaff({ role }: { role: number }) {
  authorizeRole({
    role,
    allowedRolesMask:
      roleMask.RECEPTIONIST |
      roleMask.MANAGER |
      roleMask.HR_MANAGER |
      roleMask.SALES_MANAGER |
      roleMask.IT_ADMIN,
    message: "Unauthorized: Staff access required",
  });
}

function authorizeEmployee({ role }: { role: number }) {
  authorizeRole({
    role,
    allowedRolesMask:
      roleMask.RECEPTIONIST |
      roleMask.MANAGER |
      roleMask.HR_MANAGER |
      roleMask.SALES_MANAGER |
      roleMask.IT_ADMIN |
      roleMask.ADMIN,
    message: "Unauthorized: Employee access required",
  });
}

function authorizeAdmin({ role }: { role: number }) {
  authorizeRole({
    role,
    allowedRolesMask: roleMask.ADMIN,
    message: "Unauthorized: Admin access required",
  });
}

export {
  roleMask,
  hasRole,
  toRoleMask,
  authorizeRole,
  authorizeCustomer,
  authorizeReceptionist,
  authorizeManager,
  authorizeHrManager,
  authorizeSalesManager,
  authorizeItAdmin,
  authorizeAnyManager,
  authorizeStaff,
  authorizeEmployee,
  authorizeAdmin,
};

export type { RoleName };
