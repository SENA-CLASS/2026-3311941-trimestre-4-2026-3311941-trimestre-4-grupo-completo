import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { JhiItemCount, JhiPagination, TextFormat, Translate, getPaginationState } from 'react-jhipster';
import { Link, useLocation, useNavigate } from 'react-router';

import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';

import { getEntities } from './log-audit.reducer';

export const LogAudit = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const logAuditList = useAppSelector(state => state.logAudit.entities);
  const loading = useAppSelector(state => state.logAudit.loading);
  const totalItems = useAppSelector(state => state.logAudit.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const { order } = paginationState;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="log-audit-heading" data-cy="LogAuditHeading">
        <Translate contentKey="ceet2App.logAudit.home.title">Log Audits</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ceet2App.logAudit.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/log-audit/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ceet2App.logAudit.home.createLabel">Create new Log Audit</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {logAuditList?.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="ceet2App.logAudit.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('levelAudit')}>
                  <Translate contentKey="ceet2App.logAudit.levelAudit">Level Audit</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('levelAudit')} />
                </th>
                <th className="hand" onClick={sort('logName')}>
                  <Translate contentKey="ceet2App.logAudit.logName">Log Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('logName')} />
                </th>
                <th className="hand" onClick={sort('messageAudit')}>
                  <Translate contentKey="ceet2App.logAudit.messageAudit">Message Audit</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('messageAudit')} />
                </th>
                <th className="hand" onClick={sort('dateAudit')}>
                  <Translate contentKey="ceet2App.logAudit.dateAudit">Date Audit</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('dateAudit')} />
                </th>
                <th>
                  <Translate contentKey="ceet2App.logAudit.customer">Customer</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {logAuditList.map(logAudit => (
                <tr key={`entity-${logAudit.id}`} data-cy="entityTable">
                  <td>
                    <Button as={Link as any} to={`/log-audit/${logAudit.id}`} variant="link" size="sm">
                      {logAudit.id}
                    </Button>
                  </td>
                  <td>{logAudit.levelAudit}</td>
                  <td>{logAudit.logName}</td>
                  <td>{logAudit.messageAudit}</td>
                  <td>{logAudit.dateAudit ? <TextFormat type="date" value={logAudit.dateAudit} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{logAudit.customer ? <Link to={`/customer/${logAudit.customer.id}`}>{logAudit.customer.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button as={Link as any} to={`/log-audit/${logAudit.id}`} variant="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        as={Link as any}
                        to={`/log-audit/${logAudit.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        variant="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() =>
                          (globalThis.location.href = `/log-audit/${logAudit.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        variant="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="ceet2App.logAudit.home.notFound">No Log Audits found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={logAuditList && logAuditList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default LogAudit;
