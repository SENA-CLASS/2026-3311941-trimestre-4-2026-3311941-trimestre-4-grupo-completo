import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { JhiItemCount, JhiPagination, TextFormat, Translate, getPaginationState } from 'react-jhipster';
import { Link, useLocation, useNavigate } from 'react-router';

import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';

import { getEntities } from './current-quarter.reducer';

export const CurrentQuarter = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const currentQuarterList = useAppSelector(state => state.currentQuarter.entities);
  const loading = useAppSelector(state => state.currentQuarter.loading);
  const totalItems = useAppSelector(state => state.currentQuarter.totalItems);

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
      <h2 id="current-quarter-heading" data-cy="CurrentQuarterHeading">
        <Translate contentKey="ceet2App.currentQuarter.home.title">Current Quarters</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ceet2App.currentQuarter.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/current-quarter/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ceet2App.currentQuarter.home.createLabel">Create new Current Quarter</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {currentQuarterList?.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="ceet2App.currentQuarter.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('scheduledQuarter')}>
                  <Translate contentKey="ceet2App.currentQuarter.scheduledQuarter">Scheduled Quarter</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('scheduledQuarter')} />
                </th>
                <th className="hand" onClick={sort('startQuarter')}>
                  <Translate contentKey="ceet2App.currentQuarter.startQuarter">Start Quarter</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('startQuarter')} />
                </th>
                <th className="hand" onClick={sort('endQuarter')}>
                  <Translate contentKey="ceet2App.currentQuarter.endQuarter">End Quarter</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('endQuarter')} />
                </th>
                <th className="hand" onClick={sort('currentQuarterState')}>
                  <Translate contentKey="ceet2App.currentQuarter.currentQuarterState">Current Quarter State</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('currentQuarterState')} />
                </th>
                <th>
                  <Translate contentKey="ceet2App.currentQuarter.year">Year</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {currentQuarterList.map(currentQuarter => (
                <tr key={`entity-${currentQuarter.id}`} data-cy="entityTable">
                  <td>
                    <Button as={Link as any} to={`/current-quarter/${currentQuarter.id}`} variant="link" size="sm">
                      {currentQuarter.id}
                    </Button>
                  </td>
                  <td>{currentQuarter.scheduledQuarter}</td>
                  <td>
                    {currentQuarter.startQuarter ? (
                      <TextFormat type="date" value={currentQuarter.startQuarter} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {currentQuarter.endQuarter ? (
                      <TextFormat type="date" value={currentQuarter.endQuarter} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    <Translate contentKey={`ceet2App.State.${currentQuarter.currentQuarterState}`} />
                  </td>
                  <td>{currentQuarter.year ? <Link to={`/year/${currentQuarter.year.id}`}>{currentQuarter.year.yearNumber}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        as={Link as any}
                        to={`/current-quarter/${currentQuarter.id}`}
                        variant="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        as={Link as any}
                        to={`/current-quarter/${currentQuarter.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (globalThis.location.href = `/current-quarter/${currentQuarter.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="ceet2App.currentQuarter.home.notFound">No Current Quarters found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={currentQuarterList && currentQuarterList.length > 0 ? '' : 'd-none'}>
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

export default CurrentQuarter;
