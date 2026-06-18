import './header.scss';

import React, { useEffect, useRef } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Storage } from 'react-jhipster';

import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';
import { AccountMenu, AdminMenu, EntitiesMenu, LocaleMenu, InstructorMenu } from '../menus';

import { Brand, Home } from './header-components';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isInstructor: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {
  const dispatch = useAppDispatch();

  const handleLocaleChange = langKey => {
    Storage.session.set('locale', langKey);
    dispatch(setLocale(langKey));
  };

  const loadingBarRef = useRef<LoadingBarRef>(null);
  const loadingCount = useAppSelector(state => state.loadingBar.count);

  useEffect(() => {
    if (loadingCount > 0) {
      loadingBarRef.current?.continuousStart();
    } else {
      loadingBarRef.current?.complete();
    }
  }, [loadingCount]);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      <LoadingBar ref={loadingBarRef} className="loading-bar" color="#009cd8" />
      <Navbar data-cy="navbar" data-bs-theme="dark" expand="md" fixed="top" className="bg-primary" collapseOnSelect>
        <Navbar.Toggle aria-controls="header-tabs" aria-label="Menu" />
        <Brand />
        <Navbar.Collapse id="header-tabs">
          <Nav className="ms-auto">
            <Home />
            {props.isAuthenticated && props.isAdmin && <EntitiesMenu />}
            {props.isAuthenticated && props.isInstructor && <InstructorMenu />}
            {props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
            <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
