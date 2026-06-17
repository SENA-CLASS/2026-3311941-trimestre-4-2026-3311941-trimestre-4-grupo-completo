import React from 'react';
import { translate } from 'react-jhipster';

import EntitiesMenuItems from 'app/entities/menu';

import { NavDropdown } from './menu-components';

export const InstructorMenu = () => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.instructor.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <EntitiesMenuItems />
  </NavDropdown>
);
