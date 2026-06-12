import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LogAudit from './log-audit';
import LogAuditDeleteDialog from './log-audit-delete-dialog';
import LogAuditDetail from './log-audit-detail';
import LogAuditUpdate from './log-audit-update';

const LogAuditRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LogAudit />} />
    <Route path="new" element={<LogAuditUpdate />} />
    <Route path=":id">
      <Route index element={<LogAuditDetail />} />
      <Route path="edit" element={<LogAuditUpdate />} />
      <Route path="delete" element={<LogAuditDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LogAuditRoutes;
